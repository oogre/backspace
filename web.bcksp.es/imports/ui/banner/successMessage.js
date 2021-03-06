/*----------------------------------------*\
  bcksp.es - successMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-25 18:07:51
  @Last Modified time: 2020-02-27 20:01:28
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

let timeout;
const SuccessMessage = ({message}) => {
	React.useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timeout);
		}
	}, []);
	if(message){
		Meteor.clearTimeout(timeout);
		timeout = Meteor.setTimeout(()=>Session.set("success", false), 5000);
		return (
			<div className="call-to-connect success">
				<div className="container--large">
					<p className="call-to-connect__title">{message.title}</p>
					<p className="call-to-connect__content">{message.content}</p>
				</div>
			</div>
		);
	}
	return (null);
}

export default withTracker(self => {
	return {
		message : Session.get("success")
	};
})(SuccessMessage);
