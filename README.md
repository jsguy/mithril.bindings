mithril.bindings
================

Custom bindings for mithril

With these custum bindings you can do things like:

Two-way bindings by default (this can be customised):

    m("input", { name: "name", value: u.name }),

Set the text for a node:

    m("h1", { text: u.name })

Toggle a boolean attribute on click:

    m("button", { type: "button", toggle: u.hide }, "Toggle hide")

Hide an element easily:

    m("div", { hide: u.hide })

