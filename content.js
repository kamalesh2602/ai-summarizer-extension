console.log("CONTENT SCRIPT LOADED");

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    console.log("MESSAGE RECEIVED");

    if (request.action === "getText") {

      const text = document.body.innerText;

      sendResponse({
        data: text
      });
    }

    return true;
});