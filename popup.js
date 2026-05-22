const API_KEY = "YOUR_OPENROUTER_API_KEY";

const loader = document.getElementById("loader");

const copyBtn = document.getElementById("copyBtn");

document
  .getElementById("summarizeBtn")
  .addEventListener("click", async () => {

    const output = document.getElementById("output");

    try {

      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      chrome.tabs.sendMessage(
        tab.id,
        { action: "getText" },

        async (response) => {

          console.log("RESPONSE:", response);

          if (!response || !response.data) {

            output.value = "No webpage text found.";

            return;
          }

          const pageText = response.data.slice(0, 3000);

          output.value = "";

          loader.classList.remove("hidden");

          try {

            const result = await fetch(
              "https://openrouter.ai/api/v1/chat/completions",
              {
                method: "POST",

                headers: {
                  "Authorization": `Bearer ${API_KEY}`,
                  "Content-Type": "application/json",
                  "HTTP-Referer": "https://localhost",
                  "X-Title": "AI Summarizer Extension"
                },

                body: JSON.stringify({

                  model: "baidu/cobuddy:free",

                  messages: [
                    {
                      role: "user",

                      content: `
You are an expert webpage summarizer.

Analyze the following webpage content and provide:

1. A short overall summary
2. 5 important bullet points
3. Key names, dates, or events if present
4. Use beginner-friendly language
5. Keep response concise and clean

Webpage Content:
${pageText}
`
                    }
                  ]

                })
              }
            );

            const data = await result.json();

            console.log("OPENROUTER RESPONSE:", data);

            if (data.error) {

              loader.classList.add("hidden");

              output.value = data.error.message;

              return;
            }

            const summary =
              data.choices[0].message.content;

            loader.classList.add("hidden");

            output.value = summary;

          } catch (err) {

            console.error("AI ERROR:", err);

            loader.classList.add("hidden");

            output.value = err.message;
          }
        }
      );

    } catch (err) {

      console.error("OUTER ERROR:", err);

      loader.classList.add("hidden");

      output.value = err.message;
    }
});

copyBtn.addEventListener("click", async () => {

  const text = document.getElementById("output").value;

  if (!text) return;

  await navigator.clipboard.writeText(text);

  copyBtn.innerText = "Copied!";

  setTimeout(() => {

    copyBtn.innerText = "Copy Summary";

  }, 2000);
});