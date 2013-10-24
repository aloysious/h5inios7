/**
 * @fileoverview Mysite - Today.
 * @author 
 */
/**
 * KISSY.use('mysite/page/today/index',function(S,Today){
 *		new Today();
 * });
 */
KISSY.add('mysite/page/today/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function TodayView(id, cfg) {
		if (this instanceof TodayView) {
			TodayView.superclass.constructor.call(this, id, cfg);

		} else {
			return new TodayView(id,cfg);
		}
	}

	S.extend(TodayView, View, {

		init: function() {

		},

	});

	return TodayView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
