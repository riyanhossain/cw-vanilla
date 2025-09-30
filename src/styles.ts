// CSS styles as a JavaScript string for inline injection
export const WIDGET_CSS = `/* Chat Widget Styles */
.chat-widget {
  position: fixed;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 14px;
  line-height: 1.4;
}

.chat-widget.bottom-right {
  bottom: 20px;
  right: 20px;
}

.chat-widget.bottom-left {
  bottom: 20px;
  left: 20px;
}

/* Toggle Button */
.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color, #3b82f6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  color: white;
}

.chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.chat-toggle svg {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.chat-toggle .hidden {
  display: none;
}

/* Chat Panel */
.chat-panel {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: var(--widget-width);
  height: var(--widget-height);
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0) translateY(20px);
  transform-origin: bottom right;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.chat-widget.bottom-left .chat-panel {
  right: auto;
  left: 0;
  transform-origin: bottom left;
}

.chat-panel.open {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* Header */
.chat-header {
  background: var(--primary-color, #3b82f6);
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chat-minimize {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.chat-minimize:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-minimize svg {
  width: 20px;
  height: 20px;
}

/* Messages Container */
.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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

/* Messages */
.chat-message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  animation: slideIn 0.3s ease;
}

.chat-message.user {
  align-self: flex-end;
  align-items: flex-end;
}

.chat-message.bot {
  align-self: flex-start;
  align-items: flex-start;
}

.message-content {
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
  position: relative;
}

.chat-message.user .message-content {
  background: var(--primary-color, #3b82f6);
  color: white;
  border-bottom-right-radius: 6px;
}

.chat-message.bot .message-content {
  background: #f1f3f5;
  color: #333;
  border-bottom-left-radius: 6px;
}

.message-time {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
  opacity: 0.7;
}

/* Typing Indicator */
.typing-indicator .message-content {
  padding: 14px;
}

.typing-dots {
  display: flex;
  gap: 3px;
  align-items: center;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

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

/* Input Area */
.chat-input-area {
  padding: 16px;
  border-top: 1px solid #e1e5e9;
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  border: 1px solid #e1e5e9;
  border-radius: 20px;
  padding: 10px 16px;
  outline: none;
  transition: border-color 0.2s ease;
  resize: none;
}

.chat-input:focus {
  border-color: var(--primary-color, #3b82f6);
}

.chat-send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color, #3b82f6);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chat-send-btn:hover {
  background: color-mix(in srgb, var(--primary-color, #3b82f6) 85%, black);
  transform: scale(1.05);
}

.chat-send-btn svg {
  width: 16px;
  height: 16px;
}

/* Animations */
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

/* Mobile Responsiveness */
@media (max-width: 480px) {
  .chat-widget {
    bottom: 10px;
    right: 10px;
    left: 10px;
    position: fixed;
  }
  
  .chat-widget.bottom-left {
    left: 10px;
  }
  
  .chat-panel {
    width: calc(100vw - 20px);
    height: 70vh;
    right: 0;
    left: 0;
    bottom: 80px;
    max-width: none;
    transform-origin: bottom center;
  }
  
  .chat-widget.bottom-left .chat-panel {
    left: 0;
    transform-origin: bottom center;
  }
  
  .chat-toggle {
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .chat-panel {
    border: 2px solid #000;
  }
  
  .chat-input {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .chat-panel,
  .chat-toggle,
  .chat-message,
  .typing-dots span {
    animation: none;
    transition: none;
  }
  
  .chat-toggle:hover {
    transform: none;
  }
}
`;
