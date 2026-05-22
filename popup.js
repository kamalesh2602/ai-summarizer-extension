const API_KEY = "api key";


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

          output.value = "Generating summary...";

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
                      content:
                        `Summarize this webpage in simple bullet points:\n\n${pageText}`
                    }
                  ]

                })
              }
            );

            const data = await result.json();

            console.log("OPENROUTER RESPONSE:", data);

            if (data.error) {
              output.value = data.error.message;
              return;
            }

            const summary =
              data.choices[0].message.content;

            output.value = summary;

          } catch (err) {

            console.error("AI ERROR:", err);

            output.value = err.message;
          }
        }
      );

    } catch (err) {

      console.error("OUTER ERROR:", err);

      output.value = err.message;
    }
});