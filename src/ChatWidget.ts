import type { ChatMessage, ChatWidgetConfig, ChatWidgetAPI } from "./types";
import { WIDGET_CSS } from "./styles";

export class ChatWidget {
  private static stylesInjected = false;
  private config: Required<ChatWidgetConfig>;
  private container: HTMLElement;
  private widget: HTMLElement | null = null;
  private messagesContainer: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;
  private messages: ChatMessage[] = [];
  private isOpen = false;
  private api: ChatWidgetAPI | null = null;

  constructor(config: ChatWidgetConfig = {}) {
    this.config = {
      apiEndpoint: config.apiEndpoint || "",
      title: config.title || "Chat Support",
      placeholder: config.placeholder || "Type your message...",
      primaryColor: config.primaryColor || "#3b82f6",
      position: config.position || "bottom-right",
      welcomeMessage:
        config.welcomeMessage || "Hello! How can I help you today?",
      height: config.height || 400,
      width: config.width || 300,
      containerElement: config.containerElement || document.body,
    };

    this.container = this.config.containerElement;
    this.injectStyles();
    this.initializeAPI();
    this.loadMessages();
    this.render();

    if (this.config.welcomeMessage) {
      this.addMessage({
        id: this.generateId(),
        text: this.config.welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      });
    }
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private injectStyles(): void {
    if (ChatWidget.stylesInjected) return;

    const styleElement = document.createElement("style");
    styleElement.id = "chat-widget-styles";
    styleElement.textContent = WIDGET_CSS;
    document.head.appendChild(styleElement);
    ChatWidget.stylesInjected = true;
  }

  // Static method for easy initialization
  static init(config?: ChatWidgetConfig): ChatWidget {
    return new ChatWidget(config);
  }

  private initializeAPI(): void {
    if (this.config.apiEndpoint) {
      this.api = {
        send: async (message: string): Promise<string> => {
          try {
            const response = await fetch(this.config.apiEndpoint!, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message }),
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data.response || "Sorry, I didn't understand that.";
          } catch (error) {
            console.error("Chat API error:", error);
            return "Sorry, I'm having trouble connecting right now. Please try again later.";
          }
        },
      };
    }
  }

  private render(): void {
    // Create chat widget container
    this.widget = document.createElement("div");
    this.widget.className = `chat-widget ${
      this.config.position === "bottom-right" ? "bottom-right" : "bottom-left"
    }`;
    this.widget.style.cssText = `
      --primary-color: ${this.config.primaryColor};
      --widget-height: ${this.config.height}px;
      --widget-width: ${this.config.width}px;
    `;

    // Create chat toggle button
    const toggleButton = document.createElement("button");
    toggleButton.className = "chat-toggle";
    toggleButton.innerHTML = `
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    toggleButton.addEventListener("click", () => this.toggle());

    // Create chat panel
    const chatPanel = document.createElement("div");
    chatPanel.className = `chat-panel ${
      this.config.position === "bottom-right" ? "right" : "left"
    }`;
    chatPanel.style.cssText = `
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      transform-origin: bottom ${
        this.config.position === "bottom-right" ? "right" : "left"
      };
    `;

    // Chat header
    const header = document.createElement("div");
    header.className = "chat-header";
    header.innerHTML = `
      <h3 class="chat-title">${this.config.title}</h3>
      <button class="chat-minimize">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    `;

    const minimizeBtn = header.querySelector("button") as HTMLElement;
    minimizeBtn.addEventListener("click", () => this.toggle());

    // Messages container
    this.messagesContainer = document.createElement("div");
    this.messagesContainer.className = "chat-messages";

    // Input area
    const inputArea = document.createElement("div");
    inputArea.className = "chat-input-area";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.className = "chat-input";
    this.input.placeholder = this.config.placeholder;
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    const sendButton = document.createElement("button");
    sendButton.className = "chat-send-btn";
    sendButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
      </svg>
    `;
    sendButton.addEventListener("click", () => this.sendMessage());

    inputArea.appendChild(this.input);
    inputArea.appendChild(sendButton);

    chatPanel.appendChild(header);
    chatPanel.appendChild(this.messagesContainer);
    chatPanel.appendChild(inputArea);

    this.widget.appendChild(toggleButton);
    this.widget.appendChild(chatPanel);

    this.container.appendChild(this.widget);
    this.renderMessages();
  }

