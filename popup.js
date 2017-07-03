(function(){
	"use strict";

	// inject into current page
	$("form").submit(function(){
		// putting jquery
		chrome.tabs.executeScript({"file":"jquery-3.2.1.min.js","allFrames":false},function(){
			// then check scritp
			chrome.tabs.executeScript({"file":"boot.js","allFrames":false},function(){
				var selector=$("input").val();
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					// ask script to check the selector
					chrome.tabs.sendMessage(tabs[0].id,selector);
					window.close();
				});
			});
		});
		
		return false;
	});

	// selector suggestions
	$.getJSON("suggestions.json",function(suggestions) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			suggestions.forEach(function(entry){
				var r=new RegExp(entry.regex);
				if(r.test(tabs[0].url)) {
					$("input").val(entry.suggestion);
					$("label").append(" <small>suggested for "+entry.name+"</small>");
				}
			});
		});
	})
}());
