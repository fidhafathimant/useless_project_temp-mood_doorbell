const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";

const els = {
  video: document.getElementById('video'),
  overlay: document.getElementById('overlay'),
  idleMsg: document.getElementById('idleMsg'),
  statusDot: document.getElementById('statusDot'),
  statusText: document.getElementById('statusText'),
  ringBtn: document.getElementById('ringBtn'),
  voiceSwitch: document.getElementById('voiceSwitch'),
  moodEmoji: document.getElementById('moodEmoji'),
  moodLabel: document.getElementById('moodLabel'),
  moodSub: document.getElementById('moodSub'),
  log: document.getElementById('log'),
};

let voiceOn = true;
let modelsLoaded = false;
let cameraRunning = false;
let detectLoop = null;
let lastSpokenEmotion = null;
let stableEmotion = null;
let stableCount = 0;

// Emotion -> spoken message, homeowner alert text, color, emoji
const EMOTION_INFO = {
  happy:     { emoji:'😊', color:'var(--amber)', greet:"Hi there! I'll let them know you're here with a smile.", alert:'Visitor seems happy.' },
  sad:       { emoji:'😢', color:'var(--sky)',   greet:"Hi, take your time. I'm letting them know you're waiting.", alert:'Visitor looks upset — you may want to check in.' },
  angry:     { emoji:'😠', color:'var(--rose)',  greet:"I hear you. I'm alerting the homeowner right now.", alert:'Visitor appears angry — please be cautious.' },
  fearful:   { emoji:'😨', color:'var(--rose)',  greet:"It's okay, you're safe. Calling the homeowner now.", alert:'Visitor looks frightened — check on them.' },
  disgusted: { emoji:'😖', color:'var(--rose)',  greet:"Thanks for waiting, I'm letting them know you're here.", alert:'Visitor seems uncomfortable.' },
  surprised: { emoji:'😮', color:'var(--amber)', greet:"Oh, hello! Notifying the homeowner you're here.", alert:'Visitor looks surprised.' },
  neutral:   { emoji:'🙂', color:'var(--sage)',  greet:"Hello! Letting them know someone's at the door.", alert:'Someone is at the door.' },
};

function setStatus(text, live){
  els.statusText.textContent = text;
  els.statusDot.classList.toggle('live', !!live);
}

function addLogEntry(text, color){
  const empty = els.log.querySelector('.log-empty');
  if (empty) empty.remove();

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
  entry.innerHTML = `<time>${time}</time><span class="dot" style="background:${color || 'var(--text-dim)'}"></span><span class="msg">${text}</span>`;
  els.log.prepend(entry);
}

