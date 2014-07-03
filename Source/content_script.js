
var gendered = {
	'he': ['he', 'she'],
	'she': ['he', 'she'],
	'his': ['his', 'hers'],
	'hers': ['his', 'hers']
};


// from http://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr
String.prototype.regexIndexOf = function(regex, startpos) {
    var match = regex.exec(this.substring(startpos || 0));
    console.log(match);
    if(!match) {
    	return {
    		index: -1,
    		match: null
    	};
    }
    return {
    	match: match[0],
    	index: match.index + (startpos || 0)
    };
}

// taken from https://github.com/panicsteve/cloud-to-butt mostly
walk(document.body);

function walk(node)  {
	// taken from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

	// match any of the keys from the gendered object
	var rgx = new RegExp('(' + Object.keys(gendered).map(function(k) { return '\\b' + k + '\\b' }).join('|') + ')');
	
	var match = v.regexIndexOf(rgx);
	while ( match.index > -1 ) {
		var replacements = gendered[match.match]
		var randomReplacement = replacements[Math.floor(Math.random()*replacements.length)];
		v = v.substr(0, match.index) + v.substr(match.index).replace(rgx, randomReplacement);
		match = v.regexIndexOf(rgx, match.index + randomReplacement.length);
	}	
	textNode.nodeValue = v;
}


