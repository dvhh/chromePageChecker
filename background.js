(function(w){
	"use strict";
	chrome.runtime.onConnect.addListener(function(port) {
		var selector=null;
		port.onMessage.addListener(function(message){ selector=message; });
		port.onDisconnect.addListener(function() {
			console.log(selector);
			console.log(port);
			setTimeout(w.injectCheck,5000,port.sender.tab,selector,function(){});
		});
	});
}(this));
