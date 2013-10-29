/**
 * @fileoverview Mysite - Company.
 * @author 
 */
/**
 * KISSY.use('mysite/page/company/index',function(S,Company){
 *		new Company();
 * });
 */
KISSY.add('mysite/page/company/index', function (S, Base, NODE, EVENT, View) {

	"use strict";

	function CompanyView(id, cfg) {
		if (this instanceof CompanyView) {
			CompanyView.superclass.constructor.call(this, id, cfg);

		} else {
			return new CompanyView(id,cfg);
		}
	}

	S.extend(CompanyView, View, {

		init: function() {

		},

	});

	return CompanyView;

}, {
	requires: ['base','node', 'event', 'mysite/util/view/index']
});
