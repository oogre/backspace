/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:16:05
  @Last Modified time: 2020-02-20 21:09:19
\*----------------------------------------*/
import React from 'react';

export default ArchiveSelector = React.forwardRef( ({caret, onSelect, autoSelect, children, available}, ref) => {
	const fullySelectedRef = React.useRef(false);

	React.useImperativeHandle(ref, () => ({
		setCaret: caret => {
			if(!available) return;
			caret.onCaretChange( caretChangeHandler );
		}
	}));

	React.useEffect(() => {//componentDidMount
		if(!available) return;
		if(!_.isObject(autoSelect))return;
		const newSelection = document.querySelector(".stream").childNodes[0];
		if(!(newSelection?.length))return;
		const selection = window.getSelection();
		const range = document.createRange();
		range.setStart(newSelection, Math.min(newSelection.length, autoSelect.startAt));
		range.setEnd(newSelection, Math.min(newSelection.length, autoSelect.stopAt));
		selection.removeAllRanges();
		selection.addRange(range);
		onSelect({
			content : document.getSelection().toString(),
			position : [0, 0]
		});
	}, [children]);

	const caretChangeHandler = event => {
		if(!available) return;
		let content = event.selectedText || "";
		if(_.isEmpty(content))return onSelect(false);
		let offset = event.caret.getOffset();
		onSelect({
			content : content,
			position : [offset.left, offset.top]
		});
	}

	if(!available) return children;
	
	return (
		<div className="bckspes-archive-selector">
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
});