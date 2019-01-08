import { Meteor } from 'meteor/meteor';
import '../imports/startup/account-config.js';
import { isExtensionInstalled } from './../imports/utilities/ui.js';
import './router.js'; 

Session.set("extensionInstalled", isExtensionInstalled());

Meteor.startup(()=>{	
	new MutationObserver(eventArray=>{
		eventArray.map(event=>{
			if(event.type == "attributes"){
				Session.set("extensionInstalled", isExtensionInstalled());
			}
		})
	}).observe( document.documentElement, { 
		attributes: true 
	});

});