var app = {
	model: function(name) {
		this.name = m.p(name);
	},
	view: function(data) {
		var c = data.state;
		return [
			m.e("input", { name: "name", value: c.model.name }),
			m.e("div", "Hello " + c.model.name()),
			m.e("button", { onclick: c.setName }, "Set name via model")
		];
	},
	oninit: function() {
		var self = this;
		self.model = new app.model("world");
		self.setName = function() {
			self.model.name("Dave");
		}
	}
};