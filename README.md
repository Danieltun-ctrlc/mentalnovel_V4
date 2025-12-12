The Weight We Carry


A Mental Health Visual Novel
The Weight We Carry is an interactive, browser-based visual novel that explores themes of anxiety, high-functioning depression, and the masks we wear in our daily lives. Built with Next.js and React, it features a branching narrative, an immersive "Inner World" mechanic, and multiple emotional endings based on player choices.

( please download the demo video of the presentation link provided in the submission link )

 Features
Branching Narrative: Your choices impact two hidden metrics—Resilience and Anxiety—which determine the story's outcome.

"Inner World" Mechanic: A unique toggle system allowing players to switch between the character's external dialogue and their hidden internal thoughts.

Visual Novel Engine: A custom-built UI featuring dynamic backgrounds, character sprites, and a typewriter text effect.

Immersive Audio: Dynamic background music that shifts based on the current scene and emotional tone.

Responsive Design: Fully playable on both desktop and mobile devices, featuring a "Manga/Sketchbook" aesthetic.

State Management: Tracks player progress and metrics across 5 distinct acts without page reloads.

 Tech Stack
Framework: Next.js 14+ (App Router)

Library: React

Styling: Tailwind CSS

Icons: Lucide React

Deployment: GitHub Pages

 Setup & Installation
Follow these steps to run the project locally on your machine.

Prerequisites
Node.js (v18 or higher)

npm (Node Package Manager)

1. Clone the Repository
Bash

git clone https://github.com/Danieltun-ctrlc/mentalnovel.git
cd mentalnovel
2. Install Dependencies
Bash

npm install
3. Run the Development Server
This command starts the local server with hot-reloading enabled.

Bash

npm run dev
Open http://localhost:3000/mentalnovel 

Project Structure
app/page.tsx: The main game engine containing the state machine, visual novel UI, and logic.

public/: Stores all static assets.

/images: Backgrounds and character sprites.

/audio: Background music tracks (.mp3).

/bg: Optimized background images.

next.config.js: Configuration for static export and asset paths (essential for GitHub Pages deployment).



How to Play
Start: Click "Turn The Page" on the intro screen to begin.

Read: Click on the dialogue box to advance the text.

Reveal Truth: At specific moments, a "Reveal Truth" button will unlock. Click this to see the character's hidden inner thoughts versus what they are saying out loud.

Choose: Select options during key moments. Your choices affect your mental health metrics.

Endings: Based on your cumulative choices, you will reach one of three endings: Good, Neutral, or Bad.

🚢 Deployment
This project is configured for GitHub Pages. To deploy a new version:

Ensure your next.config.js has the correct basePath matching your repository name.

Run the deploy script:

Bash

npm run deploy
This builds the static files to the out/ directory and pushes them to the gh-pages branch.

 References & AI Usage
This project was developed with the assistance of Artificial Intelligence tools to accelerate development and asset integration.

Code Generation: AI was used to generate the core React components, state management logic for the Visual Novel Tailwind CSS styling structures. (Gemini)

Story & Script: The narrative structure, dialogue sequences, and "Inner World" concept were refined and formatted into JSON data structures with the help of the AI assistance.

Images: created by the AI Geimni ( nano Banana)

Audio: from https://pixabay.com/ 

Other Resources
Icons: Provided by Lucide React.

Fonts: Google Fonts (Noto Serif JP, Crimson Text, Patrick Hand).
