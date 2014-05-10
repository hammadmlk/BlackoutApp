javascript:(function () {
	
  /*
   * This is the function that actually highlights a text string by
   * adding HTML tags before and after all occurrences of the search
   * term. You can pass your own tags if you'd like, or if the
   * highlightStartTag or highlightEndTag parameters are omitted or
   * are empty strings then the default <font> tags will be used.
   */
  function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
  	/* the highlightStartTag and highlightEndTag parameters are optional*/
  	if ((!highlightStartTag) || (!highlightEndTag)) {
  		highlightStartTag = '<font style=\'color:blue; background-color:yellow;\'>';
  		highlightEndTag = '</font>';
  	}

  	/* find all occurences of the search term in the given text,
  	and add some 'highlight' tags to them (we're not using a
  	regular expression search, because we want to filter out
  	matches that occur within HTML tags and script blocks, so
  	we have to do a little extra validation)*/
  	var newText = '';
  	var i = -1;
  	var lcSearchTerm = searchTerm.toLowerCase();
  	var lcBodyText = bodyText.toLowerCase();
  	while (bodyText.length > 0) {
  		i = lcBodyText.indexOf(lcSearchTerm, i + 1);
  		if (i < 0) {
  			newText += bodyText;
  			bodyText = '';
  		} else {
  			/* skip anything inside an HTML tag*/
  			if (bodyText.lastIndexOf('>', i) >= bodyText.lastIndexOf('<', i)) {
  				/* skip anything inside a <script> block*/
  				if (lcBodyText.lastIndexOf('/script>', i) >= lcBodyText.lastIndexOf('<script', i)) {
  					newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
  					bodyText = bodyText.substr(i + searchTerm.length);
  					lcBodyText = bodyText.toLowerCase();
  					i = -1;
  				}
  			}
  		}
  	}

  	return newText;
  }
  
  /*
  *
  */
  function get_unique_characters_array( string ){
    /*TODO: todo*/
    var unique=[];
    for(var i=0; i<string.length; i++){
            unique.push(string[i]);
    }
    return unique;
  }
  
  /*
  * 
  */
  function highlightHtml(html, text, highlightStartTag, highlightEndTag)
  {
    /*(searchArray = text.split(' ');*/
    
    var searchArray = get_unique_characters_array( text );
    
    console.log(searchArray);
    for (var i = 0; i < searchArray.length; i++) {
      if (searchArray[i]!==""){
        html = doHighlight(html, searchArray[i], highlightStartTag, highlightEndTag);
      }
    }
    
    return html;
  }

  alert('Use your mouse to blackout any text on this page.');
	
  /*
	On mouseup
	get the highlighted range.
	convert it to string
	append font tags to string
	make node elements from this new sting
	 */
	document.onmouseup = function () {

		sel=0;range=0; /*TODO make local*/
    
    /*If getSelection feature supported*/
		if (window.getSelection) {
			/*Get the highlighted selection*/
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				
				/*get html and text of selection*/
        var selectiontext = range.toString();
				fragment = range.cloneContents();
				var div = document.createElement('div');
				div.appendChild(fragment.cloneNode(true));
				var selectionhtml = div.innerHTML;
				
        console.log(selectiontext);
        console.log(selectionhtml);
        
				/*Surround selected html strong with blackout tag*/
				var textColor = 'black';
				var bgColor = 'black';
				var highlightStartTag = '<font style=\'color:' + textColor + ' !important; background-color:' + bgColor + ' !important;\'>';
				var highlightEndTag = '</font>';
				/*var replacementhtml = highlightStartTag + selectionhtml + highlightEndTag;*/
        
        var replacementhtml = highlightHtml(selectionhtml, selectiontext, highlightStartTag, highlightEndTag);
        
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