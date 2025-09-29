# 💬 Embeddable Chat Widget

A lightweight, customizable chat widget that can be embedded into any website with a single script tag. Built with TypeScript, designed for Cloudflare hosting.

![Chat Widget Demo](https://img.shields.io/badge/demo-live-brightgreen) ![TypeScript](https://img.shields.io/badge/typescript-4.9+-blue) ![Bundle Size](https://img.shields.io/badge/bundle-~15kb-success)

## 🚀 Quick Start

### Simple Integration

Add this single line to your HTML:

```html
<script
  src="https://your-domain.pages.dev/chat-widget.umd.js"
  data-auto-load="true"
></script>
```

### Custom Configuration

```html
<script
  src="https://your-domain.pages.dev/chat-widget.umd.js"
  data-auto-load="true"
  data-title="Customer Support"
  data-primary-color="#10b981"
  data-position="bottom-left"
  data-api-endpoint="https://api.example.com/chat"
  data-welcome-message="Hi! How can I help you today?"
  data-placeholder="Ask me anything..."
  data-width="350"
  data-height="500"
></script>
```

## ✨ Features

- **🎨 Fully Customizable** - Colors, positioning, messaging, and dimensions
- **📱 Mobile Responsive** - Optimized for all screen sizes
- **💾 Persistent History** - Chat history saved in localStorage
- **⚡ Lightweight** - ~15KB minified bundle
- **🔌 Easy Integration** - Single script tag deployment
- **🌐 API Ready** - Built-in HTTP API integration
- **♿ Accessible** - Keyboard navigation and screen reader support
- **🎯 Framework Agnostic** - Works with any website or framework

## 📖 Configuration Options

### Data Attributes

| Attribute              | Type    | Default                            | Description                               |
| ---------------------- | ------- | ---------------------------------- | ----------------------------------------- |
| `data-auto-load`       | boolean | false                              | Auto-initialize the widget                |
| `data-title`           | string  | "Chat Support"                     | Widget header title                       |
| `data-primary-color`   | string  | "#3b82f6"                          | Primary theme color                       |
| `data-position`        | string  | "bottom-right"                     | Position: "bottom-right" or "bottom-left" |
| `data-api-endpoint`    | string  | -                                  | API endpoint for chat responses           |
| `data-welcome-message` | string  | "Hello! How can I help you today?" | Initial bot message                       |
| `data-placeholder`     | string  | "Type your message..."             | Input placeholder text                    |
| `data-width`           | number  | 300                                | Widget width in pixels                    |
| `data-height`          | number  | 400                                | Widget height in pixels                   |

### JavaScript API

```javascript
// Manual initialization
const widget = new ChatWidget({
  title: "Support Chat",
  primaryColor: "#3b82f6",
  apiEndpoint: "https://api.example.com/chat",
  position: "bottom-right",
  welcomeMessage: "Hello! How can I help?",
  placeholder: "Type here...",
  width: 350,
  height: 500,
});

// Control methods
widget.open(); // Open the chat widget
widget.close(); // Close the chat widget
widget.clearHistory(); // Clear chat history
widget.destroy(); // Remove widget from DOM
```

## 🔧 API Integration

### Request Format

Your API endpoint should accept POST requests with this format:

```json
{
  "message": "User's message text"
}
```

### Response Format

Your API should respond with:

```json
{
  "response": "Bot's response text"
}
```

### Example API Implementation

```javascript
// Express.js example
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Process message and generate response
  const response = generateChatResponse(message);

  res.json({ response });
});
```

## 🏗️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd chatbot-widget-vanilla

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── ChatWidget.ts     # Main widget class
├── types.ts          # TypeScript interfaces
├── widget.css        # Widget styles
├── widget.ts         # Entry point for embedding
└── main.ts           # Demo page initialization

dist/
└── chat-widget.umd.js # Built widget for embedding
```

## 🚀 Deployment to Cloudflare Pages

### Option 1: GitHub Integration

1. Push your code to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set build output directory: `dist`
5. Deploy!

### Option 2: Manual Upload

1. Run `npm run build`
2. Upload the `dist/` folder to Cloudflare Pages
3. Your widget will be available at: `https://your-domain.pages.dev/chat-widget.umd.js`

### Environment Variables

For API integration, you can use Cloudflare's environment variables:

```bash
# In Cloudflare Pages dashboard
CHAT_API_ENDPOINT=https://api.example.com/chat
OPENAI_API_KEY=your-key-here
```

## 🎨 Customization

### CSS Custom Properties

The widget exposes CSS custom properties for advanced styling:

```css
.chat-widget {
  --primary-color: #your-color;
  --widget-width: 350px;
  --widget-height: 500px;
}
```

### Theming

```javascript
const darkTheme = new ChatWidget({
  primaryColor: "#1f2937",
  // ... other options
});
```

## 🔧 Advanced Usage

### Multiple Widgets

```javascript
// Support chat
const supportChat = new ChatWidget({
  title: "Support",
  position: "bottom-right",
  apiEndpoint: "/api/support",
});

// Sales chat
const salesChat = new ChatWidget({
  title: "Sales",
  position: "bottom-left",
  apiEndpoint: "/api/sales",
  containerElement: document.getElementById("sales-container"),
});
```

### Custom Container

```javascript
const widget = new ChatWidget({
  containerElement: document.getElementById("custom-container"),
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📚 [Documentation](https://github.com/your-username/chat-widget/wiki)
- 🐛 [Report Issues](https://github.com/your-username/chat-widget/issues)
- 💬 [Discussions](https://github.com/your-username/chat-widget/discussions)

## 🗺️ Roadmap

- [ ] File upload support
- [ ] Emoji picker
- [ ] Multiple language support
- [ ] Voice messages
- [ ] Custom themes
- [ ] Analytics integration
- [ ] WebSocket support
- [ ] React/Vue components

---

Made with ❤️ using TypeScript and Vite
