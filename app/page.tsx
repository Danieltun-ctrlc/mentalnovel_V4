"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CloudRain,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Brain,
  ArrowRight,
  Play,
  PenTool,
  BookOpen,
  X,
} from "lucide-react";

// ==========================================
// 1. CONFIGURATION: ASSETS
// ==========================================
const ASSET_PATHS = {
  backgrounds: {
    commute: "/bg/scene1.png", // Act 1
    classroom: "/bg/scene2.png", // Act 2
    meclassroom: "/bg/scene3.png",
    grayscale_storm: "/bg/bad_ending.png", //  Bad Ending
    corridor: "/bg/scene4.png", // Act 4
    warm_sunset: "/bg/good_ending.png", // Good Ending
    neutral_rain: "/bg/neutral.png", // Neutral Ending
  },
  characters: {
    protagonist: "",
    jordan: "",
    lena: "/bg/lena.png",
  },
  audio: {
    default: "/audio/bgm.mp3",
    scene2: "/audio/scene2.mp3",
    scene3: "/audio/scene3.mp3",
    scene4: "/audio/scene4.mp3",
    good: "/audio/good_ending.mp3",
    neutral: "/audio/neutral_ending.mp3",
    bad: "/audio/bad_ending.mp3",
    scene1: "/audio/oldtrain.mp3",
  },
};

// ==========================================
// 2. STORY DATA
// ==========================================

type MetricImpact = { resilience: number; anxiety: number };
type Choice = {
  id: string;
  text: string;
  followUpText: string;
  nextSceneId: string;
  impact: MetricImpact;
};
type DialogueLine = { speaker: string; text: string };
type LessonContent = { title: string; message: string; action: string };

type SceneData = {
  id: string;
  title: string;
  backgroundStyle: keyof typeof ASSET_PATHS.backgrounds;
  characterVisible?: "jordan" | "lena" | null;
  dialogueSequence: DialogueLine[];
  innerSource: string;
  innerText: string;
  choices: Choice[];
  musicTrack?: keyof typeof ASSET_PATHS.audio;
  lesson?: LessonContent; // Content for the Lesson Card (Endings only)
  isEnding?: boolean; // Flag to modify behavior
};

