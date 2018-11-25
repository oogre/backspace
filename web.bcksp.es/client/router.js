/*----------------------------------------*\
  web.bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:12:52
  @Last Modified time: 2018-11-25 23:20:58
\*----------------------------------------*/
/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2018-04-12 10:33:17
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import TemplateFull from '../imports/ui/template/full.js';

import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';
import UserProfile from '../imports/ui/user/profile.js';

FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		render(<TemplateFull><App/></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('archive.private', Meteor.subscribe('archive.private'));
		this.register('archive.private.counter', Meteor.subscribe('archive.private.counter'));
		this.register('archive.public', Meteor.subscribe('archive.public'));
		this.register('archive.public.counter', Meteor.subscribe('archive.public.counter'));
	}
});

FlowRouter.route( '/about', {
	name: 'about',
	action( params ) {
		render(<TemplateFull><About /></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/login/:token', {
	name: 'login',
	action( params ) {
		LoginLinks.loginWithToken(params.token, (e, r) => {
			if (e) return console.log(e);
			console.log(r);
		});
	}
});

FlowRouter.route( '/logout', {
	name: 'logout',
	action( params ) {
		Meteor.logout();
	}
});

let loginRoutes = FlowRouter.group({
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId()){
			redirect("/");
		}
	}]
});

loginRoutes.route("/profile", {
	name: "userProfile",
	action( params ) {
		render(<TemplateFull><UserProfile/></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('settings.private', Meteor.subscribe('settings.private'));
	}
});
