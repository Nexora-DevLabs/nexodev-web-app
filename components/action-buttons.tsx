"use client";

import {
  Github,
  Calendar,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      {/* GitHub Button */}
      <button
        onClick={() =>
          window.open("https://github.com/Nexora-DevLabs", "_blank")
        }
        className="group relative rounded-full border border-gray-600/30 bg-gray-800/20 p-3 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-gray-500/50 hover:bg-gray-800/40 hover:text-white"
        title="View GitHub Stats"
      >
        <Github className="h-5 w-5" />
        <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
      </button>

      {/* Calendar Button */}
      <button
        onClick={() =>
          window.open("https://cal.com/nexora-devlabs/15min", "_blank")
        }
        className="group relative rounded-full border border-blue-500/30 bg-blue-500/20 p-3 text-blue-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-blue-400/50 hover:bg-blue-500/40 hover:text-white"
        title="Book a Meeting"
      >
        <Calendar className="h-5 w-5" />
        <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-blue-400"></div>
      </button>

      {/* Contact Button */}
      <button
        onClick={() => window.open("mailto:hello@nexora-devlabs.com", "_blank")}
        className="group relative rounded-full border border-green-500/30 bg-green-500/20 p-3 text-green-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-green-400/50 hover:bg-green-500/40 hover:text-white"
        title="Send Message"
      >
        <Mail className="h-5 w-5" />
        <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
      </button>

      {/* Social/Connect Button */}
      <button
        onClick={() =>
          window.open("https://twitter.com/NexoraDevLabs", "_blank")
        }
        className="group relative rounded-full border border-purple-500/30 bg-purple-500/20 p-3 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-purple-400/50 hover:bg-purple-500/40 hover:text-white"
        title="Connect with Us"
      >
        <MessageCircle className="h-5 w-5" />
        <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-purple-400"></div>
      </button>

      {/* External Link Button */}
      <button
        onClick={() => window.open("https://nexora-devlabs.com", "_blank")}
        className="group relative rounded-full border border-orange-500/30 bg-orange-500/20 p-3 text-orange-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-orange-400/50 hover:bg-orange-500/40 hover:text-white"
        title="Visit Website"
      >
        <ExternalLink className="h-5 w-5" />
        <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-orange-400"></div>
      </button>
    </div>
  );
}

// Compact version for smaller screens
export function CompactActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() =>
          window.open("https://github.com/Nexora-DevLabs", "_blank")
        }
        className="rounded-full border border-gray-600/30 bg-gray-800/20 p-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-gray-800/40 hover:text-white"
        title="GitHub"
      >
        <Github className="h-4 w-4" />
      </button>

      <button
        onClick={() =>
          window.open("https://cal.com/nexora-devlabs/15min", "_blank")
        }
        className="rounded-full border border-blue-500/30 bg-blue-500/20 p-2 text-blue-300 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/40 hover:text-white"
        title="Book Meeting"
      >
        <Calendar className="h-4 w-4" />
      </button>

      <button
        onClick={() => window.open("mailto:hello@nexora-devlabs.com", "_blank")}
        className="rounded-full border border-green-500/30 bg-green-500/20 p-2 text-green-300 backdrop-blur-sm transition-all duration-200 hover:bg-green-500/40 hover:text-white"
        title="Contact"
      >
        <Mail className="h-4 w-4" />
      </button>

      <button
        onClick={() =>
          window.open("https://twitter.com/NexoraDevLabs", "_blank")
        }
        className="rounded-full border border-purple-500/30 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/40 hover:text-white"
        title="Connect"
      >
        <MessageCircle className="h-4 w-4" />
      </button>
    </div>
  );
}
