export const config = {
	senderTimeout : 6000,
	standard_url : "*://*.bcksp.es/*",
	protocol : "http://",
	ws_protocol : "ws://",
	address : "local.bcksp.es",
	home : "/dev",
	login : "/login",
	logout : "/logout",
	profile : "/profile",
	websocket : "/websocket",
	getLogoutUrl : function(){
		return config.protocol+config.address+config.logout;
	},
	getLoginUrl : function(key){
		return config.protocol+config.address+config.login+"/"+key;
	},
	getHomeUrl : function(){
		return config.protocol+config.address+config.home;
	},
	getProfileUrl : function(){
		return config.protocol+config.address+config.profile;
	},
	getWebSocketUrl : function(){
		return config.ws_protocol+config.address+config.websocket;
	}
}
