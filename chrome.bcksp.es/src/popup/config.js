/*----------------------------------------*\
  bcksp.es - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2018-06-02 18:23:09
\*----------------------------------------*/
import React from 'react';
import _ from 'underscore';
import Utilities from './../shared/utilities.js';

export default class Config extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentURL : "",
			currentURLBlacklisted : "blacklisted"
		};
	}

	componentDidMount() {
		Utilities.sendMessage("getUrl", "true")
			.then(({url, blackListed}) =>{
				this.setState({
					currentURL: url,
					currentURLBlacklisted: !!blackListed ? "blacklisted" : "whitelisted"
				});
			})
			.catch(error => console.log(error));
	}

	handleBlacklistChange({target}){
		this.setState({
			currentURLBlacklisted: target.value
		});
		let data = {
			url : this.state.currentURL,
			blacklisted : target.value == "blacklisted"
		};
		Utilities.sendMessage("changeBWlist", data)
			.catch(error => console.log(error));
	}

	render() {
		return (
	    	<form class="security">
				<div class="fields-row">
					<div class="fields-column">
						<div class="btn-group" data-toggle="buttons">
							<div>
								<input type="text" name="currentURL" value={this.state.currentURL} disabled/>
							</div>
							<div>
								<label>This website is : </label>
								<label>
									<input 
										readOnly
										name="listed"
										type="radio"
										value="whitelisted" 
										checked={this.state.currentURLBlacklisted === 'whitelisted'} 
										onChange={this.handleBlacklistChange.bind(this)}
									/>
									Whitelisted
								</label>
								<label>
									<input 
										readOnly
										type="radio" 
										value="blacklisted"
										checked={this.state.currentURLBlacklisted === 'blacklisted'} 
										onChange={this.handleBlacklistChange.bind(this)}
									/>
									Blacklisted
								</label>
							</div>
							<label> (any change of this, will reload the website) </label>
						</div>
					</div>
				</div>
			</form>
		);
	}
}