import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgressTracker } from "./useProgressTracker";

const workshopSteps = [
  {
    step: 0,
    title: "Enter the Studio",
    analogy: "Every great project starts with a signature.",
    description:
      "Welcome to the Vibe Coding V-Team. Before we unlock the workbench, tell us your name so we can save your progress in the studio archives.",
    instruction: "Type your name below and hit 'Enter the Studio'.",
    buttonText: "Enter the Studio",
  },
  {
    step: 1,
    title: "The Master Workbench",
    analogy: "VS Code isn't just an editor; it's your digital easel.",
    description:
      "This is where your ideas take shape. It's designed to be customized, just like your physical desk.",
    instruction:
      "Download 'VS Code for Mac' from the official site. Drag it into your Applications folder and open it up!",
    link: "https://code.visualstudio.com/",
    buttonText: "I've set up my workbench",
  },
  {
    step: 2,
    title: "The Engine Room",
    analogy: "Node.js is the electricity for your prototypes.",
    description:
      "Your Mac is powerful, but Node.js gives it the 'logic' needed to run interactive websites. It stays invisible, but it makes everything move.",
    instruction:
      "Download the 'LTS' version (the green button). Run the installer just like any other app.",
    link: "https://nodejs.org/",
    buttonText: "The engine is purring",
  },
  {
    step: 3,
    title: "The Teleportation Console",
    analogy: "The Terminal is a shortcut, not a scary black box.",
    description:
      "Instead of clicking through 10 folders, you can just tell your computer where to go. It's like using 'Command + K' but for your whole system.",
    instruction:
      "In VS Code, press 'Ctrl + `' (the key next to 1). Type 'node -v' and hit Enter. If a number appears, you've successfully summoned the console!",
    buttonText: "I've mastered the console",
  },
  {
    step: 4,
    title: "Spawning the Canvas",
    analogy: "Vite is like an 'Auto-Layout' that sets up your whole project for you.",
    description:
      "We are going to create a 'Vite' project. It's a modern, lightning-fast foundation that comes pre-packaged with everything a designer needs.",
    instruction:
      "Paste this into your terminal: 'npm create vite@latest my-vibe-app -- --template react'. Follow the prompts, then type 'cd my-vibe-app' and 'npm install'.",
    buttonText: "Canvas is ready",
  },
  {
    step: 5,
    title: "The Microsoft Stencil Kit",
    analogy: "Fluent UI is your set of pro-grade Microsoft components.",
    description:
      "Why draw a button from scratch? We’re installing the official Fluent library so you can use the same building blocks as the pros at Microsoft.",
    instruction:
      "Paste this: 'npm install @fluentui/react-components'. Then, type 'npm run dev' to see your project go live in the browser!",
    buttonText: "It's alive!",
  },
  {
    step: 6,
    title: "The Master Joiner",
    analogy: "You've officially unlocked the workshop.",
    description:
      "The setup is done. You are no longer just a designer; you are a Vibe Coder. You have the workbench, the engine, and the stencils.",
    instruction:
      "Click below to claim your 'Master Joiner' badge and notify the V-Team of your success!",
    buttonText: "Claim My Badge",
  },
];

const steps = workshopSteps;

