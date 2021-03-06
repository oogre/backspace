/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:34:12
  @Last Modified time: 2020-03-04 18:34:28
\*----------------------------------------*/

import React from 'react';
import { getTranslations } from "./../../../../i18n/index.js";

// App component - represents the whole app
const SouvenirItemContactBadge = () => {
	const {C} = getTranslations("souvenir.item.contact");
	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("contact", {type:"souvenir"})}>
				<div className="wrapper">
					<img className="souvenir__link-image" src="/images/souvenirs/contact.1.jpg" alt=""/>
				</div>
				<span className="souvenir__link-title">
					<C>title</C>
				</span>
			</a>
		</li>
	);
}

export default SouvenirItemContactBadge