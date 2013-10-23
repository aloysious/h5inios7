
/*
 * http://g.tbcdn.cn/playground/mysite/1.0.0/config.js
 **/
(function(){
	if (KISSY.Config.debug) {
		var srcPath = "./";
		KISSY.config({
			packages:[
				{
					name:"mysite",
					path:srcPath,
					charset:"utf-8",
					ignorePackageNameInUri:true,
					debug:true
				}
			]
		});
	} else {
		KISSY.config({
			packages: [
				{
					name: 'mysite',
					// 发布到线上时需要带上版本号
					path: 'http://g.tbcdn.cn/playground/mysite/1.0.0',
					ignorePackageNameInUri: true
				}
			]
		});
	}
})();
