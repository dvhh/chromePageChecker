(function(){
	"use strict";

	var defaultSettings = {
			"interval"  : 3000,
			"jitter"    : 4000,
			"ifft_hook" : ""
	};

	var commitOptions = function() {
		var intervalValue = $("input#intervalTimeoutValue").val();
		var JitterValue = $("input#intervalJitterValue").val();
		var IFFT_url = $("input#ifft_url").val();
		var settings = {
			"interval"  : intervalValue,
			"jitter"    : JitterValue,
			"ifft_hook" : IFFT_url
		};

		chrome.storage.sync.set(settings,function() {
			/*chrome.storage.sync.get( defaultSettings, function( settings ) {
				console.log(settings);
			} );*/
			$(".msg").show().delay("slow").fadeOut("slow");
		});
		
		return false;
	};

	var revertOptions = function() {
		chrome.storage.sync.get( defaultSettings,
		function( settings ) {
			console.log(settings);
			$("input#intervalTimeoutValue").val( settings.interval );
			$("input#intervalJitterValue").val( settings.jitter );
			$("input#ifft_url").val( settings.ifft_hook );
		});
		return false;
	};

	$( "#saveButton" ).click( commitOptions );
	$( "#cancelButton" ).click( revertOptions );
	revertOptions();
}())