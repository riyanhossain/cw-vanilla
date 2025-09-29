export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatWidgetConfig {
  apiEndpoint?: string;
  title?: string;
  placeholder?: string;
  primaryColor?: string;
  position?: "bottom-right" | "bottom-left";
  welcomeMessage?: string;
  height?: number;
  width?: number;
  containerElement?: HTMLElement;
}

export interface ChatWidgetAPI {
  send(message: string): Promise<string>;
}
