document
  .getElementById("getTitleBtn")
  .addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    chrome.tabs.sendMessage(
      tab.id,
      { action: "getText" },

      (response) => {

        const text = response.data;

        document.getElementById("output")
          .innerText = text.slice(0, 1000);
      }
    );
});