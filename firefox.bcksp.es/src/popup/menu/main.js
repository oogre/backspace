/*----------------------------------------*\
  bcksp.es - logedin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:35:44
  @Last Modified time: 2019-01-04 23:04:38
\*----------------------------------------*/

import React, { Component } from 'react';
import Blacklist from './../blacklist.js';
import { config } from './../../shared/config.js';
import { sendMessage, on } from './../../utilities/com.js';

export default class MainMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'archiveSize' : 0
		};
	}
	componentDidMount() {
		sendMessage("getArchiveSize")
		.then(archiveSize=> {
			this.setState({'archiveSize' : archiveSize});
		})
		.catch(e => info(e.message));
		
		on("archiveSize", (data, resolve, reject) =>{
			this.setState({'archiveSize' : data});
			resolve(true);
		});
	}
	handleLogout(event){
		sendMessage("logout")
		.then(isLoggedIn => {
			this.props.onLoginStatusChange(isLoggedIn);
		})
		.catch(e => info(e.message));
	}
	handleMyFeed(event){
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => info(e.message));
	}
	handleMySettings(event){
		sendMessage("openTab", config.getProfileUrl())
		.then(data => info(data))
		.catch(e => info(e.message));
	}
	render() {
		return (
			<ul>
				<li>
					<Blacklist/>
				</li>
				<li>
					<button 
							className="" 
							onClick={this.handleMySettings.bind(this)}
						>
							other security settings
					</button>
				</li>
				<li>
					<p>{this.state.archiveSize} characters saved</p>
				</li>
				<li>
					<button 
							className="" 
							onClick={this.handleMyFeed.bind(this)}
						>
							access your archive
					</button>
				</li>
				<li>
					<button 
							className="button--secondary logout" 
							onClick={this.handleLogout.bind(this)}
						>
							logout
					</button>
				</li>
			</ul>
		);
	}
}
