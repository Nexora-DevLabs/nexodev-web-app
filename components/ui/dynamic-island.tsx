"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Calendar,
  Mail,
  MessageCircle,
  X,
  Star,
  GitBranch,
  ExternalLink,
  User,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types for face expressions
type FaceExpression =
  | "idle"
  | "blink"
  | "wink"
  | "glanceLeft"
  | "glanceRight"
  | "smirk"
  | "smile"
  | "bounceInvite";

// Types for island states
type IslandState =
  | "closed"
  | "compact"
  | "github"
  | "calendar"
  | "contact"
  | "social";

interface ExpressionConfig {
  weight: number;
  duration: number;
  minDelay: number;
  maxDelay: number;
}

// Expression configurations with weighted randomness
const expressions: Record<FaceExpression, ExpressionConfig> = {
  idle: { weight: 0, duration: 0, minDelay: 0, maxDelay: 0 }, // Base state
  blink: { weight: 40, duration: 0.15, minDelay: 2, maxDelay: 8 }, // More frequent blinking
  wink: { weight: 15, duration: 0.3, minDelay: 4, maxDelay: 12 }, // More frequent winking
  glanceLeft: { weight: 15, duration: 0.4, minDelay: 3, maxDelay: 10 }, // More frequent glancing
  glanceRight: { weight: 15, duration: 0.4, minDelay: 3, maxDelay: 10 }, // More frequent glancing
  smirk: { weight: 10, duration: 0.6, minDelay: 5, maxDelay: 15 }, // More frequent smirking
  smile: { weight: 20, duration: 0.8, minDelay: 4, maxDelay: 12 }, // New smile expression
  bounceInvite: { weight: 0, duration: 0.8, minDelay: 8, maxDelay: 20 }, // More frequent bouncing
};

// Utility function to get random expression based on weights
const getRandomExpression = (): FaceExpression => {
  const validExpressions = Object.entries(expressions).filter(
    ([key, config]) =>
      key !== "idle" && key !== "bounceInvite" && config.weight > 0,
  );

  const totalWeight = validExpressions.reduce(
    (sum, [, config]) => sum + config.weight,
    0,
  );
  let random = Math.random() * totalWeight;

  for (const [key, config] of validExpressions) {
    random -= config.weight;
    if (random <= 0) return key as FaceExpression;
  }

  return "blink"; // Fallback
};

// Utility function to get random delay with jitter
const getRandomDelay = (min: number, max: number): number => {
  const baseDelay = Math.random() * (max - min) + min;
  const jitter = (Math.random() - 0.5) * 2; // ±1 second variance
  return Math.max(1, baseDelay + jitter);
};

// Size configurations for different states with iOS-like proportions
const sizeConfigs = {
  closed: { width: 128, height: 40, borderRadius: 20 },
  compact: { width: 440, height: 160, borderRadius: 30 },
  github: { width: 420, height: 280, borderRadius: 30 },
  calendar: { width: 460, height: 300, borderRadius: 30 },
  contact: { width: 420, height: 260, borderRadius: 30 },
  social: { width: 440, height: 160, borderRadius: 30 },
};

