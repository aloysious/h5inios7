KISSY.add('mysite/util/transition/index', function (S, Base, NODE) {

	"use strict";
	
	return {
		/**
		 * @brief 左右切换过场动画
		 * @param stage    {selector} 主舞台   
		 * @param from     {selector} 切出的page
		 * @param to       {selector} 切入的page
		 * @param dir      {Number}   切换方向，1为左至右，-1为右至左
		 * @param duration {Number}   过场持续时间，单位ms
		 * @param easeFn   {String}   动画时间函数
		 */
		slide: function(stage, from, to, dir, duration, easeFn) {
			var layX = 50,
				isToLeft = dir === -1? true: false,
				fx = isToLeft && (-layX + '%') || 0,
				rx = !isToLeft && (-layX + '%') || 0,
				parent = NODE.one(stage),
				gv1 = 'translate3d(',
				gv2 = ',0)';

			NODE.one(to).show();
			parent.css({'width' : '200%','-webkit-transform' : (gv1 + fx + ',0' + gv2)});
			setTimeout(function() {
				parent.css({
					'-webkit-transition': '-webkit-transform ' + duration + 'ms ' + easeFn,
					'-webkit-transform': (gv1 + rx + ',0' + gv2)
				});
			}, 10);

			if (!isToLeft) {
				this._darken(from, 0.7, duration, easeFn);
			} else {
				this._brighten(to, 1, duration, easeFn);
			}
			
			setTimeout(function() {
				parent.css({'width':'','-webkit-transition': '','-webkit-transform':''});
				NODE.one(from).hide();
			}, duration + 10);
		},

		/**
		 * @brief 使page变暗
		 * @param selector {selector} 需要处理的page
		 * @param val      {Number}   亮度值，1最亮，0最暗
		 * @param duration {Number}   变暗持续时间
		 * @param easeFn   {String}   动画时间函数
		 *
		 */
		_darken: function(selector, val, duration, easeFn) {
			var con = NODE.one(selector),
				opacity = 1 - val;

			if (!con.one('.g-darken-mask')) {
				con.append('<div class="g-darken-mask"></div>');
			}
			
			con.one('.g-darken-mask').show();
			con.one('.g-darken-mask').css({
				'-webkit-transition': 'opacity ' + duration + 'ms ' + easeFn
			});
			setTimeout(function() {
				con.one('.g-darken-mask').css({
					'opacity': opacity
				});
			}, 10);
		},

		/**
		 * @brief 使page变亮
		 * @param selector {selector} 需要处理的page
		 * @param val      {Number}   亮度值，1最亮，0最暗
		 * @param duration {Number}   变亮持续时间
		 * @param easeFn   {String}   动画时间函数
		 *
		 */
		_brighten: function(selector, val, duration, easeFn) {
			var con = NODE.one(selector),
				opacity = 1 - val;

			if (!con.one('.g-darken-mask')) {
				con.append('<div class="g-darken-mask"></div>');
			}
			
			con.one('.g-darken-mask').css({
				'-webkit-transition': 'opacity ' + duration + 'ms ' + easeFn
			});
			setTimeout(function() {
				con.one('.g-darken-mask').css({
					'opacity': opacity
				});
			}, 10);
			setTimeout(function() {
				con.one('.g-darken-mask').hide();
			}, duration + 10);
		},

		cover: function(from, to, isFromUp, offset, duration, easeFn) {
			var tmp = to;
			to = isFromUp? from: to;
			from = isFromUp? tmp: from;
			
			NODE.one(to).css({
				'position': 'absolute',
				'top': 0,
				'left': (isFromUp? 0: '100%'),
				'-webkit-transform': 'translate3d(0,0,0)'
			});
			NODE.one(from).css({
				'-webkit-transform': 'translate3d(' + (isFromUp? ('-' + offset + 'px'): 0)+ ',0,0)'
			});

			if (!isFromUp) {
				NODE.one(to).show();
			} else {
				NODE.one(from).show();
			}
			
			setTimeout(function() {
				NODE.one(to).css({
					'-webkit-transition': '-webkit-transform ' + duration + 'ms ' + easeFn,
					'-webkit-transform': 'translate3d(' + (isFromUp? '': '-') +'100%,0,0)',
				});
				NODE.one(from).css({
					'-webkit-transition': '-webkit-transform ' + duration + 'ms ' + easeFn,
					'-webkit-transform': 'translate3d(' + (isFromUp? 0: ('-' + offset + 'px')) + ',0,0)',
				});
			}, 10);
		
			if (!isFromUp) {
				this._darken(from, 0.7, duration, easeFn);
			} else {
				this._brighten(from, 1, duration, easeFn);
			}
			
			setTimeout(function() {
				NODE.one(to).css({
					'position': 'relative',
					'left': 0,
					'-webkit-transition': '',
					'-webkit-transform': ''
				});
				NODE.one(from).css({
					'-webkit-transition': '',
					'-webkit-transform': ''
				});

				if (!isFromUp) {
					NODE.one(from).hide();
				} else {
					NODE.one(to).hide();
				}
			}, duration + 10);
		},

		/**
		 * @brief 缩放过场动画
		 * @param from     {selector} 切出的page
		 * @param to       {selector} 切入的page
		 * @param isExpansion {Number}   放大或缩小，true为放大，false为缩小
		 * @param origin   {Object}   缩放的基准点{x, y}
		 * @param duration {Number}   过场持续时间，单位ms
		 * @param easeFn   {String}   动画时间函数
		 */
		zoom: function(from, to, isExpansion, origin, duration, easeFn) {
			var tmp = to;
			to = !isExpansion? from: to;
			from = !isExpansion? tmp: from;
		
			NODE.one(to).css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'-webkit-transform': 'scale(' + (isExpansion? '0, 0': '1, 1') + ')',
				'z-index': isExpansion? 9999: -1
			});
			NODE.one(from).css({
				'-webkit-transform': 'scale(' + (isExpansion? '1, 1': '2, 2') + ')',
				'opacity': (isExpansion? 1: 0)
			});

			if (isExpansion) {
				NODE.one(to).show();
			} else {
				NODE.one(from).show();
			}

			setTimeout(function() {
				NODE.one(to).css({
					'-webkit-transition': '-webkit-transform ' + duration + 'ms ' + easeFn,
					'-webkit-transform': 'scale(' + (isExpansion? '1, 1': '0, 0') + ')',
					'-webkit-transform-origin': origin.x + 'px ' + origin.y + 'px',
				});
				NODE.one(from).css({
					'-webkit-transition': '-webkit-transform ' + duration + 'ms,' + (duration + 350) + 'ms ' + easeFn,
					'-webkit-transform': 'scale(' + (isExpansion? '2, 2': '1, 1') + ')',
					'-webkit-transform-origin': origin.x + 'px ' + origin.y + 'px',
					'opacity': (isExpansion? 0: 1)
				});
			}, 10);

			setTimeout(function() {
				NODE.one(to).css({
					'position': 'relative',
					'-webkit-transition': '',
					'-webkit-transform': '',
					'z-index': 0
				});
				NODE.one(from).css({
					'opacity': 1,
					'-webkit-transition': '',
					'-webkit-transform': ''
				});

				if (isExpansion) {
					NODE.one(from).hide();
				} else {
					NODE.one(to).hide();
				}
			}, duration + 100);
		}
	};

}, {
	requires: ['base','node']
});
