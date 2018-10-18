/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:54
  @Last Modified time: 2018-10-07 20:23:36
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';

export const SettingsBlacklistAdd = new ValidatedMethod({
	name: 'Settings.Blacklist.Add',
	validate({ url }) {
		
		if(!_.isString(url) || _.isEmpty(url)){
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: url
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		console.log("Settings.Blacklist.Add : "+url)
		console.log(this.userId);
		if (!this.userId) {
			// Throw errors with a specific error code
			throw new ValidationError([{
				name: 'userId',
				type: 'not-logged-in',
				details: {
				  value: null
				}
			}]);
		}

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
	}
});

export const SettingsBlacklistRemove = new ValidatedMethod({
	name: 'Settings.Blacklist.Remove',
	validate({ url }) {
		if(!_.isString(url) || _.isEmpty(url)){
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: url
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		
		console.log("Settings.Blacklist.Remove : "+url)
		console.log(this.userId);
		if (!this.userId) {
			// Throw errors with a specific error code
			throw new ValidationError([{
				name: 'userId',
				type: 'not-logged-in',
				details: {
				  value: null
				}
			}]);
		}
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
	}
});