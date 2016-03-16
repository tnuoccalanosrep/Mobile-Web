/*
$(document).on('click', 'html', function(e) {
	var nodeName = e.target.localName;
	var parentNodeName = '';
	if(e.target.parentNode != 'undefined'){
		parentNodeName = e.target.parentNode.localName;
	}
	if (!isFunctionNode(nodeName) && !isFunctionNode(parentNodeName)) {
		var nav = $('#nav-bottom')[0];
		if (nav != null) {
			if (nav.style.display == 'none') {
				nav.style.display = 'block';
			} else {
				nav.style.display = 'none';
			}
		}
	}
});
*/

/*
document.getElementsByTagName('html')[0].onclick = function(e) {
	var nodeName = e.target.localName;
	var parentNodeName = e.target.parentNode.localName;
	if ( !isFunctionNode(nodeName) && !isFunctionNode(parentNodeName)) {
		var nav = document.getElementById('nav-bottom');
		if (nav !=null ) {
			if(nav.style.display == 'none'){
				nav.style.display = 'block';
			}
			else {
			nav.style.display = 'none';
			}
		}
	}
};
*/
function isFunctionNode(nodeName){
	if(nodeName != 'a' 
	&& nodeName != 'button'
	&& nodeName != 'input'
	&& nodeName != 'select'){
		return false;
	}
	else{
		return true;
	}
}

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
  
function toggleClass(obj,cls){
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }
}  

function isNotNull(str) {
	return (str != null && str != '' && str != 'undefined');
}
