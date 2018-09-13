/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2018-06-02 19:05:03
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Archives } from './archives.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';


export const ArchiveAdd = new ValidatedMethod({
	name: 'Archives.methods.add',
	validate({ text }) {
		if(!_.isString(text) || _.isEmpty(text)){
			throw new ValidationError([{
				name: 'text',
				type: 'not-a-string',
				details: {
				  value: text
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
	run({ text }) {
		text = text.replace(/&nbsp;/g, " ");
		console.log(text);
		this.unblock();
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
		let myArchive = Archives.update({
			type : config.archives.private.type,
			owner : this.userId
		},{
			$inc : {
				count : text.length
			},
			$push : {
				backspaces : {
					$position : 0,
					$each : [text]
				}
			},
			$set : {
				updatedAt : new Date()
			}
		});
		streamer.emit('liveBackspaces', text);
		return "YES";
	}
});