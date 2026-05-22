
# AI Summarizer Extension

Built an AI-powered browser extension using Manifest V3 that extracts webpage content and generates concise summaries using OpenRouter LLM APIs. Implemented content scripts, message passing, loading states, dark-mode UI, and copy-to-clipboard functionality.

---

## OpenRouter LLM

Current model used:

```text
baidu/cobuddy:free
```

You can change the model inside:

```text
popup.js
```

Replace:

```javascript
model: "baidu/cobuddy:free"
```

with any other OpenRouter model.

Example:

```javascript
model: "google/gemma-3-12b-it:free"
```

---

## Add Your API Key

Open:

```text
popup.js
```

Replace:

```javascript
const API_KEY = "YOUR_OPENROUTER_API_KEY";
```

with:

```javascript
const API_KEY = "your_actual_api_key";
```

Get your API key from:

[https://openrouter.ai/](https://openrouter.ai/)

---

## How To Run

1. Open browser extensions page

Chrome:

```text
chrome://extensions/
```

Brave:

```text
brave://extensions/
```

2. Enable:

```text
Developer Mode
```

3. Click:

```text
Load unpacked
```

4. Select project folder

5. Open any webpage

6. Click extension icon

7. Click:

```text
Summarize Page
```

The AI-generated summary will appear inside the extension popup.
