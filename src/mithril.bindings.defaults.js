/* Set of default bindings */
(function(context){
	context.m = context.m || {};
	//	Hide node
	context.m.addBinding("hide", function(prop){
		this.style = {
			display: context.m.unwrap(prop)? "none" : ""
		};
	}, true);

	//	Toggle boolean value on click
	context.m.addBinding('toggle', function(prop){
		this.onclick = function(){
			var value = prop();
			prop(!value);
		}
	}, true);

	//	Set hover states, a'la jQuery pattern
	context.m.addBinding('hover', function(prop){
		this.onmouseover = prop[0];
		if(prop[1]) {
			this.onmouseout = prop[1];
		}
	}, true );
}(window));