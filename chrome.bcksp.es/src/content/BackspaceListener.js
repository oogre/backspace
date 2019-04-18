import Data from "./../utilities/Data.js";
import Protocol from "./../utilities/Protocol.js";
import { sendMessage } from './../utilities/com.js';
import { getContent } from './../utilities/tools.js';
import { log, info, warn, error } from './../utilities/log.js';
import { diff, getHighlightText, getCharBeforeCaret, specialCase } from './../utilities/backspace.js';
import { checkString, checkTarget, isAcceptable, isInputField, isEmpty } from './../utilities/validation.js';

export default class BackspaceListener{
	constructor(){
		sendMessage("getBlindfields")
		.then(blindfields=>{
			Data.setState({
				blindfields : blindfields
			});
		});
		log("BackspaceListener initializer");
		this.setupListener(document);
		Protocol.add("Highlight", target => {
			try{
				let content = getHighlightText(target);
				log("Highlight", content.split("").reverse().join(""));
				
				sendMessage("archive", content)
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
		Protocol.add("CharBeforeCaret", target => {
			try{
				let content = getCharBeforeCaret(target);
				log("CharBeforeCaret", content);
				
				sendMessage("archive", content)
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
		Protocol.add("Diff", ({before, after}) =>{
			let	content = isEmpty(after) ? before : diff(before, after);
			try{
				checkString(content)
				log("Diff", content);

				sendMessage("archive", content.split("").reverse().join(""))
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
	}
	
	keyDownListener(event){
		if(8 !== event.keyCode)return true;
		let target;
		
		if(false === (target = checkTarget(this.activeElement))){
			warn("Error with : " + this.activeElement);
		}

		if(!isAcceptable(target)){
			log("This field is not acceptable");
			return true;
		}

		sendMessage("backspace")
		.then(data => info(data))
		.catch(e => info(e.message));

		specialCase({
			"googleDocument" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelector(".kix-appview-editor"))
					});
				}
			},
			"googleSpreadsheets" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelector(".cell-input"))
					});
				}
			},
			"googlePresentation" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelectorAll(".panel-right text"))
					});
				}
			},
			"googleDrawings" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelectorAll("text"))
					});
				}
			},
			"default" : () => {
				if(isInputField(target)){
					if(!Protocol.exec("Highlight", target)){
						if(!Protocol.exec("CharBeforeCaret", target)){
							if(!Data.state.downFlag){
								Data.setState({
									innerText : getContent(target)
								});
							}
						}
					}	
				}else{
					if(!Data.state.downFlag){
						Data.setState({
							innerText : getContent(target)
						});
					}					
				}
			}
		});
		Data.setState({
			downFlag : true
		});
	}
	keyUpListener(event){
		if(8 !== event.keyCode)return true;
		
		if(isEmpty(Data.state.innerText)){
			Data.setState({
				downFlag : false,
			});
			return true;
		}

		let target;
		if(false === (target = checkTarget(this.activeElement))){
			warn("Error with : "+this.activeElement);
			Data.setState({
				downFlag : false,
			});
		}

		if(!isAcceptable(target)){
			log("This field is not acceptable");
			Data.setState({
				downFlag : false,
			});
			return true;
		}

		sendMessage("backspace")
		.then(data => info(data))
		.catch(e => info(e.message));
		specialCase({
			"googleDocument" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelector(".kix-appview-editor"))
			}),
			"googleSpreadsheets" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelector(".cell-input"))
			}),
			"googlePresentation" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelectorAll(".panel-right text"))
			}),
			"googleDrawings" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelectorAll("text"))
			}),
			"default" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(target)
			})
		});
		Data.setState({
			downFlag : false,
			innerText : "" 
		});
	}
	setupListener(target){
		this.addListeners(target);
		/*let self = this;
		try{
			target.querySelectorAll("iframe")
			.forEach(iframe => {
				try{
					iframe.contentWindow.document.addEventListener("keydown", self.keyDownListener, true);
					iframe.contentWindow.document.addEventListener("keyup", self.keyUpListener, true);
					iframe.addEventListener("load", function(event) {
							iframe.contentWindow.document.addEventListener("keydown", self.keyDownListener, true);
							iframe.contentWindow.document.addEventListener("keyup", self.keyUpListener, true);
					}, false);
				}catch(e){}
			});
		}catch(e){}*/
	}
	addListeners (element){
		element.addEventListener("keydown", this.keyDownListener, true);
		element.addEventListener("keyup", this.keyUpListener, true);	
	}
}