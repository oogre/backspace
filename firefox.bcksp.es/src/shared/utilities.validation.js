/*----------------------------------------*\
  bcksp.es - utilities.validation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 14:20:47
  @Last Modified time: 2018-12-04 16:06:28
\*----------------------------------------*/
import _ from 'underscore';

export default class UtilitiesValidation {
	static async isEmail(value, ref, aggregator = {}){
		if(_.isEmpty(ref))ref = "";
		else ref += "|";
		let EmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if(_.isEmpty(value)) throw new Error("Your email is empty");
		if(!_.isString(value)) throw new Error("Your email must be a string");
		if(!EmailRegExp.test(value)) throw new Error("Your email is wrong formatted");
		aggregator.email = value;
		console.log("aggregator" , aggregator);
		return aggregator;
	}
	static async isPwd(value, ref, aggregator = {}){
		if(_.isEmpty(ref))ref = "";
		else ref += "|";
		if(_.isEmpty(value)) throw new Error("Your password is empty");
		if(!_.isString(value)) throw new Error("Your password must be a string");
		if(value.length < 6) throw new Error("Your password is too short, min 6 characters");
		if(value.length > 127) throw new Error("Your password is too long, max 127 characters");
		aggregator.password = value;
		console.log("aggregator" , aggregator);
		return aggregator;
	}
}