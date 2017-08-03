(function(w){
	"use strict";

	var myLockId = chrome.runtime.id;

	// script has already been loaded once
	if(document.getElementById(myLockId)!=null) return;

	var messageHandler = function(request, sender, sendResponse) {
			// get page favicon
			var iconUri = $("link[rel*='icon']").attr("href");
			console.log( iconUri );
			if( iconUri == null ) {
				iconUri = location.protocol + "//" + location.host + "/favicon.ico";
			}
			var startCheck = function () {
				if(document.querySelector(request.selector)) {
					var port=chrome.runtime.connect();
					port.postMessage({"selector":request.selector,"settings":request.settings});
					$.get(location,function(data) {
						var current=$(data).find(request.selector).text();
						var handle=0;
						var element=document.getElementById(myLockId);

						var check=function(selector) {
							element.innerHTML="downloading ...";
							var timeoutInterval = request.settings.interval + Math.random() * request.settings.jitter;
							$.get(location,function(data){
								//n1.close(n1);
								element.innerHTML="checking ...";
								var downloaded =$(data).find(selector).text();
								console.log(downloaded==current);
								if(downloaded!=current) {
									console.log(current);
									console.log(downloaded);
									// TODO : Sound notification
									var n=new Notification("Page checker",
									{
										"icon":iconUri,
										"body":location+ " has been updated",
										"requireInteraction":true
									});
									console.log( request.settings.ifft_hook, request.event);
									if( ( request.settings.ifft_hook!= null ) && ( request.settings.ifft_hook != "" ) && ( request.event != "" ) ) {
										var ifft=request.settings.ifft_hook.replace("{event}", request.event );
										$.get( ifft );
									}
									
									n.onclick=function() {
										alert("page updated");
										port.disconnect();
										window.location.reload(true); 
										n.close(n);
									}
								}else{
									handle = setTimeout(check, timeoutInterval, selector);
								}
								element.innerHTML="idle "+handle;
							}).fail(function(){
								handle = setTimeout(check, timeoutInterval, selector);
								element.innerHTML="retry "+handle;
							});
						};
						check(request.selector);
					});
					var n=new Notification("Page checker",
					{
						"icon":iconUri,
						"body":"checking "+request.selector
					});
					setTimeout(n.close.bind(n),2000);
				}else{
					alert("could not find element to check");
				}
			}
			Notification.requestPermission().then( startCheck );
	};
	chrome.runtime.onMessage.addListener(messageHandler);

	// Messages and signal
	var element = document.createElement("div");
	element.id = myLockId;
	element.style.position = "fixed";
	element.style.bottom = "0";
	element.style.right = "0";
	element.style.padding = "0.2em";
	element.style.background = "#ffffff";
	element.style.border = "1px solid black";
	element.style.borderRadius = "0.2em";
	element.style.width = "8em";
	element.innerHTML = "page checker";

	// Keep the page alive by playing audio in the page
	document.body.appendChild(element);
	var audio = document.createElement("audio");
	// quiet audio file
	audio.src="https://ia600504.us.archive.org/11/items/EricMahlerSilence2/Silence21869064326.mp3";
	// be sure to make it quieter
	audio.volume=0.1;
	audio.autoplay=true;
	audio.loop=true;
	document.body.appendChild(audio);

}(window))