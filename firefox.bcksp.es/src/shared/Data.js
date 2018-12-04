/*----------------------------------------*\
  bcksp.es - Data.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 19:33:44
  @Last Modified time: 2018-12-04 16:15:10
\*----------------------------------------*/
import _ from 'underscore';

class Data{
	constructor(){
		this.state = {
			archiveSize : 0,
			currentURLBlacklisted: false,
			connected: false,
			innerText: "",
			downFlag: false,
			timers: {},
			procrastinations: {},
			currentIcon: "",
			blindfields : {}
		};
		this.actions = _.mapObject(this.state, (value, key) => {
			return [];
		});
		this.actions["*"] = [];
		this.iconHistory = [];
	}
	setState(data){
		if(!_.isObject(data)) throw new Error("Data.setState takes object as first argument");
		_.mapObject(data, (value, name) => {
			this.state[name] = value;
			if(_.isArray(this.actions[name])){
				_.union(this.actions[name], this.actions["*"])
					.map(action => {
						if(_.isFunction(action)){
							action(value, name);
						}
					});
			}
		});
	}

	on(name, cb){
		if(!_.isFunction(cb)) throw new Error("Data.on takes a function as second argument");
		if(!_.isArray(this.actions[name]))this.actions[name] = [];
		this.actions[name].push(cb);
	}

	addIconHistory(name){
		this.iconHistory.push(name);
		if(this.iconHistory.length > 5){
			this.iconHistory.shift()
		}
	}
	getCurrentIconStatus(){
		if(this.iconHistory.length == 0 ) return "";
		return this.iconHistory[this.iconHistory.length-1];
	}
}

export default new Data();