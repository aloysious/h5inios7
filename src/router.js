KISSY.add('mysite/router', function (
			S, 
			Base, 
			NODE,
			Anim,
			Backbone,
			Transition,
			IndexView,
			CareerView,
			AlbumView,
			CarouselView,
			TodayView
	) {

	"use strict";
	
	var Router = Backbone.Router.extend({
		initialize: function() {
			this.stageEle = '#J_stage';
			this.indexEle = '#J_index';
			this.careerEle = '#J_career';
			this.albumEle = '#J_album';
			this.carouselEle = '#J_carousel';
			this.todayEle = '#J_today';
			this.currEle = null;
			this.isFirstLoad = true;
		},

		routes: {
			'': '_index',
			'!career': '_career',
			'!album/:position': '_album',
			'!carousel/:param': '_carousel',
			'!today': '_today'
		},
		
		_deploy: function(first) {
			var second = [].slice.call(arguments, 1);

			S.each(second, function(item) {
				NODE.one(item).hide();
			});
			NODE.one(first).show();
			this.isFirstLoad = null;
		},

		_index: function() {
			this.indexView = this.indexView || new IndexView(this.indexEle);
		
			if (this.isFirstLoad) {
				this._deploy(this.indexEle, this.careerEle);
			} else if (this.currEle === this.careerEle) {
				Transition.carousel(this.indexEle, this.currEle, false, 650, 'cubic-bezier(0.23,1,0.32,1)');
				//Transition.cover(this.currEle, this.indexEle, true, 50, 650, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.albumEle) {
				Transition.zoom(this.currEle, this.indexEle, false, this.toAlbumOrigin, 400, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.todayEle) {
				Transition.cover(this.indexEle, this.currEle, false, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.indexEle;
		},

		_career: function() {
			this.careerView = this.careerView || new CareerView(this.careerEle);

			if (this.isFirstLoad) {
				this._deploy(this.careerEle, this.indexEle);
			} else {
				//Transition.carousel(this.indexEle, this.careerEle, true, 650, 'cubic-bezier(0.23,1,0.32,1)');
				//Transition.cover(this.indexEle, this.careerEle, false, 50, 650, 'cubic-bezier(0.23,1,0.32,1)');
				Transition.rotate(this.indexEle, this.careerEle, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.careerEle;
		},

		_album: function(position) {
			this.albumView = this.albumView || new AlbumView(this.albumEle);
			
			var tmpPos = position.split('_');
			this.toAlbumOrigin = {
				x: tmpPos[0],
				y: tmpPos[1]
			};
			if (this.isFirstLoad) {
				this._deploy(this.albumEle, this.indexEle, this.carouselEle);
			} else if (this.currEle === this.indexEle) {
				Transition.zoom(this.currEle, this.albumEle, true, this.toAlbumOrigin, 450, 'cubic-bezier(0.19,1.25,0.42,1.02)');
			} else if (this.currEle === this.carouselEle) {
				Transition.zoom(this.currEle, this.albumEle, false, this.toCarouselOrigin, 400, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.albumEle;
		},

		_carousel: function(param) {
			var tmpPar = param.split('_'),
				photoIndex;
			this.toCarouselOrigin = {
				x: tmpPar[0],
				y: tmpPar[1]
			};
			photoIndex = tmpPar[2];

			if (!this.carouselView) {
				this.carouselView = new CarouselView(this.carouselEle, {currIndex: photoIndex});
			} else {
				this.carouselView.sync(photoIndex);
			}
			
			if (this.isFirstLoad) {
				this._deploy(this.carouselEle, this.albumEle);
			} else {
				Transition.zoom(this.albumEle, this.carouselEle, true, this.toCarouselOrigin, 450, 'cubic-bezier(0.19,1.25,0.42,1.02)');
			}
			this.currEle = this.carouselEle;
		},
		
		_today: function() {
			this.todayView = this.todayView || new TodayView(this.todayEle);

			if (this.isFirstLoad) {
				this._deploy(this.todayEle, this.indexEle);
			} else {
				Transition.cover(this.indexEle, this.todayEle, true, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.todayEle;
		},

		start : function(){
			Backbone.history.start();
		}
	});

	return Router;

}, {
	requires: [
		'base',
		'node', 
		'anim',
		'mysite/lib/backbone/1.1/backbone',
		'mysite/util/pagetransition/1.0/index',
		'mysite/page/index/index',
		'mysite/page/career/index',
		'mysite/page/album/index',
		'mysite/page/carousel/index',
		'mysite/page/today/index'
	]
});
