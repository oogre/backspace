/*----------------------------------------*\
  bcksp.es - utilities.blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 00:11:16
  @Last Modified time: 2018-05-28 23:40:05
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

	static setBlackList(urls){
		if(!_.isArray(urls)) return Utilities.error("setBlackList", "need array as parameter");
		let oldBlackList = JSON.parse(localStorage.getItem("blackList") || "[]");

		let blackliststed = _.difference(urls, oldBlackList);
		let whiteliststed = _.difference(oldBlackList, urls);

		Utilities.log("blackliststed", blackliststed);
		Utilities.log("whiteliststed", whiteliststed);

		localStorage.setItem("blackList", JSON.stringify(urls));
		
		_.chain(
			blackliststed
		).union(whiteliststed
		).uniq(
		).map( url => {
			browser.tabs.query({
				'url': url, 
			}).then(tabs => {
				tabs.forEach(tab => browser.tabs.reload(tab.id))
			});
		});
	}

	static removeToBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		let itemId = UtilitiesBlacklist.getIntoBlackList(url);
		if(itemId === false) return;
		blackList.splice(itemId, 1);
		localStorage.setItem("blackList", JSON.stringify(blackList));
	}
}