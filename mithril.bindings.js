//	Mithril bindings.
//	Copyright (C) 2014 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(context){
	context.m = context.m || {};

	//	Pub/Sub based extended properties
	context.m.p = function(value) {
		var self = this,
			subs = [],
			prevValue,
			delay = false,
			//  Send notifications to subscribers
			notify = function (value, prevValue) {
				var i;
				for (i = 0; i < subs.length; i += 1) {
					subs[i].func.apply(subs[i].context, [value, prevValue]);
				}
			},
			prop = function() {
				if (arguments.length) {
					value = arguments[0];
					if (prevValue !== value) {
						notify(value, prevValue);
						prevValue = value;
					}
				}
				return value;
			};

		prop.toJSON = function() {
			return value;
		}

		//	Allow push on arrays
		prop.push = function(val) {
			if(value.push && value.length) {
				value.push(val);
			}
			prop(value);
		}

		//	Allow subscription for when the value changes
		//	func gets two parameters: value and prevValue
		prop.subscribe = function (func, context) {
			subs.push({ func: func, context: context || self });
			return prop;
		};

		//	Allow property to not automatically render
		prop.delay = function(value) {
			delay = !!value;
			return prop;
		};

		//	Automatically update when a value changes
		//	As mithril waits for a request animation frame, this should be ok.
		//	You can use .delay(true) to be able to manually handle updates
		prop.subscribe(function(val){
			if(!delay) {
				m.startComputation();
				m.endComputation();
			}
			return prop;
		});

		return prop;
	};

	context.m.e = function(element, attrs, children) {
	    for (var attrName in attrs) {
	        if (m.bindings[attrName]) {
	        	m.bindings[attrName].apply(attrs, [attrs[attrName]]);
	        }
	    }
	    return m(element, attrs, children);
	};


	//	Add bindings
	context.m.addBinding = function(name, func){
		context.m.bindings = context.m.bindings || {};
		context.m.bindings[name] = func;
	};

	context.m.unwrap = function(prop) {
		return (typeof prop == "function")? prop(): prop;
    };

    //	Bi-directional binding of value
	context.m.addBinding("value", function(prop) {
        if (typeof prop == "function") {
            this.value = prop();
            this.onchange = m.withAttr("value", prop);
        } else {
        	this.value = prop;
        }
    });

	//	Hide node
	context.m.addBinding("hide", function(prop){
		this.style = {display: context.m.unwrap(prop)? "none" : ""};
	});


	//	Toggle boolean value on click
	context.m.addBinding('toggle', function(prop){
		this.onclick = function(){
			var value = prop();
			prop(!value);
		}
	});

}(window));