/*----------------------------------------*\
  web.bitRepublic - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:35:48
  @Last Modified time: 2018-05-22 20:22:26
\*----------------------------------------*/
import $ from 'jquery'
import sha256 from 'sha256'

$(".login-user").on("submit", event => {
	event.preventDefault();
	chrome.runtime.sendMessage({
		action : "login",
		data : {
			email : event.target[0].value,
			pwd : event.target[1].value
		}
	}, (response) =>{
      console.log(response);
      event.target[0].value = "";
      event.target[1].value = "";
    });
	return false;
});

$(".logout").on("click", event => {
	chrome.runtime.sendMessage({
		action : "logout",
		data : true
	});
});