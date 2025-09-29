import { ChatWidget } from "./ChatWidget";
import type { ChatWidgetConfig } from "./types";

// Demo configuration for the widget
const demoConfig: ChatWidgetConfig = {
  title: "💬 Demo Chat",
  primaryColor: "#3b82f6",
  position: "bottom-right",
  welcomeMessage:
    "Hello! Welcome to our chat widget demo. Try sending me a message!",
  placeholder: "Type your message here...",
  width: 320,
  height: 450,
};

// Initialize the chat widget for demo
const chatWidget = new ChatWidget(demoConfig);

// Make it globally accessible for demo controls
declare global {
  interface Window {
    chatWidgetInstance: ChatWidget;
  }
}

window.chatWidgetInstance = chatWidget;

// Log initialization
console.log("🚀 Chat Widget Demo loaded!");
console.log("Available methods:", {
  open: "chatWidgetInstance.open()",
  close: "chatWidgetInstance.close()",
  clearHistory: "chatWidgetInstance.clearHistory()",
  destroy: "chatWidgetInstance.destroy()",
});
