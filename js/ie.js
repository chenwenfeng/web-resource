for(var i=0; i<document.links.length; i++) {
   document.links[i].onfocus = function() {this.blur();};
}