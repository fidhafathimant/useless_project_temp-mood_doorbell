<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Mood Doorbell 🔔

## Basic Details
### Team Name: Mavericks

### Team Members
- Team Lead: Fidha Fathima - MESCET, Kunnukara
- Member 2: Fidha MR - MESCET, Kunnukara

### Project Description
Mood Doorbell turns your laptop webcam into a smart porch camera. When the doorbell is rung, it detects the visitor's facial expression in real time, speaks a personalised greeting out loud, and logs a timestamped mood alert — so you know who's outside and how they're feeling before you even open the door.

### The Problem (that doesn't exist)
Every day, thousands of people open their front door completely unprepared for the emotional ambush waiting on the other side. Is it an angry relative? A suspiciously cheerful salesperson? A neighbour who is *definitely* about to ask for something? Nobody knows. Nobody is warned. This ends today.

### The Solution (that nobody asked for)
Mood Doorbell psychoanalyses your guests before you let them in. One ring, and your browser becomes a porch therapist — detecting faces, reading expressions, speaking personalised greetings out loud ("It's okay, you're safe. Calling the homeowner now." for the frightened ones), and logging every emotional visit with a timestamp and colour-coded dot. It's completely unnecessary, runs entirely in your browser, and we are very proud of it.

## Technical Details
### Technologies/Components Used

For Software:
- **Languages:** HTML5, CSS3, JavaScript (ES2020)
- **Frameworks:** None
- **Libraries:**
  - [face-api.js v0.22.2](https://github.com/justadudewhohacks/face-api.js) — in-browser face detection & facial expression recognition (built on TensorFlow.js)
  - Web Speech API *(browser built-in)* — voice greetings via text-to-speech
  - MediaDevices API *(browser built-in)* — webcam access via `getUserMedia`
  - Canvas API *(browser built-in)* — real-time face bounding box overlay
- **Tools:**
  - Visual Studio Code — code editor
  - Chrome / Edge DevTools — debugging & testing
  - Python `http.server` / Node `serve` — local development server (required for camera secure context)
  - Git & GitHub — version control and submission

For Hardware:
- Any device with a built-in or USB webcam
- A speaker or headphones (for voice greeting output)
- No microcontrollers, no IoT hardware, no cloud subscriptions

### Implementation
For Software:

# Installation
```bash
# Clone the repository
git clone https://github.com/fidhafathimant/useless_project_temp-mood_doorbell.git

# Navigate into the project folder
cd useless_project_temp-mood_doorbell
```
> No `npm install`, no `pip install`, no build step — there is nothing to install. It is pure HTML, CSS and JavaScript.

# Run

> ⚠️ The page **must** be served over `localhost` — browsers block webcam access on plain `file://` URLs.

**Option A — Python**
```bash
python -m http.server 5500
```

**Option B — Node.js**
```bash
npx serve -l 5500
```

Then open your browser and go to:
```
http://localhost:5500
```
Press the 🔔 amber doorbell button and allow camera access when prompted.

### Project Documentation
For Software:

# Screenshots

![Screenshot1](screenshots/idle.png)
*Idle state — camera is off, the amber doorbell button is ready to ring*

![Screenshot2](screenshots/live.png)
*Live state — webcam feed active with amber bounding box tracking the visitor's face; status line shows detected emotion and confidence percentage*

![Screenshot3](screenshots/activity_log.png)
*Activity panel — mood badge updates in real time and the timestamped log records every emotion change with colour-coded dots*

# Diagrams
![Workflow](screenshots/workflow.png)
*End-to-end flow: browser requests webcam → face-api.js runs TinyFaceDetector + FaceExpressionNet entirely on-device → dominant emotion is picked after 3 stable consecutive frames → Web Speech API speaks the greeting → activity log is updated. No data ever leaves the device.*

For Hardware:

# Schematic & Circuit
Not applicable — Mood Doorbell is a pure software project.
No circuits, no microcontrollers, no wiring required.
The only "hardware" is the webcam already built into your device.

# Build Photos
Not applicable — no physical build involved.
The entire project lives in three files: `index.html`, `style.css`, and `script.js`.

### Project Demo
# Video
[Watch Demo on Google Drive](https://drive.google.com/file/d/13xVp8mUamCZRckSZ_tlocawO9dgxf-DQ/view?usp=sharing)
*Demonstrates ringing the doorbell, the webcam activating, real-time face detection with the amber bounding box, the mood badge updating as expressions change, and the voice greeting playing — all running locally in the browser with no data sent to any server.*

# Additional Demos
- Open the browser's **DevTools → Network tab** while using the app to confirm zero video data is transmitted externally — everything runs on-device.
- Try different expressions (smile, frown, look surprised) and watch the activity log timestamp each mood change in real time.

## Team Contributions
- Fidha Fathima: Project concept, HTML structure, CSS dark-theme UI design, responsive layout, mood badge and activity log styling
- Fidha MR: JavaScript logic — webcam integration, face-api.js detection loop, canvas mirroring bug fix, emotion stability debounce, error handling, diagnostic messages and README documentation

---
Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
