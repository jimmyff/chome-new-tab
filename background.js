// add listener
chrome.tabs.onCreated.addListener(function(tabObj) {

	var tabId = tabObj.id;
 	if (tabObj.url === 'chrome://newtab/') {

		// load URL
		chrome.storage.sync.get("url", function(items) {

			// update chrome tab URL if valid data
			if (!chrome.runtime.error && items.url)
				 chrome.tabs.getCurrent(function(tab) {
             chrome.tabs.update(
							 tabId,
							 { url:items.url }
						 );
          });
		});
	}

});
