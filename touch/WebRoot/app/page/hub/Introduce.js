Ext.define('Hotel.page.hub.Introduce', {
	extend: 'Ext.Container',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.hub.introduce',
	config: {
		fullscreen: true,// 设置全屏
		layout: 'vbox',
		scrollable: {
			direction: 'vertical'// 设置允许垂直滚动
		},
		items: [{
			html: '<p>    <br/></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;有间酒店是<a target="_blank" href="http://baike.baidu.com/view/2091450.htm" style="text-decoration: none; color: rgb(19, 110, 194);">有间酒店集团</a>旗下3大品牌之一，是温馨舒适的商旅型<a target="_blank" href="http://baike.baidu.com/view/2084014.htm" style="text-decoration: none; color: rgb(19, 110, 194);">连锁酒店</a>品牌，通过标准化、简洁、舒适的酒店住宿服务，使大众商务以及休闲旅行宾客收获温馨、便捷的住宿体验。</p><p>    &nbsp;&nbsp;&nbsp;&nbsp;有间酒店是国内商务酒店品牌中规模最大的品牌，在全国300个城市拥有近2000家酒店。有间酒店多年获得中国金枕头奖“中国最佳经济型连锁酒店品牌”殊荣。2014年，有间酒店以4.2亿美元的品牌价值入选中国品牌100强，居酒店行业之首。</p><p>    <strong>品牌灵魂</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;作为有间品牌文化的精髓,有间的品牌灵魂是:工作与旅途中可信任的“家”</p><p>    <strong>愿景</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;使有间酒店集团成为全球酒店行业前三甲的酒店管理企业。</p><p>    <strong>价值观</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;诚信尊重尽责进取合作</p><p>    <strong>诚信</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;诚实和守信,这是我们做所有事情的前提。</p><p>    <strong>尊重</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;对顾客始终表现出我们在乎。同时始终真实和平等地对待每位员工、合作伙伴以及他们的劳动成果。</p><p>    <strong>尽责</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;承担起对工作,对周围人的责任,做到最好。</p><p>    <strong>进取</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;不好高骛远,但保持持续的创新和进取心,不断超越自我。</p><p>    <strong>合作</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;包括主动和正确地与有间人、有间的团队、有间的合作伙伴的合作,获得双赢的结果。</p><p>    <strong>品牌承诺</strong></p><p>    &nbsp;&nbsp;&nbsp;&nbsp;始终用心了解大众多元的旅行住宿需求和未来趋势,并专心为我们的宾客提供旅行中的“家”。</p><p>   </p><p>    </p><p>    <br/></p>'
		}]
	}
});
