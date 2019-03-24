/*----------------------------------------*\
  bcksp.es - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:38:28
  @Last Modified time: 2019-03-24 18:05:53
\*----------------------------------------*/

import { isContentEditable, isInputField, isArray, isEmpty } from "./validation.js";

export { filter, reduce, intersection, last, findWhere, difference, uniq, mapObject } from 'underscore';

export function getContentEditableInParent(element){
	if(isContentEditable(element)){
	  	return element;
	}
	if(element.parentElement){
		return getContentEditableInParent(element.parentElement);  
	}
	return false;
}

export function getContent(element){
	if(element instanceof element.ownerDocument.defaultView.NodeList) [].slice.call(element).reduce((memo, e) => memo += getContent(e), '');
    if(! (element instanceof element.ownerDocument.defaultView.Element)) return '';
    if(isInputField(element)) return element.value;
	return element.innerHTML.replace(/(<([^>]+)>)/ig, ''); 
}

export function getMessageFromError(error){
	if(isArray(error.details) && !isEmpty(error.details)){
		return error.details.map(e=>e.details.value).join(", ");
	}
	if(error.errorType == "Meteor.Error"){
		return error.reason;
	}
	if(error.name == "Error"){
		return error.message;
	}
	return error.toString();
}

export function jQuery( selector, context ) {}

let rootjQuery;
let readyBound = false;
let readyList = [];
let DOMContentLoaded;

jQuery.fn = {
    ready: function( fn ) {
        jQuery.bindReady();
        if ( jQuery.isReady ) {
            fn.call( document, jQuery );
        } else if ( readyList ) {
            readyList.push( fn );
        }
        return this;
    }
};
jQuery.isReady = false;
jQuery.ready = function() {
        if ( !jQuery.isReady ) {
            if ( !document.body ) {
                return setTimeout( jQuery.ready, 13 );
            }
            jQuery.isReady = true;
            if ( readyList ) {
                var fn, i = 0;
                while ( (fn = readyList[ i++ ]) ) {
                    fn.call( document, jQuery );
                }
                readyList = null;
            }
        }
    };
jQuery.bindReady = function() {
        if ( readyBound ) {
            return;
        }
        readyBound = true;

        if ( document.readyState === "complete" ) {
            return jQuery.ready();
        }
        if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            window.addEventListener( "load", jQuery.ready, false );
        } else if ( document.attachEvent ) {

            document.attachEvent("onreadystatechange", DOMContentLoaded);
            window.attachEvent( "onload", jQuery.ready );

            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch(e) {}
            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
        }
    };
rootjQuery = jQuery(document);
if ( document.addEventListener ) {
    DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        jQuery.ready();
    };
} else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", DOMContentLoaded );
            jQuery.ready();
        }
    };
}
function doScrollCheck() {
    if ( jQuery.isReady ) {
        return;
    }
    try {

        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }
    jQuery.ready();
}

