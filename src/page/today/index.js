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
			var that = this;

			setTimeout(function() {
				that._saveDatesOriginalPos();
			}, 0);

			//NODE.one(window).on('touchmove', function() {
			//	that._fixDates();
			//});
		},

		_saveDatesOriginalPos: function() {
			var dtList = this.con.all('dt');
			S.each(dtList, function(ele) {
				ele = NODE.one(ele);
				ele.attr('data-top', ele.offset().top);
			});
		},

		_fixDates: function() {
			var dtList = this.con.all('dt');
			S.each(dtList, function(ele) {
				ele = NODE.one(ele);
				if (ele.attr('data-top') <= NODE.one(window).scrollTop()) {
					ele.css({
						'position': 'fixed',
						'top': 0,
						'left': 0
					});
					ele.siblings('.dt-replace').show();
				} else {
					ele.css({
						'position': 'static'
					});
					ele.siblings('.dt-replace').hide();
				}
			});
		},

	});

	return TodayView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
