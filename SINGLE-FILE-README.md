# Chat Widget - Single JS File

A complete, embeddable chat widget bundled into a single JavaScript file with no external dependencies.

## 🎯 Features

- **Single File**: Everything bundled into one JavaScript file (`chat-widget.umd.cjs`)
- **No CSS Dependencies**: CSS is automatically injected when the widget loads
- **Async Loading**: Full support for asynchronous loading
- **Auto-initialization**: Configure via script tag data attributes
- **Lightweight**: Only 15.55 kB (4.71 kB gzipped)
- **TypeScript**: Built with TypeScript for better reliability
- **Responsive**: Works on desktop and mobile devices

## 📦 Quick Start

### Method 1: Basic Usage

```html
<!-- Single script tag -->
<script src="https://cw-vanilla.pages.dev/chat-widget.umd.cjs"></script>

<script>
  // Initialize the widget
  window.ChatWidget.init({
    primaryColor: "#3b82f6",
    title: "Support Chat",
    placeholder: "Type your message...",
    position: "bottom-right",
    width: 350,
    height: 500,
    welcomeMessage: "Hello! How can I help you today? 👋",
  });
</script>
```

### Method 2: Auto-initialization

```html
<!-- Configure via data attributes -->
<script
  src="https://cw-vanilla.pages.dev/chat-widget.umd.cjs"
  data-auto-load="true"
  data-primary-color="#6366f1"
  data-title="Support Chat"
  data-placeholder="Ask us anything..."
  data-position="bottom-right"
  data-width="350"
  data-height="500"
  data-welcome-message="Welcome! How can we help you?"
></script>
```

### Method 3: Async Loading

```html
<script>
  // Load widget asynchronously
  (function () {
    const script = document.createElement("script");
    script.src = "https://cw-vanilla.pages.dev/chat-widget.umd.cjs";
    script.async = true;
    script.onload = function () {
      window.ChatWidget.init({
        primaryColor: "#10b981",
        title: "Async Chat",
        position: "bottom-left",
      });
    };
    document.head.appendChild(script);
  })();
</script>
```

## ⚙️ Configuration Options

```javascript
window.ChatWidget.init({
  apiEndpoint: "https://your-api.com/chat", // Optional API endpoint
  title: "Support Chat", // Widget title
  placeholder: "Type your message...", // Input placeholder
  primaryColor: "#3b82f6", // Theme color
  position: "bottom-right", // 'bottom-right' | 'bottom-left'
  width: 350, // Widget width in pixels
  height: 500, // Widget height in pixels
  welcomeMessage: "Hello! How can I help?", // Optional welcome message
  containerElement: document.body, // Container element (optional)
});
```

## 🔧 Data Attributes

For auto-initialization, you can use these data attributes:

- `data-auto-load="true"` - Enable auto-initialization
- `data-api-endpoint` - API endpoint URL
- `data-title` - Widget title
- `data-placeholder` - Input placeholder text
- `data-primary-color` - Theme color (hex code)
- `data-position` - Widget position ('bottom-right' or 'bottom-left')
- `data-width` - Widget width in pixels
- `data-height` - Widget height in pixels
- `data-welcome-message` - Welcome message

## 📊 Bundle Details

- **Total Size**: 15.55 kB (4.71 kB gzipped)
- **Includes**:
  - Complete TypeScript chat functionality
  - All CSS styles (4.39 kB)
  - Smooth animations and transitions
  - Responsive design
  - Local storage for message persistence
  - Mock API responses
  - Auto-initialization logic

## 🚀 Deployment

The widget is deployed to Cloudflare Pages at:

```
https://cw-vanilla.pages.dev/chat-widget.umd.cjs
```

## 🧪 Local Testing

1. Clone the repository
2. Run `npm install`
3. Run `npm run build` to build the single JS file
4. Run `npm run dev` to start the development server
5. Open `http://localhost:5174/single-js-example.html` to test

## 💡 Benefits of Single File Approach

1. **Easier Integration**: Only one file to include
2. **Better Performance**: No separate CSS requests
3. **Reduced Complexity**: No dependency management
4. **Async Friendly**: Loads everything in one request
5. **CDN Optimized**: Single file is easier to cache and distribute

## 🌟 Advanced Usage

### Multiple Widgets

```javascript
// Create multiple chat widgets with different configurations
window.ChatWidget.init({
  primaryColor: "#e74c3c",
  title: "Sales",
  position: "bottom-right",
});

window.ChatWidget.init({
  primaryColor: "#2ecc71",
  title: "Support",
  position: "bottom-left",
});
```

### Programmatic Control

```javascript
// Initialize and store reference
const widget = window.ChatWidget.init({
  title: "Customer Service",
});

// The widget handles its own state
// No additional methods needed - click to open/close
```

This single-file approach makes the chat widget incredibly easy to integrate into any website with minimal overhead and maximum performance.
