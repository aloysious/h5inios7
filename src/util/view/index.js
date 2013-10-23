KISSY.add('mysite/util/view/index', function (S, Base, NODE, EVENT) {

	"use strict";

	function BaseView(id, cfg) {
		if (this instanceof BaseView) {

			this.con = S.one(id);

			BaseView.superclass.constructor.call(this, cfg);
			this.init();

		} else {
			return new BaseView(id,cfg);
		}
	}

	S.extend(BaseView, Base, {

		init: function() {},
		
		show: function() {
			this.con.show();
		},

		hide: function() {
			this.con.hide();
		},

		getCon: function() {
			return this.con;
		},

		slideOut: function(duration) {
			this.con.one('.g-slide-mask').show();
			this.con.one('.g-slide-mask').css({
				'-webkit-transition': 'opacity ' + duration + 'ms cubic-bezier(0.23,1,0.32,1)',
				'opacity': 0.3
			});
		},
		
		slideIn: function(duration) {
			var that = this;
			this.con.one('.g-slide-mask').css({
				'-webkit-transition': 'opacity ' + duration + 'ms cubic-bezier(0.23,1,0.32,1)',
				'opacity': 0
			});
			setTimeout(function() {
				that.con.one('.g-slide-mask').hide();
			}, duration);
		}

	});

	return BaseView;

}, {
	requires: ['base','node', 'event']
});
