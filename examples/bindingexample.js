var app = {
	model: function(name) {
		this.name = m.p(name);
		this.hide = m.p();
	},
	controller: function() {
		window.model = this.user = new app.model("John Doe");
	},
	view: function(data) {
		var u = data.user;
		return [
			m.e("h1", { text: u.name }),
			m.e("button", { type: "button", toggle: u.hide }, "Toggle hide"),
			m.e("div", { hide: u.hide }, [
				m.e("input", { name: "name", value: u.name }),
				m.e("div", "Model name value: " + u.name())
			])
		];
	}
};