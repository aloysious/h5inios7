/**
 * @fileoverview Mysite - Album.
 * @author 
 */
/**
 * KISSY.use('mysite/page/album/index',function(S,Album){
 *		new Album();
 * });
 */
KISSY.add('mysite/page/album/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function AlbumView(id, cfg) {
		if (this instanceof AlbumView) {
			AlbumView.superclass.constructor.call(this, id, cfg);

		} else {
			return new AlbumView(id,cfg);
		}
	}

	S.extend(AlbumView, View, {

		init: function() {
			this.album = window.globalData.album;
			this._render();
			this._bind();
		},

		_render: function() {
			var ele = this.con.one('.content'),
				contentInner = '';
			S.each(this.album, function(item, index) {
				contentInner += '<div class="album-thumb" data-index="' + index + '"><img src="' + item.url + '"/></div>';
			});
			ele.append(contentInner);
		},

		_bind: function() {
			EVENT.on('.album-thumb', 'tap', function(e) {
				var ele = NODE.one(e.currentTarget),
					position = (ele.offset().left + ele.width()/2) + '_' + (ele.offset().top + ele.height()/2),
					index = ele.attr('data-index');
				location.href = '#!carousel/' + position + '_' + index;
			});
		}

	});

	return AlbumView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
