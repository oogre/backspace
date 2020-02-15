/*----------------------------------------*\
  bcksp.es - errorMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-19 19:16:33
  @Last Modified time: 2020-02-03 15:59:38
\*----------------------------------------*/
import React, {useEffect} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

let timeout;
const ErrorMessage = ({error}) => {

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timeout);
		}
	}, []);
	if(error){
		Meteor.clearTimeout(timeout);
		timeout = Meteor.setTimeout(()=>Session.set("error", false), 3000);
		return (
			<div className="call-to-connect error">
				<div className="container--large">
					<p className="call-to-connect__title">{error?.type}</p>
					<p className="call-to-connect__content">{error?.value}</p>
				</div>
			</div>
		);
	}
	return (null);
}

export default withTracker(self => {
	return {
		error : Session.get("error")
	};
})(ErrorMessage);