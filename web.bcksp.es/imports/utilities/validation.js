/*----------------------------------------*\
  bcksp.es - validation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 14:22:19
  @Last Modified time: 2020-01-26 15:06:00
\*----------------------------------------*/
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { config } from './../startup/config.js';
import T from './../i18n/index.js';

export const regexp = {
	email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export function checkBlindfieldRemoveAllowed(classFlag, type, origin="main"){
	if(	(classFlag && config.settings.blindfield.disabled.blocked.class.includes(type)) ||
		(!classFlag && config.settings.blindfield.disabled.blocked.type.includes(type))
	){
		throw new ValidationError([{
			name: 'type',
			type: 'not-recognize',
			details: {
			  value: i18n.__("errors.default.remove-disabled"),
			  origin : origin,
			}
		}]);
	}
}
export function checkDBReference(request, Collection, origin="main"){
	if(!Collection.findOne(request)){
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : origin,
				}
			}]);
		}

}
export function checkObject(value, origin="main"){
	if(!_.isObject(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkArray(value, origin="main"){
	if(!_.isArray(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkString(value, origin="main"){
	if(!_.isString(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.type.not-a-string", {value : value}),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkNumber(value, origin="main"){
	if(!_.isNumber(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-number',
				details: {
				  value: i18n.__("errors.type.not-a-number"),
				  origin : origin,
				}
			}]);
	return value;
}
export function checkGreaterThan(a, b, origin="main"){
	checkNumber(a);
	checkNumber(b);
	if(a < b)
			throw new ValidationError([{
				name: 'type',
				type: 'greater-than',
				details: {
				  value: i18n.__("errors.type.greater-than", {a, b}),
				  origin : origin,
				}
			}]);
	return true;
}

export function checkUrl(value, origin="main"){
	if(!_.isString(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.url.not-a-string"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkUserLoggedIn(origin="main"){
	if (!Meteor.userId()) throw new ValidationError([{
			name: 'login',
			type: 'required',
			details: {
				value : i18n.__("errors.login.required"),
				origin : origin,
			}
		}]);
	return true;
}

export function checkUserRole(role, origin="main"){
	if(!Roles.userIsInRole(Meteor.userId(), role))throw new ValidationError([{
			name: 'role',
			type: 'required',
			details: {
				value : i18n.__("errors.role.required", {role : role}),
				origin : origin,
			}
		}]);
	return true;
}

export function checkValidDevice(value, origin="main"){
	if(_.isEmpty(value))throw new ValidationError([{
			name: 'device',
			type: 'required',
			details: {
			  value: i18n.__("errors.device.required"),
			  origin : origin,
			}
		}]);
	if(!_.isString(value))throw new ValidationError([{
			name: 'device',
			type: 'not-a-string',
			details: {
			  value: i18n.__("errors.device.not-a-string"),
			  origin : origin,
			}
		}]);
	if(!_.values(config.devices).includes(value)) throw new ValidationError([{
				name: 'device',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.device.no-match", {deviceId : value}),
				  origin : origin,
				}
			}]);
	return value;	
}

export function checkValidEmail(value, hasToExist = true, origin="main"){
	if(_.isEmpty(value)) throw new ValidationError([{
				name: 'email',
				type: 'required',
				details: {
				  value: i18n.__("errors.email.required"),
				  origin : origin
				}
			}]);
	if(!_.isString(value)) throw new ValidationError([{
				name: 'email',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.email.not-a-string"),
				  origin : origin
				}
			}]);
	if(!regexp.email.test(value)) throw new ValidationError([{
				name: 'email',
				type: 'not-an-email',
				details: {
				  value: i18n.__("errors.email.not-an-email"),
				  origin : origin
				}
			}]);

	let userExistance = !!Meteor.users.findOne({"emails.address" : value});

	if( hasToExist && !userExistance) throw new ValidationError([{
				name: 'email',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.email.no-match"),
				  origin : origin
				}
			}]);
	if( !hasToExist && userExistance) throw new ValidationError([{
			name: 'email',
			type: 'already-exists',
			details: {
			  	value: i18n.__("errors.email.already-exists"),
				origin : origin
			}
		}]);
	return value;
}

export function checkValidPassword(value, confirm, origin="main"){
	if(_.isEmpty(value)) throw new ValidationError([{
				name: 'password',
				type: 'required',
				details: {
				  value: i18n.__("errors.password.required"),
				  origin : origin
				}
			}]);
	if(!_.isString(value)) throw new ValidationError([{
				name: 'password',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.password.not-a-string"),
				  origin : origin
				}
			}]);
	if(value.length < config.user.password.length.min) throw new ValidationError([{
				name: 'password',
				type: 'min-string',
				details: {
				  value: i18n.__("errors.password.min-string", {length : config.user.password.length.min}),
				  origin : origin
				}
			}]);
	if(value.length > config.user.password.length.max) throw new ValidationError([{
				name: 'password',
				type: 'max-string',
				details: {
				  value: i18n.__("errors.password.max-string", {length : config.user.password.length.max}),
				  origin : origin
				}
			}]);
	if(_.isEmpty(confirm)) throw new ValidationError([{
				name: 'passwordConfirm',
				type: 'required',
				details: {
				  value: i18n.__("errors.passwordConfirm.required"),
				  origin : origin
				}
			}]);
	if(value !== confirm) throw new ValidationError([{
				name: 'passwordConfirm',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.passwordConfirm.no-match"),
				  origin : origin
				}
			}]);
	return value;
}
export async function asyncIt(fnc, ...args){
	return new Promise((resolve, reject)=>{
		try{
			resolve(fnc.apply(this, args));
		}catch(e){
			reject(e)
		}	
	})	
}
