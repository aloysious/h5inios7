/**
 * @fileoverview Mysite - Career.
 * @author 
 */
/**
 * KISSY.use('mysite/page/career/index',function(S,Index){
 *		new Index();
 * });
 */
KISSY.add('mysite/page/career/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function CareerView(id, cfg) {
		if (this instanceof CareerView) {
			CareerView.superclass.constructor.call(this, id, cfg);

		} else {
			return new CareerView(id,cfg);
		}
	}

	S.extend(CareerView, View, {

		init: function() {

		},

	});

	return CareerView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
