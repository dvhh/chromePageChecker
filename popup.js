(function(){
	"use strict";
	//$("button").click(function(){
	$("form").submit(function(){
		//alert($("input").val());
		//chrome.tabs.executeScript()
		chrome.tabs.executeScript({"file":"jquery-3.2.1.min.js","allFrames":false},function(){
			chrome.tabs.executeScript({"file":"boot.js","allFrames":false},function(){
				var selector=$("input").val();
				//chrome.tabs.sendMessage("test");
				//chrome.tabs.executeScript({"code":"window.checkPage(\""+window.btoa(selector)+"\")","allFrames":false})
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id,selector);
					window.close();
				});
			});
		});
		
		return false;
	});
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
