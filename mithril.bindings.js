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


	//	TODO: Add binds from: http://lhorie.github.io/mithril-blog/asymmetrical-data-bindings.html
	
	//	Key difference: you choose what event it binds on.

	/*
//data binding helper function
function binds(data) {
  return {onchange: function(e) {
    data[e.target.name] = e.target.value;
  }};
};

m("form", binds(ctrl.user), [
    m("input[name=first]", {value: ctrl.user.first}),
    m("input[name=last]", {value: ctrl.user.last}),
    m("input[name=email]", {value: ctrl.user.email}),
    m("button", {onclick: ctrl.submit})
]);
	*/



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
        //	Ensure we have one text child node only
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

}(window));