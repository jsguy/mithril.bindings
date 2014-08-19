mithril.bindings
================

With these custom bindings you can do things like:

Two-way bindings by default (this can be customised):

    m.e("input", { name: "name", value: u.name }),

Toggle a boolean attribute on click:

    m.e("button", { type: "button", toggle: u.hide }, "Toggle hide")

Hide an element easily:

    m.e("div", { hide: u.hide })