function speak(text){
  if (!voiceOn || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

function updateMoodBadge(emotionKey){
  const info = EMOTION_INFO[emotionKey];
  if (!info) return;
  els.moodEmoji.textContent = info.emoji;
  els.moodLabel.textContent = emotionKey.charAt(0).toUpperCase() + emotionKey.slice(1);
  els.moodSub.textContent = info.alert;
}

els.voiceSwitch.addEventListener('click', () => {
  voiceOn = !voiceOn;
  els.voiceSwitch.classList.toggle('on', voiceOn);
});

async function loadModels(){
  if (modelsLoaded) return;
  setStatus('Loading models…', false);
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);
  modelsLoaded = true;
}

let activeStream = null;

async function startCamera(){
  activeStream = await navigator.mediaDevices.getUserMedia({ video: { width:640, height:480 }, audio:false });
  els.video.srcObject = activeStream;

  // Wait until the browser knows the video dimensions before starting detection
  await new Promise((resolve, reject) => {
    els.video.onloadedmetadata = resolve;
    els.video.onerror = reject;
  });

  await els.video.play();
  els.idleMsg.style.display = 'none';
  cameraRunning = true;
}

function runDetectionLoop(){
  const ctx = els.overlay.getContext('2d');

  detectLoop = setInterval(async () => {
    if (!cameraRunning) return;

    // Re-read dimensions every tick so overlay stays in sync with live layout
    const w = els.video.clientWidth;
    const h = els.video.clientHeight;
    if (!w || !h) return; // video not yet rendered — skip this tick

    if (els.overlay.width !== w)  els.overlay.width  = w;
    if (els.overlay.height !== h) els.overlay.height = h;

    const displaySize = { width: w, height: h };

    const result = await faceapi
      .detectSingleFace(els.video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    ctx.clearRect(0, 0, w, h);

    if (!result){
      setStatus('No one at the door', false);
      stableEmotion = null;
      stableCount = 0;
      return;
    }

    const resized = faceapi.resizeResults(result, displaySize);

    // Both <video> and <canvas> are CSS-mirrored with scaleX(-1).
    // face-api coordinates come from the un-mirrored video frame, so
    // we must flip the box's X origin to match what the viewer sees.
    const box = resized.detection.box;
    const mirroredBox = new faceapi.Box({
      x: w - box.x - box.width,
      y: box.y,
      width: box.width,
      height: box.height,
    });
    new faceapi.draw.DrawBox(mirroredBox, { boxColor: '#F5A623' }).draw(els.overlay);

    // pick the strongest emotion
    const sorted = Object.entries(resized.expressions).sort((a,b) => b[1] - a[1]);
    const [topEmotion, confidence] = sorted[0];

    setStatus(`Analyzing… (${topEmotion}, ${Math.round(confidence*100)}%)`, true);

    if (confidence < 0.5) return; // ignore low-confidence reads

    // require the same emotion to persist for a few frames before acting,
    // so a single flickering frame doesn't trigger a false alert
    if (topEmotion === stableEmotion){
      stableCount++;
    } else {
      stableEmotion = topEmotion;
      stableCount = 1;
    }

    if (stableCount === 3 && topEmotion !== lastSpokenEmotion){
      lastSpokenEmotion = topEmotion;
      const info = EMOTION_INFO[topEmotion];
      updateMoodBadge(topEmotion);
      addLogEntry(info.alert, info.color);
      speak(info.greet);
    }
  }, 600);
}

function showDiagnostic(html){
  const banner = document.getElementById('diagBanner');
  banner.innerHTML = html;
  banner.style.display = 'block';
}

function runStartupChecks(){
  const inIframe = window.self !== window.top;
  const isSecure = window.isSecureContext;
  const hasMediaApi = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  if (!isSecure){
    showDiagnostic('This page isn\'t running on <strong>https://</strong> or <strong>localhost</strong>, so browsers will block camera access. Serve it with a local server (see instructions) instead of opening the file directly.');
    return false;
  }
  if (!hasMediaApi){
    showDiagnostic('This browser doesn\'t expose a camera API on this page. If you\'re inside an app preview pane, embedded browser, or older browser, open the file in a current version of Chrome, Edge, or Firefox instead.');
    return false;
  }
  if (inIframe){
    showDiagnostic('This page is loaded inside an embedded frame (e.g. a preview panel), which often blocks camera permission even if the browser itself supports it. If the doorbell button below doesn\'t work, open <code>mood-doorbell.html</code> directly in its own browser tab.');
  }
  return true;
}

runStartupChecks();

els.ringBtn.addEventListener('click', async () => {
  if (cameraRunning) return;
  els.ringBtn.classList.add('pulsing');
  try {
    setStatus('Starting camera…', false);
    await loadModels();
    await startCamera();
    setStatus('Watching for a visitor…', true);
    addLogEntry('Doorbell rung — camera started.', 'var(--sage)');
    runDetectionLoop();
  } catch (err){
    console.error(err);
    setStatus('Camera unavailable', false);

    // Clean up any partially-started state so the user can retry
    if (activeStream){
      activeStream.getTracks().forEach(t => t.stop());
      activeStream = null;
    }
    if (detectLoop){ clearInterval(detectLoop); detectLoop = null; }
    cameraRunning = false;

    let reason = 'Something went wrong starting the camera or loading the models.';
    if (err && err.name === 'NotAllowedError'){
      reason = 'Camera permission was denied. Click the camera icon in your browser\'s address bar, allow access, then press the doorbell again.';
    } else if (err && err.name === 'NotFoundError'){
      reason = 'No camera was found on this device. Plug in or enable a webcam and try again.';
    } else if (err && err.name === 'NotReadableError'){
      reason = 'Your camera is already in use by another app. Close other apps using the camera (video calls, other browser tabs) and try again.';
    } else if (err && /fetch|network|load/i.test(err.message || '')){
      reason = 'Could not download the face detection models. Check your internet connection, then reload the page.';
    }

    showDiagnostic(`<strong>${reason}</strong><br><span style="opacity:0.75">Technical detail: ${(err && (err.name + ': ' + err.message)) || 'unknown error'}</span>`);
    els.idleMsg.style.display = 'flex';
    els.ringBtn.classList.remove('pulsing');
  }
});