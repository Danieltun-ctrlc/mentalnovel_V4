export type MetricImpact = {
  resilience: number; // + for healthy, - for self-doubt
  anxiety: number; // + for masking/stress, - for calm
};

export type Choice = {
  id: string;
  text: string;
  nextSceneId: string; // The ID of the scene this leads to
  impact: MetricImpact;
};

export type Scene = {
  id: string;
  title: string;
  backgroundStyle:
    | "commute"
    | "classroom"
    | "grayscale_storm"
    | "corridor"
    | "warm_sunset"
    | "neutral_rain";

  // OUTER WORLD (Default View)
  outerText: string;

  // INNER WORLD (Hidden View - The "System Reveal")
  innerText: string;
  innerSource: "MC" | "Jordan" | "Lena" | "System"; // Who is thinking this?

  choices: Choice[];
};

// Map accessible by string ID for easy O(1) lookups
export const storyScenes: Record<string, Scene> = {
  // --- ACT 1: THE MASK ---
  intro: {
    id: "intro",
    title: "The Morning Commute",
    backgroundStyle: "commute",
    outerText:
      "The train sways. You look at your reflection in the dark window—composed, ready. You mentally review the checklist: The presentation at 10 AM. Helping Mark with his code. Finishing the report by 5. You have to handle it all.",
    innerSource: "MC",
    innerText:
      "I’m already exhausted. If I drop one ball, the whole act falls apart. They think I'm reliable; they don't know I'm barely holding on.",
    choices: [
      {
        id: "1a",
        text: "Push it away. No time for weakness.",
        nextSceneId: "scene2",
        impact: { resilience: -1, anxiety: 2 },
      },
      {
        id: "1b",
        text: "Breathe. Acknowledge the anxiety.",
        nextSceneId: "scene2",
        impact: { resilience: 1, anxiety: -1 },
      },
      {
        id: "1c",
        text: "Look around and compare yourself to others.",
        nextSceneId: "scene2",
        impact: { resilience: -2, anxiety: 1 },
      },
    ],
  },

  // --- ACT 2: CRACKS IN THE SHELL ---
  scene2: {
    id: "scene2",
    title: "Presentation Prep",
    backgroundStyle: "classroom",
    outerText:
      "You arrive early. Jordan is there, laughing with the professor. He looks completely unbothered, leading the discussion with natural charisma. He doesn't seem to have a care in the world.",
    innerSource: "Jordan",
    innerText:
      "[SYSTEM DETECTED INNER THOUGHT]: 'I rehearsed every sentence 20 times last night. My hands are shaking under the desk. I wish someone knew how scared I am of failing.'",
    choices: [
      {
        id: "2a",
        text: "Maybe I’m not the only one struggling.",
        nextSceneId: "scene3",
        impact: { resilience: 2, anxiety: -1 },
      },
      {
        id: "2b",
        text: "He's just being modest. He's better than me.",
        nextSceneId: "scene3",
        impact: { resilience: -1, anxiety: 1 },
      },
      {
        id: "2c",
        text: "I wish I had his courage.",
        nextSceneId: "scene3",
        impact: { resilience: 0, anxiety: 0 },
      },
    ],
  },

  // --- ACT 3: BREAKING POINT ---
  scene3: {
    id: "scene3",
    title: "The Unexpected Mistake",
    backgroundStyle: "grayscale_storm",
    outerText:
      "You are speaking. Suddenly, your mind goes blank. You stutter, repeating the same line twice. The room goes silent. A few classmates glance up. Jordan looks at you.",
    innerSource: "MC",
    innerText:
      "You're embarrassing yourself. Everyone sees it. The mask is slipping. You're failing. You're failing. You're failing.",
    choices: [
      {
        id: "3a",
        text: "Tell yourself: 'I ruined everything.'",
        nextSceneId: "scene4",
        impact: { resilience: -2, anxiety: 2 },
      },
      {
        id: "3b",
        text: "Tell yourself: 'It’s okay. Humans slip.'",
        nextSceneId: "scene4",
        impact: { resilience: 2, anxiety: -1 },
      },
      {
        id: "3c",
        text: "Focus. Just force yourself to continue.",
        nextSceneId: "scene4",
        impact: { resilience: 0, anxiety: 0 },
      },
    ],
  },

  // --- ACT 4: SEEING BEYOND ---
  scene4: {
    id: "scene4",
    title: "After Class",
    backgroundStyle: "corridor",
    outerText:
      "You're packing your bag, hands trembling slightly. Jordan nodded at you earlier, whispering 'You did well.' Now, your friend Lena approaches. She looks concerned. 'You okay? You seem... really tired today.'",
    innerSource: "Lena",
    innerText:
      "[SYSTEM DETECTED INNER THOUGHT]: 'I’m not sure how to help, but I hope they know they don’t have to carry everything alone. I miss seeing them actually smile.'",
    choices: [
      {
        id: "4a",
        text: "Say: 'I'm fine. Just busy.'",
        nextSceneId: "calculate_ending", // Special ID to trigger logic
        impact: { resilience: -1, anxiety: 1 },
      },
      {
        id: "4b",
        text: "Say: 'I don't know, honestly.'",
        nextSceneId: "calculate_ending",
        impact: { resilience: 2, anxiety: -1 },
      },
      {
        id: "4c",
        text: "Say: 'It's hard to explain right now.'",
        nextSceneId: "calculate_ending",
        impact: { resilience: 1, anxiety: 0 },
      },
    ],
  },

  // --- ACT 5: ENDINGS (No choices, just reflection) ---

  ending_good: {
    id: "ending_good",
    title: "I Am More Than My Performance",
    backgroundStyle: "warm_sunset",
    outerText:
      "You take a deep breath. The weight is still there, but it feels different. Shared. You realize that Jordan's confidence was a mask, and Lena's worry was love. You don't have to be perfect to be seen.",
    innerSource: "MC",
    innerText:
      "Connection brings safety. I can allow myself to be human. You don’t have to shine to be worthy of the sky.",
    choices: [], // End of game
  },

  ending_neutral: {
    id: "ending_neutral",
    title: "Still Learning",
    backgroundStyle: "neutral_rain",
    outerText:
      "The day ends. It wasn't perfect, and you still feel the pressure, but you survived. You acknowledged the struggle, and that's a start. Growth isn't instant.",
    innerSource: "MC",
    innerText:
      "Life is heavy. But I'm trying. Maybe healing isn’t dramatic. Maybe it’s just learning to stay.",
    choices: [],
  },

  ending_bad: {
    id: "ending_bad",
    title: "The Mask Hardens",
    backgroundStyle: "grayscale_storm",
    outerText:
      "You go home and shut the door. You replay the mistake in your head over and over. You promise yourself you'll work twice as hard tomorrow so no one ever sees you slip again.",
    innerSource: "MC",
    innerText:
      "Everyone else is better than me. I must not burden them. If only they knew how heavy this smile is.",
    choices: [],
  },
};
