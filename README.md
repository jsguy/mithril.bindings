# mithril.bindings

These bindings differ from the normal mithril bindings in so far as the value binding is bi-directional by default, so if you change the value the model, it will automatically update the bound field, and we have a more rich properties model.

    var app = {
        model: function(name) {
            this.name = m.p(name);
        },
        view: function(c) {
            return [
                m.e("input", { name: "name", value: c.model.name }),
                m.e("div", "Hello " + c.model.name()),
                m.e("button", { onclick: c.setName }, "Set name via model")
            ];
        },
        controller: function() {
            var self = this;
            self.model = new app.model("world");
            self.setName = function() {
                self.model.name("Dave");
            }
        }
    };

## Elements

We have had to add a new elements creation mechanism, as the Mithril core is not flexible enough to be able to override the standard way it creates elements, (which is required to create seamless bi-directional binding), so we use:

    `m.e(...)`

instead of:

    `m(...)`

The usage signature is identical to Mithril's


## Properties

We have added a new property creation mechanism, so we use:

    `m.p(...)`

instead of:

    `m.prop(...)`

The usage signature is identical to the original Mithril `prop` model, with the additional functionality:

### Subscribe

    `m.p(...).subscribe(function)`

This will execute `function` each time the value of the property changes (works with basic values)

### Delay

    `m.p(...).delay(bool)`

This will delay automatic rendering, so that you can manually trigger it using `m.startCmputation` and `m.endComputation`.

### Push on arrays

    `m.p(...).push(value)`

If the underlying property value is an array, you can push values to it.


## Getting started

Simply include `mithril.js` and then `mithril.bindings.js` afterwards

    <script src="mithril.js">
    <script src="mithril.bindings.js">


## Examples

With these bindings you can do things like:

Two-way binding by default:

    m.e("input", { name: "name", value: u.name })

Toggle a boolean attribute on click:

    m.e("button", { type: "button", toggle: u.hide }, "Toggle hide")

Hide an element easily (without manually settings the style attribute):

    m.e("div", { hide: u.hide })

See the /examples directory for more examples!
