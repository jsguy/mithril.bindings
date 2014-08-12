//	Mithril bindings.
//	Copyright (C) 2014 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(context){
	context.m = context.m || {};

	//	Pub/Sub extended properties
	context.m.p = function(value) {
		var self = this,
			subs = [],
			prevValue,
			delay = false,
			//  Send notifications to subscribers
			notify = function (value) {
				var i;
				for (i = 0; i < subs.length; i += 1) {
					subs[i].func.apply(subs[i].context, [value]);
				}
			};
			prop = function() {
				if (arguments.length) {
					value = arguments[0];
					if (prevValue !== value) {
						prevValue = value;
						notify(value);
					}
				}
				return value;
			};

		prop.toJSON = function() {
			return value;
		}

		prop.subscribe = function (func, context) {
			subs.push({ func: func, context: context || self });
			return prop;
		};

		prop.delay = function(value){
			delay = !!value;
			return prop;
		};

		//	Automatically update when a value changes
		//	As mithril waits for a request animation frame, this should be ok.
		//	You can use .delay(true) to be able to amnually handle updates
		prop.subscribe(function(val){
			if(!delay) {
				m.startComputation();
				m.endComputation();
			}
			return prop;
		});

		return prop;
	};

	//	Add bindings
	context.m.addBinding = function(name, func){
		context.m.bindings = context.m.bindings || {};
		context.m.bindings[name] = func;		
	};

	//	Useful bindings
	//	Note: Always return prop() so we can chain calls.

	//	Bi-directional value binding
	//	TODO: events - input, keyup, keypress, afterkeydown
	context.m.addBinding('value', function(node, tag, prop){
		node.value = prop();
		node.onchange = m.withAttr("value", prop);
		return prop();
	});

	//	Set the text of a node
	context.m.addBinding('text', function(node, tag, prop){
		var value = prop();
        value = (value === null || value === undefined)? "": value;
        //	Ensure we have just one text child node
        var c = node.childNodes[0];
        if(!c || c.nodeType != 1 || node.childNodes.length > 1) {
        	var txt = context.document.createElement("TEXT");
        	//	Remove all child nodes
			while (node.firstChild) {
			    node.removeChild(node.firstChild);
			}
			node.appendChild(txt);
        	c = txt;
        }
        c.innerHTML = value;
		return prop();
	});


	//	Hide node
	context.m.addBinding('hide', function(node, tag, prop){
		var value = prop(),
        	isVisible = node.style.display !== "none";
        if (!value && !isVisible) {
            node.style.display = "";
        } else if ((value) && isVisible) {
            node.style.display = "none";
		}

		return prop();
	});


	//	Toggle boolean value on click
	context.m.addBinding('toggle', function(node, tag, prop){
		node.onclick = function(){
			var value = prop();
			prop(!value);
		}

		return prop();
	});



	// context.m.bind('txt', function(node, tag, prop){
	// 	node.value = prop();
	// 	node.onchange = m.withAttr("value", prop);
	// 	return prop();
	// });

}(window));