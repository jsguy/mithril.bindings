var app = {
	model: function(name, email) {
		this.name = m.p(name);
		this.email = m.p(email);
		this.hide = m.p();
	},
	controller: function() {
		window.model = this.user = new app.model("John Doe", "test@example.com");
	},
	view: function(data) {
		var u = data.user;
		return [
			m.e("h1", { text: u.name }),
			m.e("button", { type: "button", toggle: u.hide }, "Toggle hide"),
			m.e("div", { hide: u.hide }, [
				m.e("input", { name: "name", value: u.name }),
				m.e("input", { name: "email", valueInput: u.email }),
				m.e("div", "Name: " + u.name()),
				m.e("div", "Email: " + u.email())
			])
		];
	}
};