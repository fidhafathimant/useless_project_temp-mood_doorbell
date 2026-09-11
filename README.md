<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# [Mood Doorbell] 🎯


## Basic Details
### Team Name: [MAVERICKS]


### Team Members
- Team Lead: [MEHJEBIN NASAR] - [MESCET KUNNUKARA]
- Member 2: [FIDHA FATHIMA ] - [MESCET KUNNUKARA]
- Member 3: [FIDHA M R] - [MESCET KUNNUKARA]

### Project Description
[A doorbell that reads faces. Ring it, and the camera wakes up, analyses your visitor's expression using on-device AI, speaks a greeting tailored to their mood, and adds a colour-coded alert to your activity log. Happy visitor? Cheerful welcome. Angry visitor? Brace yourself — it already warned you.]

### The Problem (that doesn't exist)
[Every day, thousands of people open their front door completely unprepared for the emotional ambush waiting on the other side. Is it an angry relative? A suspiciously cheerful salesperson? A neighbour who is definitely about to ask for something? Nobody knows. Nobody is warned. This ends today.
]

### The Solution (that nobody asked for)
[HWe built an AI-powered emotional bouncer for your front door. Ring the bell → webcam activates → face-api.js reads the visitor's expression in real time → a mood-matched voice greeting plays ("It's okay, you're safe!" for the frightened ones) → and you get a colour-coded mood alert log so you can mentally prepare yourself. No cloud. No subscription. No excuse for being emotionally caught off guard ever again.]

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



### Implementation
For Software:

# Installation
```bash
# Clone the repository
git clone https://github.com/fidhafathimant/useless_project_temp-mood_doorbell.git

# Navigate into the project folder
cd useless_project_temp-mood_doorbell

### Project Documentation
For Software:

# Screenshots (Add at least 3)
!MOOD_DOORBELL.mp4
*Demonstrates ringing the doorbell, real-time face detection, mood badge updates and voice 

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
https://github.com/user-attachments/assets/(https://drive.google.com/file/d/13xVp8mUamCZRckSZ_tlocawO9dgxf-DQ/view?usp=sharing)
*Demonstrates ringing the doorbell, the webcam activating, real-time face detection with the amber bounding box, the mood badge updating as expressions change, and the voice greeting playing — all running locally in the browser with no data sent to any server.*

# Additional Demos
- Open the browser's **DevTools → Network tab** while using the app to confirm zero video data is transmitted externally — everything runs on-device.
- Try different expressions (smile, frown, look surprised) and watch the activity log timestamp each mood change in real time.

## Team Contributions
- [fidha fathima]: UI/UX — HTML structure, CSS dark-theme design, responsive layout, mood badge and activity log styling
- [fidha mr]: Core logic — webcam integration, face-api.js detection loop, canvas mirroring fix, emotion stability debounce, error handling and retry flow
 Experience layer — voice greeting script writing, diagnostic banner messages, README and project documentation

---
Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)


