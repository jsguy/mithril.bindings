(function(context){
	/* Set of userful binding-like functionality */
	context.m = context.m || {};

	context.m.set = function(prop, value){
		return function() {
			prop(value);
		}
	};

	/* TODO: Add "binds" functionality as per lhorie example */

}(window));