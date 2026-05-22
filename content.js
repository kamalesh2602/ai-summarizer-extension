chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action === "getText") {

      const text = document.body.innerText;

      sendResponse({
        data: text
      });
    }
});