export function DynamicIsland() {
  const [currentExpression, setCurrentExpression] =
    useState<FaceExpression>("idle");
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentState, setCurrentState] = useState<IslandState>("closed");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [githubStats, setGithubStats] = useState<any>(null);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [previousState, setPreviousState] = useState<IslandState>("closed");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Dynamic spring transforms based on mouse proximity
  const eyeX = useSpring(useTransform(cursorX, [-200, 200], [-3, 3]), {
    stiffness: isHovered ? 800 : 300,
    damping: isHovered ? 15 : 30,
  });
  const eyeY = useSpring(useTransform(cursorY, [-200, 200], [-2, 2]), {
    stiffness: isHovered ? 800 : 300,
    damping: isHovered ? 15 : 30,
  });

  const timeoutRef = useRef<NodeJS.Timeout>();
  const bounceTimeoutRef = useRef<NodeJS.Timeout>();

  // Enhanced state management with proper navigation flow
  const navigateTo = useCallback(
    (newState: IslandState) => {
      console.log("Navigating from", currentState, "to", newState);

      if (newState === "closed") {
        setPreviousState(currentState);
        setCurrentState("closed");
      } else if (newState === "compact") {
        setPreviousState(currentState);
        setCurrentState("compact");
      } else {
        // For specific feature states, always go through compact first
        if (currentState === "closed") {
          setPreviousState("closed");
          setCurrentState("compact");
          // Small delay then navigate to feature
          setTimeout(() => {
            setPreviousState("compact");
            setCurrentState(newState);
          }, 150);
        } else {
          setPreviousState(currentState);
          setCurrentState(newState);
        }
      }
    },
    [currentState],
  );

  const goBack = useCallback(() => {
    if (previousState === "closed") {
      setCurrentState("closed");
    } else {
      setCurrentState("compact");
    }
  }, [previousState]);

  const closeIsland = useCallback(() => {
    setPreviousState(currentState);
    setCurrentState("closed");
  }, [currentState]);

  // Simple click handler for opening the island
  const handleIslandClick = useCallback(() => {
    console.log("Click handler called, current state:", currentState);
    if (currentState === "closed") {
      console.log("Opening island from closed state");
      setPreviousState("closed");
      setCurrentState("compact");
    }
  }, [currentState]);

  // Debug effect to log state changes
  useEffect(() => {
    console.log("Dynamic Island state changed to:", currentState);
  }, [currentState]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = 40; // Approximate island position

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      setMousePosition({ x: deltaX, y: deltaY });
      cursorX.set(deltaX);
      cursorY.set(deltaY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Schedule next expression
  const scheduleNextExpression = useCallback(() => {
    if (reducedMotion) return;

    const expression = getRandomExpression();
    const config = expressions[expression];
    const delay = getRandomDelay(config.minDelay, config.maxDelay);

    timeoutRef.current = setTimeout(() => {
      setCurrentExpression(expression);

      // Return to idle after expression duration
      setTimeout(() => {
        setCurrentExpression("idle");
        scheduleNextExpression();
      }, config.duration * 1000);
    }, delay * 1000);
  }, [reducedMotion]);

  // Schedule bounce invite
  const scheduleBounceInvite = useCallback(() => {
    if (reducedMotion) return;

    const delay = getRandomDelay(
      expressions.bounceInvite.minDelay,
      expressions.bounceInvite.maxDelay,
    );

    bounceTimeoutRef.current = setTimeout(() => {
      setIsBouncing(true);

      setTimeout(() => {
        setIsBouncing(false);
        scheduleBounceInvite();
      }, expressions.bounceInvite.duration * 1000);
    }, delay * 1000);
  }, [reducedMotion]);

  // Start animation cycles
  useEffect(() => {
    if (!reducedMotion) {
      scheduleNextExpression();
      scheduleBounceInvite();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (bounceTimeoutRef.current) clearTimeout(bounceTimeoutRef.current);
    };
  }, [scheduleNextExpression, scheduleBounceInvite, reducedMotion]);

  // Pause animations when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (bounceTimeoutRef.current) clearTimeout(bounceTimeoutRef.current);
      } else {
        if (!reducedMotion) {
          scheduleNextExpression();
          scheduleBounceInvite();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [scheduleNextExpression, scheduleBounceInvite, reducedMotion]);

  // Fetch GitHub stats when GitHub state is opened
  useEffect(() => {
    if (currentState === "github" && !githubStats && !isLoadingGithub) {
      fetchGitHubStats();
    }
  }, [currentState, githubStats, isLoadingGithub]);

  const fetchGitHubStats = async () => {
    setIsLoadingGithub(true);
    try {
      const reposResponse = await fetch(
        "https://api.github.com/orgs/Nexora-DevLabs/repos?per_page=100&sort=updated",
      );
      const repos = await reposResponse.json();

      if (Array.isArray(repos)) {
        const stats = {
          totalStars: 0,
          totalForks: 0,
          totalWatchers: 0,
          totalRepos: repos.length,
          publicRepos: repos.filter((repo) => !repo.private).length,
          privateRepos: repos.filter((repo) => repo.private).length,
          lastUpdated: new Date().toLocaleDateString(),
        };
        setGithubStats(stats);
      }
    } catch (error) {
      console.error("Failed to fetch GitHub stats:", error);
    } finally {
      setIsLoadingGithub(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          navigateTo("compact");
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced iOS-like animation variants
  const islandVariants = {
    idle: { scale: 1, y: 0 },
    bounceInvite: {
      scale: [1, 1.08, 0.96, 1.02, 1],
      y: [0, -6, 1, -2, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: [0.25, 0.46, 0.45, 0.94], // iOS-like easing
      },
    },
  };

  const eyeVariants = {
    idle: { scale: 1, rotate: 0 },
    blink: {
      scale: [1, 0.1, 1],
      transition: { duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    wink: {
      scale: [1, 0.1, 1],
      transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    glanceLeft: {
      rotate: -8,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    glanceRight: {
      rotate: 8,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const mouthVariants = {
    idle: { scale: 1, rotate: 0, scaleY: 1, borderRadius: "50%" },
    smirk: {
      scale: [1, 1.2, 1.05],
      rotate: [0, 3, 1.5],
      scaleY: [1, 1.1, 1.05],
      borderRadius: "50%",
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    smile: {
      scale: 1.15,
      scaleY: 1.6,
      rotate: 0,
      borderRadius: "50%",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    excited: {
      scale: 1.3,
      scaleY: 1.8,
      rotate: 0,
      borderRadius: "50%",
      transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Enhanced content transition variants with better timing
  const contentVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 2,
      filter: "blur(0.5px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      y: -1,
      filter: "blur(0.25px)",
    },
  };

  // Pause face expressions during state transitions and only show in closed state
  const shouldShowFace = currentState === "closed" && !isBouncing;

  // Render different states
  const renderContent = () => {
    switch (currentState) {
      case "closed":
        return shouldShowFace ? (
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Eyes */}
            <div className="-mt-1 flex items-center gap-3">
              {/* Left eye */}
              <motion.div
                className="relative h-2.5 w-2.5 rounded-full bg-cyan-400"
                variants={eyeVariants}
                animate={currentExpression}
                style={{ x: eyeX, y: eyeY }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Eye highlight */}
                <div className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full bg-white/60" />
              </motion.div>

              {/* Right eye */}
              <motion.div
                className="relative h-2.5 w-2.5 rounded-full bg-cyan-400"
                variants={eyeVariants}
                animate={
                  currentExpression === "wink" ? "wink" : currentExpression
                }
                style={{ x: eyeX, y: eyeY }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Eye highlight */}
                <div className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full bg-white/60" />
              </motion.div>
            </div>

            {/* Mouth */}
            <motion.div
              className="absolute bottom-1.5 h-1 w-3 rounded-full bg-cyan-400"
              variants={mouthVariants}
              animate={
                isHovered
                  ? "excited"
                  : currentExpression === "smirk"
                  ? "smirk"
                  : currentExpression === "smile"
                  ? "smile"
                  : "idle"
              }
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        ) : null;

      case "compact":
        return (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-bold text-white">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                Quick Actions
              </div>
              <Button
                onClick={closeIsland}
                size="sm"
                variant="ghost"
                className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo("github")}
                  className="group relative rounded-full border border-gray-600/30 bg-gray-800/20 p-3 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-500/50 hover:bg-gray-800/40 hover:text-white active:scale-95"
                  title="View GitHub Stats"
                >
                  <Github className="h-5 w-5" />
                  <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                </button>

                <button
                  onClick={() => navigateTo("calendar")}
                  className="group relative rounded-full border border-blue-500/30 bg-blue-500/20 p-3 text-blue-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:bg-blue-500/40 hover:text-white active:scale-95"
                  title="Book a Meeting"
                >
                  <Calendar className="h-5 w-5" />
                  <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-blue-400"></div>
                </button>

                <button
                  onClick={() => navigateTo("contact")}
                  className="group relative rounded-full border border-green-500/30 bg-green-500/20 p-3 text-green-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:bg-green-500/40 hover:text-white active:scale-95"
                  title="Send Message"
                >
                  <Mail className="h-5 w-5" />
                  <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                </button>

                <button
                  onClick={() => navigateTo("social")}
                  className="group relative rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-purple-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:bg-purple-500/40 hover:text-white active:scale-95"
                  title="Connect with Us"
                >
                  <MessageCircle className="h-5 w-5" />
                  <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-purple-400"></div>
                </button>
              </div>
            </div>
          </div>
        );

      case "github":
        return (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={goBack}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <Github className="h-5 w-5" />
                  Check out our GitHub!
                </div>
              </div>
              <Button
                onClick={closeIsland}
                size="sm"
                variant="ghost"
                className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isLoadingGithub ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
              </div>
            ) : githubStats ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-gray-800/50 p-2">
                    <Star className="mx-auto mb-1 h-5 w-5 text-yellow-400" />
                    <div className="mb-1 text-lg font-bold text-white">
                      {githubStats.totalStars.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Stars</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/50 p-2">
                    <GitBranch className="mx-auto mb-1 h-5 w-5 text-blue-400" />
                    <div className="mb-1 text-lg font-bold text-white">
                      {githubStats.totalForks.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Forks</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="mb-1 text-base font-bold text-white">
                      {githubStats.totalRepos}
                    </div>
                    <div className="text-xs text-gray-400">Total Repos</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="mb-1 text-base font-bold text-white">
                      {githubStats.publicRepos}
                    </div>
                    <div className="text-xs text-gray-400">Public</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="mb-1 text-base font-bold text-white">
                      {githubStats.privateRepos}
                    </div>
                    <div className="text-xs text-gray-400">Private</div>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    window.open("https://github.com/Nexora-DevLabs", "_blank")
                  }
                  className="flex w-full items-center justify-center gap-2 bg-gray-800 py-3 text-sm text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  View our GitHub
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="mb-4 text-gray-400">
                  Failed to load GitHub stats
                </div>
                <Button
                  onClick={fetchGitHubStats}
                  className="bg-gray-700 transition-all duration-200 hover:bg-gray-600 active:scale-95"
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
        );

      case "calendar":
        return (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={goBack}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Get in touch!
                </div>
              </div>
              <Button
                onClick={closeIsland}
                size="sm"
                variant="ghost"
                className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <p className="mb-3 text-xs text-gray-300">
                  Schedule a time to chat with our team about your project
                </p>
              </div>

              <div className="space-y-2">
                <div className="rounded-lg bg-gray-800/30 p-2">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs font-medium text-white">
                      Quick Book
                    </span>
                  </div>
                  <p className="mb-2 text-xs text-gray-400">
                    Book a 15-minute consultation call
                  </p>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://cal.com/nexora-devlabs/15min",
                        "_blank",
                      )
                    }
                    className="flex w-full items-center justify-center gap-1 bg-blue-500 py-1.5 text-xs text-white transition-all duration-200 hover:bg-blue-600 active:scale-95"
                  >
                    <Calendar className="h-3 w-3" />
                    Book 15min Call
                  </Button>
                </div>

                <div className="rounded-lg bg-gray-800/30 p-2">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    <span className="text-xs font-medium text-white">
                      Fancy a longer chat?
                    </span>
                  </div>
                  <p className="mb-2 text-xs text-gray-400">
                    Need a different duration? Book custom time
                  </p>
                  <Button
                    onClick={() =>
                      window.open("https://cal.com/nexora-devlabs", "_blank")
                    }
                    className="flex w-full items-center justify-center gap-1 bg-purple-500 py-1.5 text-xs text-white transition-all duration-200 hover:bg-purple-600 active:scale-95"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View All Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={goBack}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <Mail className="h-5 w-5 text-green-400" />
                  Get in touch!
                </div>
              </div>
              <Button
                onClick={closeIsland}
                size="sm"
                variant="ghost"
                className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-8">
                <CheckCircle className="h-12 w-12 text-green-400" />
                <h3 className="text-lg font-bold text-white">Message Sent!</h3>
                <p className="text-center text-sm text-gray-300">
                  Thank you for reaching out. We&apos;ll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-600 bg-gray-800 py-2 pl-7 pr-2 text-xs text-white placeholder-gray-400 transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-600 bg-gray-800 py-2 pl-7 pr-2 text-xs text-white placeholder-gray-400 transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                      required
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-xs text-white placeholder-gray-400 transition-all duration-200 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                />

                <Button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-green-500 py-2 text-xs text-white transition-all duration-200 hover:bg-green-600 active:scale-95"
                  disabled={isSubmitting}
                >
                  <Send className="h-3 w-3" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        );

      case "social":
        return (
          <div className="flex w-full flex-col p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={goBack}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  Connect
                </div>
              </div>
              <Button
                onClick={closeIsland}
                size="sm"
                variant="ghost"
                className="h-6 w-6 rounded p-0 text-gray-400 transition-all duration-200 hover:bg-gray-800/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button
                onClick={() =>
                  window.open("https://github.com/Nexora-DevLabs", "_blank")
                }
                className="flex items-center justify-center gap-1 bg-gray-800 py-2 text-xs text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
              >
                <Github className="h-3 w-3" />
                GitHub
              </Button>

              <Button
                onClick={() =>
                  window.open("https://twitter.com/NexoraDevLabs", "_blank")
                }
                className="flex items-center justify-center gap-1 bg-blue-500 py-2 text-xs text-white transition-all duration-200 hover:bg-blue-600 active:scale-95"
              >
                <MessageCircle className="h-3 w-3" />
                Twitter
              </Button>

              <Button
                onClick={() =>
                  window.open(
                    "https://linkedin.com/company/nexora-devlabs",
                    "_blank",
                  )
                }
                className="flex items-center justify-center gap-1 bg-blue-600 py-2 text-sm text-white transition-all duration-200 hover:bg-blue-700 active:scale-95"
              >
                <ExternalLink className="h-3 w-3" />
                LinkedIn
              </Button>

              <Button
                onClick={() => navigateTo("contact")}
                className="flex items-center justify-center gap-1 bg-green-500 py-2 text-xs text-white transition-all duration-200 hover:bg-green-600 active:scale-95"
              >
                <Mail className="h-3 w-3" />
                Email
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <motion.div
        className="fixed left-0 right-0 top-6 z-50 mx-auto flex h-10 w-32 items-center justify-center rounded-full border border-gray-700 bg-black shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={handleIslandClick}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400" />
          <div className="h-2 w-2 rounded-full bg-cyan-400" />
        </div>
        <div className="ml-2 h-1 w-3 rounded-full bg-cyan-400" />
      </motion.div>
    );
  }

  const config = sizeConfigs[currentState];

  return (
    <motion.div
      className="group fixed left-0 right-0 top-6 z-50 mx-auto flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-700 bg-black shadow-2xl"
      style={{
        width: config.width,
        height: config.height,
        borderRadius: config.borderRadius,
      }}
      variants={islandVariants}
      animate={
        isBouncing && currentState === "closed" ? "bounceInvite" : "idle"
      }
      whileHover={{
        scale: currentState === "closed" ? 1.05 : 1,
        boxShadow:
          currentState === "closed"
            ? "0 0 30px rgba(34, 211, 238, 0.3)"
            : "0 0 30px rgba(0, 0, 0, 0.3)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={(e) => {
        console.log("Direct click on motion.div, current state:", currentState);
        e.stopPropagation();
        if (currentState === "closed") {
          console.log("Setting state to compact");
          setCurrentState("compact");
        }
      }}
      initial={{ scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94], // iOS-like easing
        width: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        borderRadius: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/5 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94], // iOS-like easing
            opacity: { duration: 0.2 },
            scale: { duration: 0.25 },
            y: { duration: 0.3 },
            filter: { duration: 0.2 },
          }}
          className="h-full w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
