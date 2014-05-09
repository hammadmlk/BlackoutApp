javascript:(function () {
	alert('Use your mouse to blackout any text on this page.');
	/*
	On mouseup
	get the highlighted range.
	convert it to string
	append font tags to string
	make node elements from this new sting
	 */
	document.onmouseup = function () {

		var sel,range;
    
    /*If getSelection feature supported*/
		if (window.getSelection) {
			/*Get the highlighted selection*/
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				
				/*get html of selection*/
				fragment = range.cloneContents();
				var div = document.createElement('div');
				div.appendChild(fragment.cloneNode(true));
				var selectionhtml = div.innerHTML;
				
				/*Surround selected html strong with blackout tag*/
				var textColor = 'black';
				var bgColor = 'black';
				var highlightStartTag = '<font style=\'color:' + textColor + ' !important; background-color:' + bgColor + ' !important;\'>';
				var highlightEndTag = '</font>';
				var replacementhtml = highlightStartTag + selectionhtml + highlightEndTag;
        
        /*create nodes from replacement html.*/
				var div2 = document.createElement('div');
				div2.innerHTML = replacementhtml;
				var replacementElements = div2.childNodes;
        
        /*recurse for each node with sub nodes?? */
        
				/*del old content from range*/
				range.deleteContents();
				
        /*Move nodes from replacementElements to range*/
				for (var i = replacementElements.length - 1; i >= 0; i--) {
					range.insertNode(replacementElements[i]);
				};
        
        /*unhighlight/unselect the selected text. */
        window.getSelection().removeAllRanges();
			};
		} else if (document.selection && document.selection.createRange) {
			alert('Sorry this browser is not supported. Try chrome, safari or IE 9+' );
      /*range = document.selection.createRange();
			range.text = replacementText;*/
		}

		return;

	};

})();