document
  .getElementById("getTitleBtn")
  .addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    document.getElementById("output")
      .innerText = tab.title;
});