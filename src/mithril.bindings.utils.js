(function(context){
	/* Set of userful binding-like functionality */
	context.m = context.m || {};

	context.m.set = function(prop, value){
		return function() {
			prop(value);
		}
	};

	/* TODO: Add "binds" functionality as per lhorie example */




	//	Return a function that can trigger a binding
	//	Use might be: onclick: m.trigger('binding', prop)
	m.trigger = function(){
		var args = Array.prototype.slice.call(arguments);
		return function(){
			var name = args[0],
				argList = args.slice(1);
			if (m.bindings[name]) {
				m.bindings[name].func.apply(this, argList);
			}
		}
	}



}(window));