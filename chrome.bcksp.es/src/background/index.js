import AsteroidHelper from "./AsteroidHelper.js";
import Utilities from '../shared/utilities.js';
import Data from "./../shared/Data.js";
import _ from 'underscore';

let senderTimeout = 6000;

chrome.tabs.onActivated.addListener(({tabId}) => {
	chrome.tabs.get(tabId, ({url}) => {
		Data.currentURLBlacklisted = Utilities.getIntoBlackList(url) !== false;
		Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
	});
});

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	if(sender.id != chrome.runtime.id)return;
	switch(request.action){
		case "login" : 
			AsteroidHelper.login(request.data,(err, res) => {
				sendResponse(AsteroidHelper.asteroid.loggedIn);
			});
		break;
		case "archive" : 
			Utilities.log(request.data);
			Utilities.addToArchiveBuffer(request.data);
		case "backspacing" : 
		case "backspaceup" : 
			Utilities.setIcon("backspacing");
			clearTimeout(Data.timers.saveDB);
			Data.timers.saveDB = setTimeout(()=> AsteroidHelper.send(), senderTimeout);
			sendResponse(true);
		break;
		case "logout" : 
			AsteroidHelper.logout((err, res) => {
				if(err) console.error("LOGOUT FAIL");
				else sendResponse(AsteroidHelper.asteroid.loggedIn);
			});
		break;
		case "isLogin":
			sendResponse(AsteroidHelper.asteroid.loggedIn);
		break;
		case "getUrl":
			/*
				Called everytime a page is loaded
			*/
			/*
				+ true; => 1
				+ false; => 0
			*/
			chrome.tabs.query({
				'active': true, 
				'lastFocusedWindow': true
			}, tabs => {
			    let url = tabs[0].url;
			    Data.currentURLBlacklisted = Utilities.getIntoBlackList(url) !== false;
			    Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
			    sendResponse({
					url : url,
					blackListed : +Data.currentURLBlacklisted
				});
			});
		break;
		case "changeBWlist":
			AsteroidHelper.blacklist(request.data.blacklisted, request.data.url);
		break;
	}
	return true; //so i can use sendResponse later
});