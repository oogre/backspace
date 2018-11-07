/*----------------------------------------*\
  bcksp.es - utilities.blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 00:11:16
  @Last Modified time: 2018-11-07 16:27:44
\*----------------------------------------*/
import _ from 'underscore';
import Utilities from './utilities.js';

export default class UtilitiesBlacklist {
	
	static getIntoBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		for(let i = 0 ; i < blackList.length ; i++){
			if(blackList[i] == url){
				return i;
			}
		}
		return false;
	}

	static getBlindfields(){
		return JSON.parse(localStorage.getItem("blindfiels") || "[]");
	}


	static async setBlackList(urls){
		if(!_.isArray(urls)) throw new Error("setBlackList : need urls to be an array");
		let oldBlackList = JSON.parse(localStorage.getItem("blackList") || "[]");

		let blackliststed = _.difference(urls, oldBlackList);
		let whiteliststed = _.difference(oldBlackList, urls);

		Utilities.log("blackliststed", blackliststed);
		Utilities.log("whiteliststed", whiteliststed);

		localStorage.setItem("blackList", JSON.stringify(urls));
		
		return _.chain(blackliststed)
					.union(whiteliststed)
					.uniq()
					.value();
	}

	static async setBlindfield(blindfiels){
		if(!_.isObject(blindfiels)) throw new Error("setBlindfield : need blindfiels to be an object");
		if(!_.isArray(blindfiels.class)) throw new Error("setBlindfield : need blindfiels.class to be an array");
		if(!_.isArray(blindfiels.types)) throw new Error("setBlindfield : need blindfiels.types to be an array");
		
		localStorage.setItem("blindfiels", JSON.stringify(blindfiels));
		return blindfiels;
	}

	static removeToBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		let itemId = UtilitiesBlacklist.getIntoBlackList(url);
		if(itemId === false) return;
		blackList.splice(itemId, 1);
		localStorage.setItem("blackList", JSON.stringify(blackList));
	}

	static async reloadTabs(urls){
		return urls.map( url => {
			return new Promise((resolve, reject)=>{
				chrome.tabs.query({
					'url': [
						"http://" + url + "/*",
						"https://" + url + "/*"
					]
				}, (value, error) => {
					if(error)return reject(error);
					resolve(value);
				});
			}).then(tabs => {
				tabs.forEach(tab => chrome.tabs.reload(tab.id))
			});
		});
	}
}