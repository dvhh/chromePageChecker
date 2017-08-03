(function(w){
	"use strict";
	chrome.runtime.onConnect.addListener(function(port) {
		var selector=null;
		var event = null;
		port.onMessage.addListener(function(message){ selector=message.selector; event=message.event;});
		port.onDisconnect.addListener(function() {
			setTimeout(w.injectCheck, 5000, port.sender.tab, selector, event, function(){});
		});
	});
}(this));