const STORY_DATA: Record<string, SceneData> = {
  // ============================================================
  // ACT 1: THE COMMUTE (The weight of expectation)
  // ============================================================
  act1_commute: {
    id: "act1_commute",
    title: "Act 1: The Mask",
    backgroundStyle: "commute",
    characterVisible: null,
    musicTrack: "scene1",
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "7:45 AM. The train rattles over the tracks, a rhythmic, mechanical heartbeat.",
      },
      {
        speaker: "Observation",
        text: "Shoulders brush against shoulders. Everyone is lost in their own world.",
      },
      {
        speaker: "You",
        text: "Headphones on. No music playing. Just a barrier against the noise.",
      },
      {
        speaker: "Observation",
        text: "You catch a glimpse of yourself in the dark glass of the window.",
      },
      {
        speaker: "You",
        text: "That person looks calm. Capable. Professional. That's who I need to be today.",
      },
      {
        speaker: "Observation",
        text: "But the reflection doesn't show the static buzzing in your head.",
      },
      {
        speaker: "You",
        text: "The checklist... I need to review it again. Just once more.",
      },
      {
        speaker: "You",
        text: "10:00 AM: The Presentation. Don't stutter. Don't freeze.",
      },
      {
        speaker: "You",
        text: "12:30 PM: Help Mark. He looked so stressed yesterday... I can't say no.",
      },
      {
        speaker: "You",
        text: "5:00 PM: The Quarterly Report. It has to be perfect. 'Good enough' isn't an option.",
      },
      {
        speaker: "Observation",
        text: "A familiar weight settles in your chest. Invisible, but heavy.",
      },
      {
        speaker: "You",
        text: "Fix the collar. Smooth the shirt. Stop the hands from trembling.",
      },
      {
        speaker: "Observation",
        text: "You are the 'Reliable One'. That is the role. You have to handle it all.",
      },
    ],
    innerSource: "Inner Monologue",
    innerText:
      "I’m already exhausted and the day hasn't even started. If I drop just one ball, this whole act falls apart. They think I'm strong; they don't know I'm barely holding on.",
    choices: [
      {
        id: "1a",
        text: "Push it away. No time for weakness.",
        followUpText:
          "You clench your jaw until it aches. You shove the feeling down into the pit of your stomach. It's quiet now, but heavy.",
        nextSceneId: "act2_prep",
        impact: { resilience: -1, anxiety: 2 },
      },
      {
        id: "1b",
        text: "Breathe. Acknowledge the anxiety.",
        followUpText:
          "You close your eyes for a second. You name the feeling: 'Fear'. You don't fight it, you just let it sit there. It feels a tiny bit lighter.",
        nextSceneId: "act2_prep",
        impact: { resilience: 2, anxiety: -1 },
      },
      {
        id: "1c",
        text: "Compare yourself to others.",
        followUpText:
          "You look at the woman reading a book. The man sleeping. Why does everyone else seem to have it together? What is wrong with you?",
        nextSceneId: "act2_prep",
        impact: { resilience: -1, anxiety: 2 },
      },
    ],
  },

  // ============================================================
  // ACT 2: THE COMPARISON (The illusion of others)
  // ============================================================
  act2_prep: {
    id: "act2_prep",
    title: "Act 2: Cracks in the Shell",
    backgroundStyle: "classroom",
    characterVisible: "jordan",
    musicTrack: "scene2",
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "You arrive at the classroom early. The air smells like whiteboard markers and stale coffee.",
      },
      {
        speaker: "Observation",
        text: "Most people are quietly scrolling on their phones, waiting for the lecture to start.",
      },
      { speaker: "Observation", text: "Except for him. Jordan." },
      {
        speaker: "You",
        text: "He's at the front of the room, leaning casually against the professor's desk.",
      },
      {
        speaker: "Observation",
        text: "He cracks a joke. The professor laughs. The students nearby chuckle.",
      },
      {
        speaker: "You",
        text: "Look at him. He owns the room. No script, no cue cards, just natural charisma.",
      },
      {
        speaker: "You",
        text: "He makes it look so easy. Why is it like pulling teeth for me?",
      },
      {
        speaker: "Observation",
        text: "He glances at his watch, smiles, and adjusts his notes. He looks completely unbothered.",
      },
      {
        speaker: "You",
        text: "He's going to ace this without even trying. Meanwhile, I'm over here trying to remember how to breathe.",
      },
    ],
    innerSource: "System Detect // Jordan",
    innerText:
      "Jordan's Thoughts: 'I rehearsed every sentence 20 times last night in the mirror. My hands are shaking under the desk. Please don't let them see how scared I am of failing.'",
    choices: [
      {
        id: "2a",
        text: "Maybe I’m not the only one struggling.",
        followUpText:
          "You watch his hand twitch slightly as he holds his paper. A realization hits you: Is his confidence a mask too?",
        nextSceneId: "act3_storm",
        impact: { resilience: 2, anxiety: -1 },
      },
      {
        id: "2b",
        text: "He's just being modest. He's better than me.",
        followUpText:
          "You shrink in your seat. Of course he's fine. He's Jordan. You're just... you.",
        nextSceneId: "act3_storm",
        impact: { resilience: -1, anxiety: 2 },
      },
      {
        id: "2c",
        text: "I wish I had his courage.",
        followUpText:
          "You stare at him with a mix of admiration and bitter envy. If only you could borrow just an ounce of that ease.",
        nextSceneId: "act3_storm",
        impact: { resilience: -1, anxiety: 1 },
      },
    ],
  },

  // ============================================================
  // ACT 3: THE MISTAKE (The moment of panic)
  // ============================================================
  act3_storm: {
    id: "act3_storm",
    title: "Act 3: The Breaking Point",
    backgroundStyle: "meclassroom",
    characterVisible: "jordan",
    musicTrack: "scene3",
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "Your name is called. The sound of your chair scraping the floor echoes in the silent room.",
      },
      {
        speaker: "You",
        text: "Okay. Showtime. Just read the slides. Stick to the script.",
      },
      {
        speaker: "You",
        text: "'Our research indicates a strong correlation between variable A and...'",
      },
      {
        speaker: "Observation",
        text: "So far, so good. Your voice is steady. You're doing it.",
      },
      {
        speaker: "You",
        text: "'However, the variables suggests... wait. Suggest. The data...'",
      },
      {
        speaker: "Observation",
        text: "A glitch. A tiny stumble. But in your head, it sounds like a car crash.",
      },
      {
        speaker: "You",
        text: "I... uh... what was I saying? The graph shows...",
      },
      {
        speaker: "Observation",
        text: "Blank. White noise. The script in your head has vanished.",
      },
      {
        speaker: "Observation",
        text: "The silence stretches. One second. Two seconds. An eternity.",
      },
      {
        speaker: "You",
        text: "They're staring. Everyone is staring. Jordan is staring.",
      },
      {
        speaker: "Observation",
        text: "Heat rushes to your face. The room feels suddenly, violently small.",
      },
    ],
    innerSource: "Internal Storm",
    innerText:
      "You're embarrassing yourself. Everyone sees it. The mask has slipped. You're a fraud. You're failing. You're failing. You're failing.",
    choices: [
      {
        id: "3a",
        text: "Tell yourself: 'I ruined everything.'",
        followUpText:
          "The shame burns hot. You finish the presentation in a blur, your voice flat and dead. You sit down, wishing the floor would swallow you.",
        nextSceneId: "act4_friend",
        impact: { resilience: -2, anxiety: 3 },
      },
      {
        id: "3b",
        text: "Tell yourself: 'It’s okay. Humans slip.'",
        followUpText:
          "You pause. You take a sip of water. You look up and smile apologetically. 'Sorry, lost my train of thought.' You continue.",
        nextSceneId: "act4_friend",
        impact: { resilience: 3, anxiety: -1 },
      },
      {
        id: "3c",
        text: "Focus. Force yourself to continue.",
        followUpText:
          "You grit your teeth and push through the rest, reading the slides robotically. You survive, but you don't feel present.",
        nextSceneId: "act4_friend",
        impact: { resilience: 0, anxiety: 0 },
      },
    ],
  },

  // ============================================================
  // ACT 4: THE CONNECTION (Vulnerability vs Isolation)
  // ============================================================
  act4_friend: {
    id: "act4_friend",
    title: "Act 4: Seeing Beyond",
    backgroundStyle: "corridor",
    characterVisible: "lena",
    musicTrack: "scene4",
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "Class is finally over. The adrenaline crash hits you like a physical weight.",
      },
      {
        speaker: "You",
        text: "I just need to pack up. Get out. Disappear before anyone says anything.",
      },
      {
        speaker: "Observation",
        text: "Jordan walks past your desk and stopped you at the window. You flinch, expecting a smirk.",
      },
      {
        speaker: "Jordan",
        text: "*Nods quietly* 'Hey. Tough prompt today. You handled the Q&A well, though.'",
      },
      {
        speaker: "You",
        text: "Wait... what? He thought I did well? Or is he just being nice?",
      },
      {
        speaker: "Observation",
        text: "Before you can process that, Lena approaches. She isn't smiling.",
      },
      {
        speaker: "Observation",
        text: "She stops in front of you, tilting her head slightly. Examining you.",
      },
      { speaker: "Lena", text: "Hey. I've been watching you all week." },
      {
        speaker: "You",
        text: "Here it comes. She noticed. She knows I'm a mess.",
      },
      {
        speaker: "Lena",
        text: "You okay? You seem... really far away lately. Like you're carrying the whole world.",
      },
    ],
    innerSource: "System Detect // Lena",
    innerText:
      "Lena's Thoughts: 'I’m not sure how to help, but I hope they know they don’t have to carry everything alone. I miss seeing them actually smile. Please let me in.'",
    choices: [
      {
        id: "4a",
        text: "Say: 'I'm fine. Just busy.'",
        followUpText:
          "You force a smile. It feels tight. Lena looks disappointed, but nods. You put the mask back on, heavier than before.",
        nextSceneId: "CALCULATE_ENDING",
        impact: { resilience: -1, anxiety: 2 },
      },
      {
        id: "4b",
        text: "Say: 'I don't know, honestly.'",
        followUpText:
          "The words tumble out before you can stop them. It's terrifying, but Lena's face softens instantly. It feels like setting down a heavy bag.",
        nextSceneId: "CALCULATE_ENDING",
        impact: { resilience: 0, anxiety: -1 },
      },
      {
        id: "4c",
        text: "Say: 'It's hard to explain right now.'",
        followUpText:
          "You don't reveal everything, but you don't lie either. Lena squeezes your arm. 'I'm here when you're ready,' she says.",
        nextSceneId: "CALCULATE_ENDING",
        impact: { resilience: 1, anxiety: 0 },
      },
    ],
  },

  // ============================================================
  // ENDINGS (Reflection and Lessons)
  // ============================================================

  // --- GOOD ENDING ---
  ending_good: {
    id: "ending_good",
    title: "Ending: More Than Performance",
    backgroundStyle: "warm_sunset",
    characterVisible: null,
    musicTrack: "good",
    isEnding: true,
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "You step outside. The rain has stopped. The late afternoon sun is breaking through the clouds.",
      },
      {
        speaker: "You",
        text: "I told her. I actually told her I wasn't okay.",
      },
      {
        speaker: "Observation",
        text: "And the sky didn't fall. The world didn't end. In fact, it feels a little bit brighter.",
      },
      {
        speaker: "You",
        text: "Jordan was scared too. Lena was worried, not judging.",
      },
      {
        speaker: "Observation",
        text: "The weight is still there on your shoulders, but it feels... lighter. Shared.",
      },
      {
        speaker: "You",
        text: "I don't have to be a machine. I don't have to be perfect to be worthy of love.",
      },
      { speaker: "You", text: "I'm just a person. And that is enough." },
    ],
    innerSource: "Realization",
    innerText:
      "Connection brings safety. I can allow myself to be human. You don’t have to shine to be worthy of the sky.",
    choices: [],
    lesson: {
      title: "A softer definition of strength",
      message:
        "Self-worth isn’t a reward for perfect performance. It’s something you’re allowed to carry even on imperfect days.",
      action:
        "Name one thing you did today that was brave — even if it was small.",
    },
  },

  // --- NEUTRAL ENDING ---
  ending_neutral: {
    id: "ending_neutral",
    title: "Ending: Still Learning",
    backgroundStyle: "neutral_rain",
    characterVisible: null,
    musicTrack: "neutral",
    isEnding: true,
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "The day ends. The rain continues to drum rhythmically against the window pane.",
      },
      {
        speaker: "You",
        text: "It wasn't a perfect day. I stumbled. I struggled.",
      },
      {
        speaker: "Observation",
        text: "You look at your checklist. Not everything is crossed off. That used to terrify you.",
      },
      {
        speaker: "You",
        text: "But I'm still here. I survived the moment I thought would break me.",
      },
      {
        speaker: "Observation",
        text: "You aren't 'fixed'. The anxiety is still buzzing in the background. But you are aware of it now.",
      },
      {
        speaker: "You",
        text: "That is the first step. Maybe tomorrow will be better. Maybe not. But I'll show up for it.",
      },
    ],
    innerSource: "Reflection",
    innerText:
      "Life is heavy. But I'm trying. Maybe healing isn’t dramatic. Maybe it’s just learning to stay.",
    choices: [],
    lesson: {
      title: "Progress counts even when it’s quiet",
      message:
        "Healing isn’t a switch. Sometimes it’s just choosing not to abandon yourself.",
      action:
        "Replace one harsh thought with a neutral one: 'I’m failing' → 'I’m learning.'",
    },
  },

  // --- BAD ENDING ---
  ending_bad: {
    id: "ending_bad",
    title: "Ending: The Mask Hardens",
    backgroundStyle: "grayscale_storm",
    characterVisible: null,
    musicTrack: "bad",
    isEnding: true,
    dialogueSequence: [
      {
        speaker: "Observation",
        text: "You go home and lock your bedroom door immediately. You don't turn on the lights.",
      },
      { speaker: "You", text: "Why did I say that? Why was I so weak?" },
      {
        speaker: "Observation",
        text: "You sit in the dark, replaying the stutter in your head. Over and over. A loop of failure.",
      },
      { speaker: "You", text: "They all saw. They all know now. I'm a fraud." },
      {
        speaker: "You",
        text: "I have to be better. Stronger. Cold. No more slips.",
      },
      {
        speaker: "Observation",
        text: "You open your notebook and write a new checklist. Longer. Harder. Impossible.",
      },
      {
        speaker: "You",
        text: "Next time, the armor will be flawless. No one will ever see me slip again.",
      },
    ],
    innerSource: "Internal Monologue",
    innerText:
      "Everyone else is better than me. I must not burden them. If only they knew how heavy this smile is.",
    choices: [],
    lesson: {
      title: "The mask protected you — but it’s heavy",
      message:
        "If you learned to survive by being strong, that makes sense. But you don’t have to carry it alone forever.",
      action:
        "Text one person: 'Hey, today was a lot. Can I talk for 5 minutes?'",
    },
  },
};
// ==========================================
// 3. BACKGROUND MUSIC
// ==========================================
const BackgroundMusic = ({
  trackKey,
}: {
  trackKey: keyof typeof ASSET_PATHS.audio;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      const currentSrc = audioRef.current.getAttribute("src");
      const newSrc = ASSET_PATHS.audio[trackKey] || ASSET_PATHS.audio.default;
      if (currentSrc !== newSrc) {
        audioRef.current.src = newSrc;
        if (isPlaying) audioRef.current.play().catch((e) => console.log(e));
      }
    }
  }, [trackKey, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log(e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className="group flex items-center gap-3 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_#000] rounded-sm hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all"
      >
        <span className="text-xs font-bold tracking-widest text-black hidden md:block font-serif">
          {isPlaying ? "MUSIC ON" : "MUSIC OFF"}
        </span>
        {isPlaying ? (
          <Volume2 size={16} className="text-black animate-pulse" />
        ) : (
          <VolumeX size={16} className="text-gray-400" />
        )}
      </button>
      <audio ref={audioRef} loop>
        <source src={ASSET_PATHS.audio.default} type="audio/mpeg" />
      </audio>
    </div>
  );
};