  private toggle(): void {
    this.isOpen = !this.isOpen;
    const chatIcon = this.widget!.querySelector(".chat-icon") as HTMLElement;
    const closeIcon = this.widget!.querySelector(".close-icon") as HTMLElement;
    const chatPanel = this.widget!.querySelector(".chat-panel") as HTMLElement;

    if (this.isOpen) {
      chatIcon.style.display = "none";
      closeIcon.style.display = "block";
      chatPanel.classList.add("open");
      this.scrollToBottom();
      this.input?.focus();
    } else {
      chatIcon.style.display = "block";
      closeIcon.style.display = "none";
      chatPanel.classList.remove("open");
    }
  }

  private addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.saveMessages();
    this.renderMessages();
    this.scrollToBottom();
  }

  private renderMessages(): void {
    if (!this.messagesContainer) return;

    this.messagesContainer.innerHTML = "";
    this.messages.forEach((message) => {
      const messageEl = document.createElement("div");
      messageEl.className = `chat-message ${message.sender}`;

      const time = message.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageContent = document.createElement("div");
      messageContent.className = "message-content";
      messageContent.textContent = message.text;

      const messageTime = document.createElement("div");
      messageTime.className = "message-time";
      messageTime.textContent = time;

      messageEl.appendChild(messageContent);
      messageEl.appendChild(messageTime);
      this.messagesContainer!.appendChild(messageEl);
    });
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      setTimeout(() => {
        this.messagesContainer!.scrollTop =
          this.messagesContainer!.scrollHeight;
      }, 10);
    }
  }

  private async sendMessage(): Promise<void> {
    if (!this.input || !this.input.value.trim()) return;

    const messageText = this.input.value.trim();
    this.input.value = "";

    // Add user message
    this.addMessage({
      id: this.generateId(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    });

    // Show typing indicator
    this.showTypingIndicator();

    try {
      let response: string;

      if (this.api) {
        response = await this.api.send(messageText);
      } else {
        // Mock response for demo
        response = this.generateMockResponse(messageText);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Hide typing indicator and add bot response
      this.hideTypingIndicator();
      this.addMessage({
        id: this.generateId(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      });
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage({
        id: this.generateId(),
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      });
    }
  }

  private generateMockResponse(message: string): string {
    const responses = [
      "Thanks for your message! I'm a demo chatbot.",
      "That's interesting! Can you tell me more?",
      "I understand. How else can I help you?",
      "Great question! Let me think about that.",
      "I'm here to help with any questions you have.",
    ];

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to our chat support. How can I assist you today?";
    }
    if (lowerMessage.includes("help")) {
      return "I'm here to help! What do you need assistance with?";
    }
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Goodbye! Feel free to come back if you have any more questions.";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private showTypingIndicator(): void {
    if (!this.messagesContainer) return;

    const typingEl = document.createElement("div");
    typingEl.className = "chat-message bot typing-indicator";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const typingDots = document.createElement("div");
    typingDots.className = "typing-dots";
    typingDots.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    messageContent.appendChild(typingDots);
    typingEl.appendChild(messageContent);
    this.messagesContainer.appendChild(typingEl);
    this.scrollToBottom();
  }

  private hideTypingIndicator(): void {
    if (!this.messagesContainer) return;

    const typingIndicator =
      this.messagesContainer.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  private saveMessages(): void {
    try {
      localStorage.setItem(
        "chat-widget-messages",
        JSON.stringify(this.messages)
      );
    } catch (error) {
      console.warn("Could not save messages to localStorage:", error);
    }
  }

  private loadMessages(): void {
    try {
      const saved = localStorage.getItem("chat-widget-messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        this.messages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.warn("Could not load messages from localStorage:", error);
      this.messages = [];
    }
  }

  public clearHistory(): void {
    this.messages = [];
    this.saveMessages();
    this.renderMessages();
  }

  public open(): void {
    if (!this.isOpen) {
      this.toggle();
    }
  }

  public close(): void {
    if (this.isOpen) {
      this.toggle();
    }
  }

  public destroy(): void {
    if (this.widget && this.widget.parentNode) {
      this.widget.parentNode.removeChild(this.widget);
    }
    this.widget = null;
    this.messagesContainer = null;
    this.input = null;
  }
}
