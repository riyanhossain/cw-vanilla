import { ChatWidget } from "./ChatWidget";
import type { ChatWidgetConfig } from "./types";

// Export types and main class
export { ChatWidget };
export type { ChatWidgetConfig, ChatMessage, ChatWidgetAPI } from "./types";

// Global interface for browser environments
declare global {
  interface Window {
    ChatWidget: typeof ChatWidget;
  }
}

// Auto-initialize if script is loaded with data attributes
function autoInit() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return;

  // Make ChatWidget globally available
  window.ChatWidget = ChatWidget;

  // Look for auto-initialization via script tag data attributes
  const script = document.querySelector(
    'script[src*="chat-widget"]'
  ) as HTMLScriptElement;

  if (script) {
    const autoLoad = script.getAttribute("data-auto-load");

    if (autoLoad === "true" || autoLoad === "") {
      // Wait for DOM to be ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeWidget);
      } else {
        initializeWidget();
      }
    }
  }

  function initializeWidget() {
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
