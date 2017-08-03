(function(w){
	"use strict";

	w.injectCheck = function( tab, selector, event, callback ) {
		// getting settings
		$.getJSON( "settings.json", function(settings) {
		// putting jquery
			chrome.tabs.executeScript(tab.id, {"file":"jquery-3.2.1.min.js","allFrames":false},function(){
				// then check script
				chrome.tabs.executeScript(tab.id, {"file":"boot.js","allFrames":false},function(){
					// ask script to check the selector
					chrome.tabs.sendMessage(tab.id, {"selector":selector,"settings":settings, "event":event});
					if(callback) {callback();}
				});
			});
		});
	};
}(this));