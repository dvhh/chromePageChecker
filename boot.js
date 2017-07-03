(function(w){
	"use strict";

	var myLockId = chrome.runtime.id;

	// script has already been loaded once 
	if(document.getElementById(myLockId)!=null) return;	

	var messageHandler = function(request, sender, sendResponse) {
			// get page favicon
			var iconUri=$("link[rel*='icon']").attr("href");
			var startCheck = function () {
				if(document.querySelector(request)) {
					$.get(location,function(data) {
						var current=$(data).find(request).text();
						var handle;
						var element=document.getElementById(myLockId);
						var check=function(selector) {
							element.innerHTML="downloading ...";
							$.get(location,function(data){
								//n1.close(n1);
								element.innerHTML="checking ...";
								var downloaded =$(data).find(selector).text();
								console.log(downloaded==current);
								if(downloaded!=current) {
									// TODO : Sound notification
									var n=new Notification("Page checker",
									{
										"icon":iconUri,
										"body":location+ " has been updated"
									});
									n.onclick=function() {
										alert("page updated");
										window.location.reload(true); 
										n.close(n);
									}
									setTimeout(check,15000+Math.random()*5000,selector);
								}else{
									setTimeout(check,3000+Math.random()*4000,selector);
								}
								element.innerHTML="idle "+Math.ceil(Date.now()/1000%10000);
							});

						};
						check(request);
					});
					var n=new Notification("Page checker",
					{
						"icon":iconUri,
						"body":"checking "+request
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
	element.innerHTML = "page checker";
	document.body.appendChild(element);
}(window))