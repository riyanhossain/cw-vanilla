import { ChatWidget } from "./ChatWidget";
import type { ChatWidgetConfig } from "./types";

// Export types and main class
export { ChatWidget };
export type { ChatWidgetConfig, ChatMessage, ChatWidgetAPI } from "./types";

// Global interface for browser environments
declare global {
  interface Window {
    ChatWidget: typeof ChatWidget & {
      init: (config?: ChatWidgetConfig) => ChatWidget;
    };
  }
}

// Auto-initialize if script is loaded with data attributes
async function autoInit() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return;

  // Make ChatWidget globally available with enhanced API
  window.ChatWidget = Object.assign(ChatWidget, {
    init: (config?: ChatWidgetConfig) => new ChatWidget(config)
  });

  // Look for auto-initialization via script tag data attributes
  // Search for various script patterns to handle different CDN URLs
  const scriptSelectors = [
    'script[src*="chat-widget"]',
    "script[data-chat-widget]",
    'script[src*="cw-vanilla.pages.dev"]',
  ];

  let script: HTMLScriptElement | null = null;
  for (const selector of scriptSelectors) {
    script = document.querySelector(selector) as HTMLScriptElement;
    if (script) break;
  }

  // Also try to find the current script by looking at all scripts
  if (!script) {
    const scripts = document.querySelectorAll("script[src]");
    script = Array.from(scripts).find(
      (s) =>
        s.getAttribute("src")?.includes("chat-widget") ||
        s.getAttribute("src")?.includes("cw-vanilla.pages.dev") ||
        s.hasAttribute("data-auto-load")
    ) as HTMLScriptElement;
  }

  if (script) {
    const autoLoad = script.getAttribute("data-auto-load");

    if (autoLoad === "true" || autoLoad === "") {
      // Wait for DOM to be ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => initializeWidget());
      } else {
        await initializeWidget();
      }
    }
  }

  async function initializeWidget() {
    if (!script) return;

    const config: ChatWidgetConfig = {
      apiEndpoint: script.getAttribute("data-api-endpoint") || undefined,
      title: script.getAttribute("data-title") || undefined,
      placeholder: script.getAttribute("data-placeholder") || undefined,
      primaryColor: script.getAttribute("data-primary-color") || undefined,
      position: (script.getAttribute("data-position") as any) || undefined,
      welcomeMessage: script.getAttribute("data-welcome-message") || undefined,
      height: script.getAttribute("data-height")
        ? parseInt(script.getAttribute("data-height")!)
        : undefined,
      width: script.getAttribute("data-width")
        ? parseInt(script.getAttribute("data-width")!)
        : undefined,
    };

    // Remove undefined values
    Object.keys(config).forEach((key) => {
      if (config[key as keyof ChatWidgetConfig] === undefined) {
        delete config[key as keyof ChatWidgetConfig];
      }
    });

    new ChatWidget(config);
  }
}

// Initialize when script loads
autoInit();

// For immediate use in script tags (non-module)
if (typeof window !== "undefined") {
  window.ChatWidget = Object.assign(ChatWidget, {
    init: (config?: ChatWidgetConfig) => new ChatWidget(config)
  });
}
