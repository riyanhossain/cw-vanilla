import type { ChatMessage, ChatWidgetConfig, ChatWidgetAPI } from './types';

export class ChatWidget {
  private config: Required<ChatWidgetConfig>;
  private container: HTMLElement;
  private widget: HTMLElement | null = null;
  private messagesContainer: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;
  private messages: ChatMessage[] = [];
  private isOpen = false;
  private api: ChatWidgetAPI | null = null;
  private static stylesInjected = false;

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
    
    const styles = `
/* Tailwind CSS utilities */
.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.z-\\[9999\\] { z-index: 9999; }
.bottom-5 { bottom: 1.25rem; }
.bottom-20 { bottom: 5rem; }
.right-0 { right: 0; }
.right-5 { right: 1.25rem; }
.left-0 { left: 0; }
.left-5 { left: 1.25rem; }
.w-15 { width: 3.75rem; }
.h-15 { height: 3.75rem; }
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.w-9 { width: 2.25rem; }
.h-9 { height: 2.25rem; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-1\\.5 { width: 0.375rem; }
.h-1\\.5 { height: 0.375rem; }
.max-w-\\[80\\%\\] { max-width: 80%; }
.flex { display: flex; }
.hidden { display: none; }
.flex-1 { flex: 1 1 0%; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-start { align-items: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.self-end { align-self: flex-end; }
.self-start { align-self: flex-start; }
.overflow-hidden { overflow: hidden; }
.overflow-y-auto { overflow-y: auto; }
.rounded-full { border-radius: 9999px; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded { border-radius: 0.25rem; }
.rounded-br-md { border-bottom-right-radius: 0.375rem; }
.rounded-bl-md { border-bottom-left-radius: 0.375rem; }
.border { border-width: 1px; }
.border-none { border: none; }
.border-t { border-top-width: 1px; }
.border-gray-200 { border-color: rgb(229 231 235); }
.border-gray-300 { border-color: rgb(209 213 219); }
.bg-white { background-color: rgb(255 255 255); }
.bg-transparent { background-color: transparent; }
.bg-gray-100 { background-color: rgb(243 244 246); }
.bg-gray-400 { background-color: rgb(156 163 175); }
.bg-opacity-10 { background-color: rgb(255 255 255 / 0.1); }
.p-1 { padding: 0.25rem; }
.p-4 { padding: 1rem; }
.px-3\\.5 { padding-left: 0.875rem; padding-right: 0.875rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
.py-3\\.5 { padding-top: 0.875rem; padding-bottom: 0.875rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.m-0 { margin: 0; }
.mt-1 { margin-top: 0.25rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
.font-semibold { font-weight: 600; }
.leading-relaxed { line-height: 1.625; }
.text-white { color: rgb(255 255 255); }
.text-gray-800 { color: rgb(31 41 55); }
.text-gray-500 { color: rgb(107 114 128); }
.opacity-70 { opacity: 0.7; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.scale-0 { transform: scale(0); }
.scale-100 { transform: scale(1); }
.translate-y-0 { transform: translateY(0px); }
.translate-y-5 { transform: translateY(1.25rem); }
.transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.cursor-pointer { cursor: pointer; }
.break-words { overflow-wrap: break-word; }
.outline-none { outline: 2px solid transparent; outline-offset: 2px; }
.hover\\:scale-105:hover { transform: scale(1.05); }
.hover\\:bg-white:hover { background-color: rgb(255 255 255); }
.hover\\:bg-opacity-10:hover { background-color: rgb(255 255 255 / 0.1); }
.focus\\:border-current:focus { border-color: currentColor; }

/* Custom animations */
@keyframes typing {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typing-dots span {
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

.slide-in {
  animation: slideIn 0.3s ease;
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .chat-widget-mobile .absolute {
    width: calc(100vw - 2.5rem) !important;
    height: 70vh !important;
    right: 0 !important;
    left: 0 !important;
    margin: 0 1.25rem !important;
  }
}
`;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    ChatWidget.stylesInjected = true;
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
    this.widget = document.createElement('div');
    this.widget.className = `fixed z-[9999] font-sans text-sm leading-relaxed ${
      this.config.position === 'bottom-right' ? 'bottom-5 right-5' : 'bottom-5 left-5'
    }`;
    this.widget.style.cssText = `
      --primary-color: ${this.config.primaryColor};
      --widget-height: ${this.config.height}px;
      --widget-width: ${this.config.width}px;
    `;

