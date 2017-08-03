(function(w){
	"use strict";

	// inject into current page
	$("form").submit( function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var tab = tabs[0];
			var selector = $("input#selector").val();
			var event = $("input#ifft_event").val();
			w.injectCheck( tab, selector, event, function(){ window.close(); } );
		});
		return false;
	});
	$.getJSON( "settings.json", function(settings) {
		if(settings.ifft_hook != null ) {
			$("#IFFT_Field").show();
		}
	});
	// selector suggestions
	$.getJSON( "suggestions.json", function(suggestions) {
		chrome.tabs.query( {currentWindow: true, active: true}, function(tabs){
			suggestions.forEach(function(entry){
				var r=new RegExp(entry.regex);
				if(r.test(tabs[0].url)) {
					$("input#selector").val(entry.suggestion);
					$("label#SelectorLabel").append(" <small>suggested for " + entry.name + "</small>");
					$("input#ifft_event").val(entry.event);
				}
			});
		});
	});
}(this));