function Badge({ unlocked }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-indigo-50/70 to-sky-100/60" />
      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition duration-500 ${
            unlocked
              ? "bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 text-white shadow-lg shadow-sky-200/60"
              : "border-dashed border-slate-300 bg-slate-50 text-slate-400"
          }`}
        >
          <span className="text-2xl drop-shadow-sm">🎮</span>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Badge
          </p>
          <p
            className={`text-lg font-semibold ${
              unlocked ? "text-slate-900" : "text-slate-400"
            }`}
          >
            Architect’s Seal
          </p>
          <p className="text-sm text-slate-500">
            {unlocked ? "Unlocked — welcome to the studio!" : "Grayed out until the final step."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [name, setName] = useState("");
  const trackProgress = useProgressTracker();
  const totalSteps = steps.length;
  const progress = useMemo(() => (step / (totalSteps - 1)) * 100, [step, totalSteps]);
  const canProceed = step === 0 ? Boolean(name.trim()) : step < totalSteps - 1;

  const handleRestart = () => {
    setDirection(-1);
    setStep(0);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => {
      const next = Math.min(totalSteps - 1, prev + 1);
      if (next !== prev) {
        void trackProgress({ step: next, name: name || undefined });
      }
      return next;
    });
  };

  const handlePrevious = () => {
    setDirection(-1);
    setStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed inset-x-0 top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Onboarding</p>
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">Setting up your Visual Studio</h1>
                <p className="text-sm text-slate-600">
                  An IDE is your digital workbench for building and previewing code.
                </p>
              </div>
              {step > 0 && step < totalSteps - 1 && (
                <span className="text-xs font-medium text-slate-500">Step {step + 1} of {totalSteps}</span>
              )}
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="pt-36 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
                className="space-y-6"
              >
                {step === 0 ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 p-8 shadow-inner">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Welcome</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                          {steps[step].title}
                        </h2>
                        <p className="mt-2 text-base text-slate-700">{steps[step].description}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                          <span className="rounded-full bg-white px-3 py-1 shadow-sm">🎮 Vibe-coding mode</span>
                          <span className="rounded-full bg-white px-3 py-1 shadow-sm">✨ Designer-friendly</span>
                          <span className="rounded-full bg-white px-3 py-1 shadow-sm">🚀 Start fast</span>
                        </div>
                      </div>
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-lg">
                        <span className="text-3xl">💻</span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-[1fr,auto] sm:items-end sm:gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Your name</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Type your name"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!name.trim()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 disabled:bg-slate-200 disabled:text-white sm:self-end"
                      >
                        Start My Journey
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : step === totalSteps - 1 ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Final step</p>
                    <h2 className="text-3xl font-semibold">{steps[step].title}</h2>
                    <p className="max-w-xl text-center text-base text-slate-600">{steps[step].description}</p>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.3, 1.1, 0.3, 1] }}
                    >
                      <Badge unlocked />
                    </motion.div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                      >
                        Restart
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Next Module
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-8 lg:grid-cols-[0.4fr,0.6fr]">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Instruction</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">{steps[step].title}</h2>
                        <p className="mt-2 text-sm text-slate-600">{steps[step].description}</p>
                      </div>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                        <li>{steps[step].instruction}</li>
                        {steps[step].link ? (
                          <li>
                            <a
                              href={steps[step].link}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-sky-600 underline"
                            >
                              Open guide
                            </a>
                          </li>
                        ) : null}
                      </ul>
                      <CommandBox command={commandForStep(steps[step].step)} />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-full rounded-3xl border border-dashed border-slate-200 bg-slate-100/70 p-6 text-center text-sm text-slate-500">
                        <div className="absolute inset-0 rounded-3xl border border-slate-200" />
                        <div className="relative space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Reference</p>
                          <p className="text-base font-semibold text-slate-800">Image / Video Placeholder</p>
                          <p className="text-sm text-slate-600">{altTextForStep(steps[step].step)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step > 0 && step < totalSteps - 1 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">Step {step + 1} / {totalSteps}</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={step === 0}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow disabled:translate-y-0 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow disabled:translate-y-0 disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    {step === totalSteps - 1 ? "Done" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandBox({ command }) {
  const [copied, setCopied] = useState(false);

  if (!command) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-300 bg-slate-900 px-4 py-3 shadow-sm">
      <code className="pr-3 text-sm font-mono text-sky-200">{command}</code>
      <button
        onClick={handleCopy}
        className={`rounded px-3 py-1 text-xs font-bold transition-colors ${
          copied ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"
        }`}
      >
        {copied ? "COPIED!" : "COPY"}
      </button>
    </div>
  );
}

function commandForStep(step) {
  const map = {
    3: "node -v",
    4: "npm create vite@latest my-vibe-app -- --template react",
    5: "npm install @fluentui/react-components && npm run dev",
  };
  return map[step];
}

function altTextForStep(step) {
  const map = {
    1: "Drag the VS Code icon from Downloads into Applications on macOS.",
    2: "Node.js website with the green LTS download button highlighted.",
    3: "In VS Code, open Terminal via Ctrl+` and run node -v to verify install.",
    4: "VS Code terminal showing Vite create command finishing and folder tree.",
    5: "Terminal running npm run dev and browser opening the default React page.",
  };
  return map[step] || "Reference visual placeholder.";
}