// ==========================================
// 4. LESSON CARD MODAL
// ==========================================
const LessonCard = ({
  lesson,
  onClose,
}: {
  lesson: LessonContent;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80  animate-in fade-in zoom-in duration-300 p-6">
      <div className="relative w-full max-w-lg bg-[#fdfbf7] border-4 border-black shadow-[10px_10px_0px_#fff] p-8 md:p-12 rotate-1">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black hover:rotate-90 transition-all"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-1 bg-black rounded-full mb-2"></div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 leading-tight">
            {lesson.title}
          </h2>
          <div className="w-full h-px bg-gray-300"></div>
          <p className="text-lg text-gray-700 font-serif italic">
            &ldquo;{lesson.message}&rdquo;
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-200 p-4 w-full rounded-sm">
            <span className="text-xs font-bold tracking-widest text-yellow-800 uppercase block mb-2">
              Try this (30s)
            </span>
            <p className="text-md font-medium text-gray-800">{lesson.action}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-8 py-3 bg-black text-white font-bold tracking-widest hover:bg-gray-800 transition-all shadow-md"
          >
            RESTART STORY
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. INTRO SCENE
// ==========================================
const IntroScene = ({
  onStart,
  isExiting,
}: {
  onStart: () => void;
  isExiting: boolean;
}) => {
  const [mounted, setMounted] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [particles, setParticles] = useState<
    { id: number; left: string; top: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#e8e6e1] relative overflow-hidden font-sans flex items-center justify-center transition-all duration-1000 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&family=Crimson+Text:ital,wght@0,400;1,400&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");
        .notebook-bg {
          background-color: #fdfbf7;
          background-image: linear-gradient(#e5e7eb 1px, transparent 1px);
          background-size: 100% 2rem;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 10px 0 -5px #fff,
            0 10px 1px -4px rgba(0, 0, 0, 0.15), 0 20px 0 -10px #fff,
            0 20px 1px -9px rgba(0, 0, 0, 0.15);
        }
        @keyframes draw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUpFade 1s ease-out forwards;
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div
        className={`relative z-10 w-full max-w-3xl mx-4 transition-all duration-1000 ease-out transform ${
          mounted
            ? "opacity-100 translate-y-0 rotate-0"
            : "opacity-0 translate-y-20 rotate-1"
        }`}
      >
        <div className="notebook-bg relative px-8 py-12 md:p-16 min-h-[700px] border-l-4 border-gray-200/50">
          <div className="relative pl-6">
            <div
              className="flex justify-between items-end border-b-2 border-gray-200 pb-2 mb-12 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h1
                className="text-4xl md:text-5xl text-gray-800 font-light"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                The Weight We Carry
              </h1>
              <div
                className="text-gray-400 text-sm font-handwriting hidden md:block"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Entry No. 01
              </div>
            </div>
            <div
              className={`relative w-full h-64 flex items-center justify-center mb-8 transition-all duration-1000 ${
                mounted ? "blur-0" : "blur-sm"
              }`}
            >
              <div className="absolute inset-10 bg-white/40 transform -rotate-1 rounded-sm shadow-sm opacity-50"></div>
              <svg
                className="relative w-full h-full z-10"
                viewBox="0 0 400 250"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="#2d2d2d"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <g
                    className="animate-draw"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <rect x="40" y="180" width="30" height="8" rx="1" />
                    <rect x="42" y="172" width="26" height="8" rx="1" />
                    <rect x="44" y="164" width="22" height="8" rx="1" />
                  </g>
                  <g
                    className="animate-draw"
                    style={{ animationDelay: "1.8s" }}
                  >
                    <ellipse cx="200" cy="100" rx="18" ry="22" />
                    <path d="M 200 122 L 200 180" />
                    <path d="M 200 140 Q 180 145 175 180" />
                    <path d="M 200 140 Q 220 145 235 155" />
                    <path d="M 235 155 L 240 170" />
                    <path d="M 200 180 Q 190 190 185 210" />
                    <path d="M 200 180 Q 210 185 220 190" />
                  </g>
                  <g
                    className="animate-draw"
                    style={{ animationDelay: "3.0s" }}
                  >
                    <path
                      d="M 310 60 Q 325 40 340 60 Q 350 60 350 70 Q 350 80 340 80 L 310 80 Q 300 80 300 70 Q 300 60 310 60"
                      strokeDasharray="2,2"
                      opacity="0.6"
                    />
                    <line x1="315" y1="85" x2="315" y2="100" opacity="0.4" />
                    <line x1="325" y1="90" x2="325" y2="110" opacity="0.4" />
                    <line x1="335" y1="85" x2="335" y2="100" opacity="0.4" />
                  </g>
                  <g
                    className="animate-draw"
                    style={{ animationDelay: "4.0s" }}
                  >
                    <path d="M 160 195 L 160 210 Q 160 215 170 215 L 175 215 L 175 195" />
                    <path d="M 175 200 Q 182 200 182 205 Q 182 210 175 210" />
                    <rect x="260" y="185" width="35" height="10" rx="1" />
                    <rect x="258" y="175" width="32" height="10" rx="1" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="space-y-8 text-center px-4 md:px-12 mb-16">
              <p
                className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic animate-slide-up"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  animationDelay: "5.0s",
                }}
              >
                &ldquo;Some mornings feel heavier than the bag on my
                shoulders...&rdquo;
              </p>
              <div
                className="flex justify-center animate-slide-up"
                style={{ animationDelay: "5.5s" }}
              >
                <CloudRain className="text-gray-300 animate-pulse" size={24} />
              </div>
              <div
                className="flex justify-center pb-8 animate-slide-up"
                style={{ animationDelay: "7.0s" }}
              >
                <button
                  onClick={onStart}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-gray-800 border-2 border-gray-800 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[4px_8px_0px_rgba(0,0,0,0.8)] active:translate-y-0 active:shadow-none"
                >
                  <span
                    className="relative text-lg tracking-widest font-bold uppercase"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    Turn The Page
                  </span>
                  <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. VISUAL NOVEL UI
// ==========================================
const VisualNovelScene = ({
  scene,
  onChoice,
  onSceneTransition,
  isTransitioning,
}: {
  scene: SceneData;
  onChoice: (choice: Choice) => void;
  onSceneTransition: (nextId: string) => void;
  isTransitioning: boolean;
}) => {
  const [showInnerWorld, setShowInnerWorld] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [followUpText, setFollowUpText] = useState<string | null>(null);
  const [pendingNextScene, setPendingNextScene] = useState<string | null>(null);
  const [showLesson, setShowLesson] = useState(false);

  // LOGIC: If Ending -> Always Unlocked. Else -> Unlock only during Follow-up.
  const isRevealUnlocked =
    scene.isEnding || (followUpText !== null && scene.innerText.length > 0);

  const TYPING_SPEED = 25;

  useEffect(() => {
    setShowInnerWorld(false);
    setAnimateIn(false);
    setDialogueIndex(0);
    setShowChoices(false);
    setFollowUpText(null);
    setPendingNextScene(null);
    setDisplayedText("");
    setShowLesson(false);
    const timer = setTimeout(() => setAnimateIn(true), 200);
    return () => clearTimeout(timer);
  }, [scene.id]);

  useEffect(() => {
    const targetText =
      followUpText ||
      (scene.dialogueSequence[dialogueIndex]
        ? scene.dialogueSequence[dialogueIndex].text
        : "");
    if (!targetText) return;

    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(targetText.slice(0, charIndex));
      if (charIndex >= targetText.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (
          !followUpText &&
          dialogueIndex >= scene.dialogueSequence.length - 1
        ) {
          setShowChoices(true);
        }
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [dialogueIndex, followUpText, scene.dialogueSequence]);

  const handleBoxClick = () => {
    if (isTransitioning) return;
    if (isTyping) {
      const targetText =
        followUpText || scene.dialogueSequence[dialogueIndex].text;
      setDisplayedText(targetText);
      setIsTyping(false);
      if (!followUpText && dialogueIndex >= scene.dialogueSequence.length - 1)
        setShowChoices(true);
      return;
    }
    if (showChoices && !followUpText) return;
    if (followUpText && pendingNextScene) {
      onSceneTransition(pendingNextScene);
      return;
    }
    if (dialogueIndex < scene.dialogueSequence.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleChoiceClick = (choice: Choice | null) => {
    if (!choice) {
      onSceneTransition("intro");
      return;
    }
    onChoice(choice);
    setShowChoices(false);
    setFollowUpText(choice.followUpText);
    setPendingNextScene(choice.nextSceneId);
  };

  const bgImage = ASSET_PATHS.backgrounds[scene.backgroundStyle] || "";
  let characterImage = null;
  if (scene.characterVisible === "jordan")
    characterImage = ASSET_PATHS.characters.jordan;
  if (scene.characterVisible === "lena")
    characterImage = ASSET_PATHS.characters.lena;
  const protagonistImage = ASSET_PATHS.characters.protagonist;
  const currentSpeaker = followUpText
    ? "You"
    : scene.dialogueSequence[dialogueIndex]?.speaker || "...";

  return (
    <div
      className={`relative w-full h-screen overflow-hidden font-sans bg-gray-100 text-gray-900 select-none transition-all duration-700 ease-in-out ${
        isTransitioning
          ? "opacity-0 scale-105 filter blur-sm"
          : "opacity-100 scale-100 filter blur-0"
      }`}
    >
      <style jsx global>{`
        .bg-screentone {
          background-image: radial-gradient(#000000 1px, transparent 1px);
          background-size: 6px 6px;
        }
      `}</style>

      {/* Lesson Modal */}
      {showLesson && scene.lesson && (
        <LessonCard
          lesson={scene.lesson}
          onClose={() => onSceneTransition("intro")}
        />
      )}

      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          showInnerWorld
            ? "grayscale contrast-125 brightness-75"
            : "grayscale-0"
        } ${animateIn ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundColor: "#f3f4f6",
        }}
      >
        {showInnerWorld && (
          <div className="absolute inset-0 bg-screentone opacity-20 pointer-events-none"></div>
        )}
      </div>

      {/* Characters */}
      <div
        className={`absolute inset-0 z-10 flex justify-between items-end px-4 md:px-20 pb-0 pointer-events-none transition-all duration-500 ${
          showInnerWorld ? "blur-sm opacity-50 grayscale" : "blur-0 opacity-100"
        }`}
      >
        <div
          className="relative w-[45%] md:w-[30%] h-[90%] bg-contain bg-no-repeat bg-bottom transition-transform duration-700 transform translate-y-0"
          style={{
            backgroundImage: `url(${protagonistImage})`,
            backgroundColor: protagonistImage ? "transparent" : "transparent",
          }}
        ></div>
        {characterImage && (
          <div
            // CHANGE 1: Increased mobile width from 45% to 60%
            // CHANGE 2: Increased desktop width (md) from 30% to 45%
            className="relative w-[60%] md:w-[45%] h-[100%] bg-contain bg-no-repeat bg-bottom transition-all duration-500 animate-slide-up"
            style={{
              backgroundImage: `url(${characterImage})`,
              backgroundColor: characterImage ? "transparent" : "transparent",
            }}
          ></div>
        )}
      </div>

      {/* UI Layer */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end">
        {/* Choices OR Lesson Button */}
        {showChoices && !followUpText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40  z-50 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col gap-6 w-full max-w-2xl px-6">
              {scene.isEnding ? (
                <button
                  onClick={() => setShowLesson(true)}
                  className="group relative w-full bg-black border-2 border-black py-6 px-10 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#fff] shadow-[3px_3px_0px_#fff]"
                >
                  <div className="flex items-center justify-center gap-3 text-white">
                    <BookOpen size={24} />
                    <span className="text-2xl font-bold font-serif uppercase tracking-widest">
                      View Lesson
                    </span>
                  </div>
                </button>
              ) : (
                <>
                  <h3 className="text-center font-bold font-serif text-2xl uppercase tracking-widest text-black bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] mx-auto rotate-1">
                    Make Your Choice
                  </h3>
                  {scene.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceClick(choice)}
                      className="group relative w-full bg-white border-2 border-black py-5 px-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] shadow-[3px_3px_0px_#000]"
                    >
                      <span className="relative z-10 text-lg md:text-xl font-bold font-serif text-black group-hover:text-black">
                        {choice.text}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Dialogue Box */}
        <div
          onClick={handleBoxClick}
          className={`relative w-full border-t-4 border-black cursor-pointer min-h-[220px] md:min-h-[160px] pb-8 pt-10 px-6 md:px-20 flex flex-col justify-start transition-colors duration-300 ${
            showInnerWorld ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

          <div className="absolute -top-5 left-6 md:left-20 z-40">
            <div
              className={`px-6 py-2 border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-3 -rotate-1 ${
                showInnerWorld ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              <div className="font-bold tracking-widest text-sm md:text-base uppercase flex items-center gap-2 font-serif">
                {showInnerWorld ? <Brain size={16} /> : <PenTool size={16} />}
                {showInnerWorld ? scene.innerSource : currentSpeaker}
              </div>
            </div>
          </div>

          {/* Reveal Alert (Hidden in Endings as button is always unlocked) */}
          {isRevealUnlocked && !showInnerWorld && !scene.isEnding && (
            <div className="absolute -top-16 right-6 md:right-20 z-50 flex flex-col items-end animate-bounce">
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 mb-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                ⚠ TRUTH DETECTED
              </div>
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-red-500 mr-8"></div>
            </div>
          )}

          {/* Inner World Toggle */}
          <div className="absolute -top-4 right-6 md:right-20 z-40">
            <button
              disabled={!isRevealUnlocked}
              onClick={(e) => {
                e.stopPropagation();
                setShowInnerWorld(!showInnerWorld);
              }}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] text-xs font-bold transition-all ${
                !isRevealUnlocked
                  ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                  : "hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000]"
              } ${
                showInnerWorld ? "bg-white text-black" : "bg-white text-black"
              }`}
            >
              {showInnerWorld ? <Eye size={14} /> : <EyeOff size={14} />}{" "}
              {showInnerWorld ? "HIDE TRUTH" : "REVEAL TRUTH"}
            </button>
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto mt-2">
            <p
              className={`text-xl md:text-3xl leading-relaxed font-serif tracking-wide ${
                showInnerWorld ? "italic font-light" : "font-medium"
              }`}
            >
              {showInnerWorld ? scene.innerText : displayedText}
              {!showInnerWorld && isTyping && (
                <span className="animate-pulse ml-1 inline-block w-3 h-6 bg-current align-middle"></span>
              )}
            </p>
          </div>

          {!showInnerWorld && !isTyping && !showChoices && (
            <div className="absolute bottom-6 right-10 animate-bounce">
              <Play
                fill="currentColor"
                size={24}
                className="transform rotate-90"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. MAIN CONTROLLER
// ==========================================
// ==========================================
// 6. MAIN CONTROLLER
// ==========================================
const MentalHealthStory = () => {
  const [sceneId, setSceneId] = useState("intro");
  const [metrics, setMetrics] = useState({ resilience: 0, anxiety: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (nextSceneId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSceneId(nextSceneId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
  };

  const handleStart = () => {
    transitionTo("act1_commute");
  };

  const handleMetricUpdate = (choice: Choice) => {
    const newMetrics = {
      resilience: metrics.resilience + choice.impact.resilience,
      anxiety: metrics.anxiety + choice.impact.anxiety,
    };
    setMetrics(newMetrics);
  };

  const handleSceneTransition = (nextId: string) => {
    let targetId = nextId;

    if (nextId === "CALCULATE_ENDING") {
      // LOGIC FIX:
      // 1. Resilience >= 3 -> Good
      // 2. Anxiety > 4 (Strictly greater) -> Bad. (So 4 is still Neutral)
      // 3. Else -> Neutral

      targetId = "ending_neutral"; // Default

      if (metrics.resilience >= 3) {
        targetId = "ending_good";
      } else if (metrics.anxiety > 4) {
        // Changed from >= to >
        targetId = "ending_bad";
      }

      // Optional: Add console log to debug
      console.log(
        `Ending Calc: Res=${metrics.resilience}, Anx=${metrics.anxiety} -> ${targetId}`
      );
      const restart = {
        resilience: 0,
        anxiety: 0,
      };
      setMetrics(restart);
    }

    transitionTo(targetId);
  };

  // Get current music track
  const currentSceneData = STORY_DATA[sceneId];
  const currentTrack = currentSceneData?.musicTrack || "default";

  return (
    <div className="font-sans antialiased text-gray-900 bg-white relative">
      <BackgroundMusic trackKey={currentTrack} />

      {/* DEBUGGER: REMOVE THIS DIV WHEN DEPLOYING IF YOU WANT */}
      {sceneId !== "intro" && (
        <div className="fixed bottom-2 left-2 z-50 text-[10px] font-mono text-gray-400 opacity-50 pointer-events-none">
          R:{metrics.resilience} A:{metrics.anxiety}
        </div>
      )}

      {sceneId === "intro" ? (
        <IntroScene onStart={handleStart} isExiting={isTransitioning} />
      ) : (
        <VisualNovelScene
          scene={STORY_DATA[sceneId] || STORY_DATA["act1_commute"]}
          onChoice={handleMetricUpdate}
          onSceneTransition={handleSceneTransition}
          isTransitioning={isTransitioning}
        />
      )}
    </div>
  );
};

export default MentalHealthStory;
