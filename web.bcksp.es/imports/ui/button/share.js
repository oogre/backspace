/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 17:45:05
  @Last Modified time: 2018-10-31 16:22:43
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

export default class ButtonShare extends Component {
	constructor(props){
		super(props);
	}
	onClick(){
		console.log(this.props.content);
	}
	render() {
		return (
			<div
					style={{	
						position:"absolute",
						background:"red",
						width:"50px",
						height:"20px",
						transform: "translate(-50%, -100%)",
						left: this.props.left+"px",
						top: this.props.top+"px"
					}}
			>
				<button onClick={this.onClick.bind(this)}>
					<T>menus.share</T>
				</button>
			</div>
		);
	}
}