    // Create chat toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'w-15 h-15 rounded-full border-none cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out text-white hover:scale-105 hover:shadow-xl';
    toggleButton.style.backgroundColor = this.config.primaryColor;
    toggleButton.innerHTML = `
      <svg class="chat-icon w-6 h-6 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="close-icon w-6 h-6 transition-all duration-300 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    toggleButton.addEventListener('click', () => this.toggle());

    // Create chat panel
    const chatPanel = document.createElement("div");
    chatPanel.className = `absolute bottom-20 ${
      this.config.position === 'bottom-right' ? 'right-0' : 'left-0'
    } bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transform scale-0 translate-y-5 opacity-0 transition-all duration-300 cubic-bezier(0.68,-0.55,0.265,1.55)`;
    chatPanel.style.cssText = `
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      transform-origin: bottom ${this.config.position === 'bottom-right' ? 'right' : 'left'};
    `;

    // Chat header
    const header = document.createElement("div");
    header.className = "flex items-center justify-between px-5 py-4 text-white";
    header.style.backgroundColor = this.config.primaryColor;
    header.innerHTML = `
      <h3 class="m-0 text-base font-semibold">${this.config.title}</h3>
      <button class="bg-transparent border-none text-white cursor-pointer p-1 rounded flex items-center justify-center transition-colors duration-200 hover:bg-white hover:bg-opacity-10">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    `;

    const minimizeBtn = header.querySelector("button") as HTMLElement;
    minimizeBtn.addEventListener("click", () => this.toggle());

    // Messages container
    this.messagesContainer = document.createElement("div");
    this.messagesContainer.className = "flex-1 p-4 overflow-y-auto flex flex-col gap-3 chat-messages";

    // Input area
    const inputArea = document.createElement("div");
    inputArea.className = "p-4 border-t border-gray-200 flex gap-2 items-center";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.className = "flex-1 border border-gray-300 rounded-full px-4 py-2.5 outline-none transition-colors duration-200 focus:border-current";
    this.input.style.borderColor = this.config.primaryColor;
    this.input.placeholder = this.config.placeholder;
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    const sendButton = document.createElement("button");
    sendButton.className = "w-9 h-9 rounded-full border-none text-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-105";
    sendButton.style.backgroundColor = this.config.primaryColor;
    sendButton.innerHTML = `
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    const chatPanel = this.widget!.querySelector("div[class*='absolute']") as HTMLElement;

    if (this.isOpen) {
      chatIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
      chatPanel.classList.remove("scale-0", "translate-y-5", "opacity-0");
      chatPanel.classList.add("scale-100", "translate-y-0", "opacity-100");
      this.scrollToBottom();
      this.input?.focus();
    } else {
      chatIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      chatPanel.classList.add("scale-0", "translate-y-5", "opacity-0");
      chatPanel.classList.remove("scale-100", "translate-y-0", "opacity-100");
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
      messageEl.className = `flex flex-col max-w-[80%] slide-in ${
        message.sender === 'user' 
          ? 'self-end items-end' 
          : 'self-start items-start'
      }`;

      const time = message.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      const messageContent = document.createElement("div");
      if (message.sender === 'user') {
        messageContent.className = "px-3.5 py-2.5 rounded-2xl break-words text-white rounded-br-md";
        messageContent.style.backgroundColor = this.config.primaryColor;
      } else {
        messageContent.className = "px-3.5 py-2.5 rounded-2xl break-words bg-gray-100 text-gray-800 rounded-bl-md";
      }
      messageContent.textContent = message.text;
      
      const messageTime = document.createElement("div");
      messageTime.className = "text-xs text-gray-500 mt-1 opacity-70";
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
    typingEl.className = "flex flex-col max-w-[80%] self-start items-start typing-indicator";
    
    const messageContent = document.createElement("div");
    messageContent.className = "px-3.5 py-3.5 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-md";
    
    const typingDots = document.createElement("div");
    typingDots.className = "flex gap-1 items-center typing-dots";
    typingDots.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
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
