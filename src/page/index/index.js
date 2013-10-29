/**
 * @fileoverview Mysite - Index.
 * @author 
 */
/**
 * KISSY.use('mysite/page/index/index',function(S,Index){
 *		new Index();
 * });
 */
KISSY.add('mysite/page/index/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function IndexView(id, cfg) {
		if (this instanceof IndexView) {
			IndexView.superclass.constructor.call(this, id, cfg);

		} else {
			return new IndexView(id,cfg);
		}
	}

	S.extend(IndexView, View, {

		init: function() {
			this.globalData = window.globalData;
			this._initProfile();
			this._bindToCareer();
			this._bindToCompany();
			this._initAlbumShortcut();
			this._bindToToday();
			this._bindToContact();

		},

		_initProfile: function() {
			var ProfileTpl = '<div id="J_profile">' +
								'<img src="' + this.globalData.portrait + '" width="200" height="200" />' +
								'<p><span>' + this.globalData.name + '</span> @ ' + this.globalData.city + '</p>' +
							'</div>';
			NODE.one('body').append(ProfileTpl);
			
			var that = this;

			EVENT.on('.show-profile', 'tap', function(e) {
				that.con.one('#J_indexMask').show();
				that.con.addClass('blur');
				that._showProfile();
			});
			EVENT.on('#J_indexMask', 'tap', function(e) {
				that.con.one('#J_indexMask').hide();
				that.con.removeClass('blur');
				that._hideProfile();
			});
		},
		
		_showProfile: function() {
			NODE.one('#J_profile').show();
		},
		
		_hideProfile: function() {
			NODE.one('#J_profile').hide();
		},

		_bindToCareer: function() {
			EVENT.on('.show-career', 'tap', function(e) {
				location.href = '#!career';
			});
		},
		
		_bindToCompany: function() {
			EVENT.on('.show-company', 'tap', function(e) {
				location.href = '#!company';
			});
		},

		_initAlbumShortcut: function() {
			this._renderAlbumShortcut();
			this._bindAlbumShortcut();
		},

		_renderAlbumShortcut: function() {
			var ele = this.con.one('.show-album'),
				ulInner = '';

			S.each(this.globalData.album, function(item, index) {
				ulInner += '<div class="shortcut-item"><img src="' + item.url + '" width="24"/></div>';
				if (index === 5) {
					return false;
				}
			});
			ele.append('<div class="album-shortcut clearfix">' + ulInner + '</div>');
		},

		_bindAlbumShortcut: function() {
			EVENT.on('.show-album', 'tap', function(e) {
				var ele = NODE.one('.album-shortcut'),
					position = (ele.offset().left + ele.width()/2) + '_' + (ele.offset().top + ele.height()/2);
				location.href = '#!album/' + position;
			});
		},

		_bindToToday: function() {
			EVENT.on('.show-today', 'tap', function(e) {
				location.href = '#!today';
			});
		},
		
		_bindToContact: function() {
			EVENT.on('.show-contact', 'tap', function(e) {
				location.href = '#!contact';
			});
		}

	});

	return IndexView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
