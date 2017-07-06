(function(w){
	"use strict";

	w.injectCheck = function( tab, selector, callback ) {
		// putting jquery
		chrome.tabs.executeScript(tab.id, {"file":"jquery-3.2.1.min.js","allFrames":false},function(){
			// then check script
			chrome.tabs.executeScript(tab.id, {"file":"boot.js","allFrames":false},function(){
				// ask script to check the selector
				chrome.tabs.sendMessage(tab.id, {"selector":selector,"background":chrome.extension.getBackgroundPage().test});
				if(callback) {callback();}
			});
		});
	};
}(this));