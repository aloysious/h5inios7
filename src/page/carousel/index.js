/**
 * @fileoverview Mysite - Carousel.
 * @author 
 */
/**
 * KISSY.use('mysite/page/carousel/index',function(S,Carousel){
 *		new Carousel();
 * });
 */
KISSY.add('mysite/page/carousel/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function CarouselView(id, cfg) {
		if (this instanceof CarouselView) {
			CarouselView.superclass.constructor.call(this, id, cfg);

		} else {
			return new CarouselView(id,cfg);
		}
	}

	CarouselView.ATTRS = {
		currIndex: {
			value: null
		}	
	};

	S.extend(CarouselView, View, {

		init: function() {
			this.album = window.globalData.album;
			this.currIndex = null;
			this.sync(this.get('currIndex'));
			this._bind();
		},
		
		sync: function(index) {
			var titleEle = this.con.one('.g-mid'),
				contentEle = this.con.one('.curr-wrapper'),
				total = this.album.length;

			index = parseInt(index);
			this.currIndex = index;

			titleEle.html((index + 1) + ' / ' + total);
			contentEle.html('<img src="' + this.album[index].url + '"/>');
		},

		_bind: function() {}

	});

	return CarouselView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
