/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:54
  @Last Modified time: 2019-03-05 11:08:48
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';

import { 
	checkUserLoggedIn,
	checkString,
	checkUrl
} from './../../utilities/validation.js';


export const SettingsBlindFieldAdd = new ValidatedMethod({
	name: 'Settings.Blind.Field.Add',
	validate({ type, classFlag=false }) {
		checkUserLoggedIn();
		checkString(type);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		this.unblock();
		let search = {
			owner : this.userId
		};
		search["blindfield."+(classFlag?"class":"types")] = {
			$nin: [type]
		};
		let value = {
			$push : {},
			$set : {
				updatedAt : new Date()
			}
		}
		value.$push["blindfield."+(classFlag?"class":"types")] = type
		Settings.update(search,value);
		return {
			success : true,
			data : "BlindField Added"
		};
	}
});

export const SettingsBlindFieldRemove = new ValidatedMethod({
	name: 'Settings.Blind.Field.Remove',
	validate({ type, classFlag=false }) {
		checkUserLoggedIn();
		checkString(type);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		this.unblock();
		let search = {
			owner : this.userId
		};
		search["blindfield."+(classFlag?"class":"types")] = {
			$in: [type]
		};
		let value = {
			$pull : {},
			$set : {
				updatedAt : new Date()
			}
		}
		value.$pull["blindfield."+(classFlag?"class":"types")] = type
		Settings.update(search, value);
		return {
			success : true,
			data : "BlindField Removed"
		};
	}
});

export const SettingsBlacklistAdd = new ValidatedMethod({
	name: 'Settings.Blacklist.Add',
	validate({ url }) {
		checkUserLoggedIn();
		checkUrl(url);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		let mySettings = Settings.findOne({
			owner : this.userId
		}, {
			fields : {
				blacklist : 1
			}
		});
		if(!mySettings){
			Settings.insert({
				owner : this.userId,
				blacklist : [ url ],
				createdAt : new Date(),
				updatedAt : new Date()
			});
		}else{
			Settings.update({
				_id : mySettings._id,
				blacklist : {
					$nin: [url]
				}
			},{
				$push : {
					blacklist : url
				},
				$set : {
					updatedAt : new Date()
				}
			});
		}
		return {
			success : true,
			data : "Blacklist Added"
		};
	}
});

export const SettingsBlacklistRemove = new ValidatedMethod({
	name: 'Settings.Blacklist.Remove',
	validate({ url }) {
		checkUserLoggedIn();
		checkUrl(url);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		Settings.update({
			owner : this.userId,
			blacklist : {
				$in: [url]
			}
		}, {
			$pull : {
				blacklist : url
			},
			$set : {
				updatedAt : new Date()
			}
		});
		return {
			success : true,
			data : "Blacklist Removed"
		};
	}
});