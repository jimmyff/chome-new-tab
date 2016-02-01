// Clear URL from storage
var clearUrl  = function () {
   chrome.storage.sync.remove('url', function(){
      window.dispatchEvent(
        new CustomEvent('url:loaded', { 'detail': false })
      );
   });
 }

// Update URL
var writeUrl = function (newUrl) {
  chrome.storage.sync.set({ "url" : newUrl }, function() {
      if (chrome.extension.lastError) {
         alert('Can not write URL: ' + chrome.extension.lastError.message);
      } else {
          window.dispatchEvent(
            new CustomEvent('url:loaded', { 'detail': newUrl })
          );
      }
  });
}

// Update UI
var updateUrlUi = function (storedUrl) {
  document.getElementById('inputUrl').value = storedUrl?
    storedUrl:"";
  document.getElementById("clearUrl").style.visibility = storedUrl?
    "visible":"hidden";
}

// Load URL
var getUrlFromStorage = function () {
  chrome.storage.sync.get("url", function(items) {
      if (!chrome.runtime.error) {
        if (items.url)
          window.dispatchEvent(
            new CustomEvent('url:loaded', { 'detail': items.url })
          );
        return items.url;
      }
  });
}

window.addEventListener('load', function(evt) {

    // load the URL from storage and update the UI...
    getUrlFromStorage();

    // listen for URL updates...
    window.addEventListener('url:loaded', function (e) {
      console.log('got url loaded... '+e.detail);
      console.log(e);
        updateUrlUi(e.detail);
    });

    // Handle save
    document.getElementById('buttonSave').addEventListener(
      'click',
      function (e) {
        writeUrl(document.getElementById('inputUrl').value);
      }
    );

    // Handle clear
    document.getElementById('buttonClear').addEventListener(
      'click',
      clearUrl
    );

});
