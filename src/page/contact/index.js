/**
 * @fileoverview Mysite - Contact.
 * @author 
 */
/**
 * KISSY.use('mysite/page/contact/index',function(S,Contact){
 *		new Contact();
 * });
 */
KISSY.add('mysite/page/contact/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function ContactView(id, cfg) {
		if (this instanceof ContactView) {
			ContactView.superclass.constructor.call(this, id, cfg);

		} else {
			return new ContactView(id,cfg);
		}
	}

	S.extend(ContactView, View, {

		init: function() {

		},

	});

	return ContactView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
