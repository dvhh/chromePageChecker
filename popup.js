(function(w){
	"use strict";

	// inject into current page
	$("form").submit( function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var tab = tabs[0];
			var selector = $("input").val();
			w.injectCheck( tab, selector, function(){ window.close(); } );
		});
		return false;
	});

	// selector suggestions
	$.getJSON( "suggestions.json", function(suggestions) {
		chrome.tabs.query( {currentWindow: true, active: true}, function(tabs){
			suggestions.forEach(function(entry){
				var r=new RegExp(entry.regex);
				if(r.test(tabs[0].url)) {
					$("input").val(entry.suggestion);
					$("label").append(" <small>suggested for " + entry.name + "</small>");
				}
			});
		});
	});
}(this));
