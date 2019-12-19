/*----------------------------------------*\
  web.bitRepublic - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:44:23
  @Last Modified time: 2019-12-19 22:23:41
\*----------------------------------------*/
import React, { Component } from 'react';



export default class MessageError extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="message error-message">
				{ this.props.messages }
			</div>
		);
	}
}