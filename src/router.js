KISSY.add('mysite/router', function (
			S, 
			Base, 
			NODE,
			Anim,
			Backbone,
			Transition,
			IndexView,
			CareerView,
			CompanyView,
			AlbumView,
			CarouselView,
			TodayView,
			ContactView
	) {

	"use strict";
	
	var Router = Backbone.Router.extend({
		initialize: function() {
			this.stageEle = '#J_stage';
			this.indexEle = '#J_index';
			this.careerEle = '#J_career';
			this.companyEle = '#J_company';
			this.albumEle = '#J_album';
			this.carouselEle = '#J_carousel';
			this.todayEle = '#J_today';
			this.contactEle = '#J_contact';
			this.currEle = null;
			this.isFirstLoad = true;
		},

		routes: {
			'': '_index',
			'!career': '_career',
			'!company': '_company',
			'!album/:position': '_album',
			'!carousel/:param': '_carousel',
			'!today': '_today',
			'!contact': '_contact'
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
				//Transition.rotate(this.currEle, this.indexEle, 650, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.companyEle) {
				Transition.cover(this.indexEle, this.currEle, false, 650, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.albumEle) {
				Transition.popup(this.currEle, this.indexEle, false, this.toAlbumOrigin, 400, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.todayEle) {
				Transition.rotate(this.currEle, this.indexEle, 650, 'cubic-bezier(0.23,1,0.32,1)');
			} else if (this.currEle === this.contactEle) {
				Transition.scaleSwitch(this.indexEle, this.currEle, false, 1300, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.indexEle;
		},

		_career: function() {
			this.careerView = this.careerView || new CareerView(this.careerEle);

			if (this.isFirstLoad) {
				this._deploy(this.careerEle, this.indexEle);
			} else {
				Transition.carousel(this.indexEle, this.careerEle, true, 650, 'cubic-bezier(0.23,1,0.32,1)');
				//Transition.cover(this.indexEle, this.careerEle, false, 50, 650, 'cubic-bezier(0.23,1,0.32,1)');
				//Transition.rotate(this.indexEle, this.careerEle, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.careerEle;
		},
		
		_company: function() {
			this.companyView = this.companyView || new CompanyView(this.companyEle);

			console.log('_company');

			if (this.isFirstLoad) {
				this._deploy(this.companyEle, this.indexEle);
			} else {
				Transition.cover(this.indexEle, this.companyEle, true, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.companyEle;
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
				Transition.popup(this.currEle, this.albumEle, true, this.toAlbumOrigin, 450, 'cubic-bezier(0.19,1.25,0.42,1.02)');
			} else if (this.currEle === this.carouselEle) {
				Transition.popup(this.currEle, this.albumEle, false, this.toCarouselOrigin, 400, 'cubic-bezier(0.23,1,0.32,1)');
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
				Transition.popup(this.albumEle, this.carouselEle, true, this.toCarouselOrigin, 450, 'cubic-bezier(0.19,1.25,0.42,1.02)');
			}
			this.currEle = this.carouselEle;
		},
		
		_today: function() {
			this.todayView = this.todayView || new TodayView(this.todayEle);

			if (this.isFirstLoad) {
				this._deploy(this.todayEle, this.indexEle);
			} else {
				Transition.rotate(this.indexEle, this.todayEle, 650, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.todayEle;
		},
		
		_contact: function() {
			this.contactView = this.contactView || new ContactView(this.contactEle);

			if (this.isFirstLoad) {
				this._deploy(this.contactEle, this.indexEle);
			} else {
				Transition.scaleSwitch(this.indexEle, this.contactEle, true, 1300, 'cubic-bezier(0.23,1,0.32,1)');
			}
			this.currEle = this.contactEle;
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
		'mysite/page/company/index',
		'mysite/page/album/index',
		'mysite/page/carousel/index',
		'mysite/page/today/index',
		'mysite/page/contact/index'
	]
});
