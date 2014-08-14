
	//	Custom bindings
	test(function() {
		mock.requestAnimationFrame.$resolve()

		//	Add a custom binding to allow setting the value
		m.customBindings = {
			valueInit: function(node, tag, prop){
				node.value = prop();
				node.onchange = m.withAttr("value", prop);
				return prop();
			}
		};

		var controller;
		var root = mock.document.createElement("div");
		var app = {
			model: function(name) {
		        this.name = m.prop(name);
		    },
			controller: function() {
				app.user = new app.model("John Doe");
			},
			view: function(data) {
	            return m("input", {
	            	name: "name",
	            	//	Bind to a function
	            	valueInit: app.user.name
	            });
	        }
		};

		m.module(root, app)

		mock.requestAnimationFrame.$resolve()


		m.startComputation();
		
		//controller.value = "foo"
		app.user.name("John Smith");

		m.endComputation();
		mock.requestAnimationFrame.$resolve()

		console.log(root.childNodes[0]);
		weewdew(wedewdew);
		return false;//root.childNodes[0].nodeValue === "foo"
	})

