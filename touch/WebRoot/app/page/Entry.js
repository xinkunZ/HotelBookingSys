Ext.define('Hotel.page.Entry', {
	extend: 'Ext.Container',
	requires: ['Hotel.page.Home',//
	'Hotel.page.Regist', //
	'Hotel.page.cmp.Menu',//
	'Hotel.page.hub.Category',//
	'Hotel.page.hub.Introduce',//
	'Hotel.page.hub.QueryRoom',//
	'Hotel.page.hub.LinkWay',//
	'Hotel.page.user.EditPassword',//
	'Hotel.page.user.MySubscription',//
	'Hotel.page.user.NewSubscription',//
	'Hotel.page.user.ViewSubscription',//
	'Hotel.page.user.UserInfo'],
	alias: 'widget.page.Entry',
	me: {},
	entry: {},
	config: {
		layout: {
			type: "card"
		},
		fullscreen: true,// 设置全屏
		id: 'entry',
		itemId: 'entry',
		items: [{
			xtype: 'titlebar',
			itemId: 'titlebar',
			docked: 'top',
			title: '有间酒店',
			items: [{
				align: 'right',
				iconCls: 'home',
				iconMask: true,
				itemId: 'homeBtn'
			}, {
				align: 'left',
				iconCls: 'user',
				iconMask: true,
				itemId: 'userBtn'
			}]
		}, {
			xtype: 'page.Home',
			itemId: 'home',
			id: 'home'
		}, {
			xtype: 'hub.categoty',
			itemId: 'hubCategoty',
			id: 'hubCategoty'
		}, {
			xtype: 'hub.introduce',
			itemId: 'hubIntroduce',
			id: 'hubIntroduce'
		}, {
			xtype: 'hub.queryroom',
			itemId: 'hubQueryroom',
			id: 'hubQueryroom'
		}, {
			xtype: 'hub.linkway',
			itemId: 'linkWay',
			id: 'linkWay'
		}, {
			xtype: 'page.Regist',
			itemId: 'regist',
			id: 'regist'
		}, {
			xtype: 'user.userinfo',
			itemId: 'userInfo',
			id: 'userInfo'
		}, {
			xtype: 'user.newSubscription',
			itemId: 'newSubscription',
			id: 'newSubscription'
		}, {
			xtype: 'user.mySubscription',
			itemId: 'mySubscription',
			id: 'mySubscription'
		}, {
			xtype: 'user.EditPassword',
			itemId: 'editPassword',
			id: 'editPassword'
		}, {
			xtype: 'user.viewSubscription',
			itemId: 'viewSubscription',
			id: 'viewSubscription'
		}]
	},

	initialize: function() {
		var me = this;
		me.createEventHandlers();
		me.callParent();
	},

	createEventHandlers: function() {
		var me = this;
		// me.down('#testBtn').on('tap', function() {
		// me.showCategory();// TODO
		// });

		me.down('#homeBtn').on('tap', function() {
			me.showHome();
		});

		me.down('#userBtn').on('tap', function() {
			if (me.HomeSwipe == false) {
				// var alertBox = Ext.create('Ext.MessageBox');
				Ext.Msg.alert('提示', '您需要先登录哦，亲！', Ext.emptyFn);
			} else {
				me.showMenu();
			}
		});

		Ext.get('home').on('swipe', me.onViewSwipe, me);
		Ext.get('userInfo').on('swipe', me.onViewSwipe, me);
		Ext.get('editPassword').on('swipe', me.onViewSwipe, me);
		Ext.get('mySubscription').on('swipe', me.onViewSwipe, me);
		Ext.get('newSubscription').on('swipe', me.onViewSwipe, me);
		Ext.get('viewSubscription').on('swipe', me.onViewSwipe, me);

		Ext.get('hubIntroduce').on('swipe', function(e, target, options, eOpts) {
			if (e.direction == 'right' && e.distance >= 20) {
				me.showHome();
			}
		}, me);
		Ext.get('hubQueryroom').on('swipe', function(e, target, options, eOpts) {
			if (e.direction == 'right' && e.distance >= 20) {
				me.showHome();
			}
		}, me);
		Ext.get('hubCategoty').on('swipe', function(e, target, options, eOpts) {
			if (e.direction == 'right' && e.distance >= 20) {
				me.showHome();
			}
		}, me);
		Ext.get('linkWay').on('swipe', function(e, target, options, eOpts) {
			if (e.direction == 'right' && e.distance >= 20) {
				me.showHome();
			}
		}, me);
	},

	// 首页的hub中心
	showIntroduce: function() {
		var me = this;
		me.animateActiveItem('#hubIntroduce', {
			type: "slide",
			direction: "left"
		});

	},

	showCategory: function() {
		var me = this;
		me.animateActiveItem('#hubCategoty', {
			type: "slide",
			direction: "left"
		});
	},

	showQueryroom: function() {
		var me = this;
		me.animateActiveItem('#hubQueryroom', {
			type: "slide",
			direction: "left"
		});
	},

	showLinkway: function() {
		var me = this;
		me.animateActiveItem('#linkWay', {
			type: "slide",
			direction: "left"
		});
	},

	HomeSwipe: false,

	// 用于在登录成功后主页加上手势呼出菜单
	setHomeSwipe: function(value) {
		// var me = this;
		// Ext.get('home').on('swipe', me.onViewSwipe);
		var me = this;
		me.HomeSwipe = value;
	},

	// 滑动操作判断
	onViewSwipe: function(e, target, options, eOpts) {
		var me = this;
		if (!me.HomeSwipe)
			return;
		if (e.direction == 'right' && e.distance >= 20) {
			Ext.getCmp('entry').showMenu();
		}
	},

	showHome: function() {
		var me = this;
		me.animateActiveItem('#home', {
			type: "slide",
			direction: "right"
		});
	},

	showRegist: function() {
		var me = this;
		me.animateActiveItem('#regist', {
			type: "slide",
			direction: "left"
		});
		me.down('#regist').reset();
	},

	/**
	 * menu 相关
	 */

	showMenu: function() {
		var menu = Ext.create('Hotel.page.cmp.Menu', {
			topPage: me
		});
		Ext.Viewport.setMenu(menu, {
			side: 'left',
			reveal: true
		});
		Ext.Viewport.showMenu('left');
	},

	showUserInfo: function() {
		var me = this;
		Ext.Viewport.hideMenu('left');
		me.animateActiveItem('#userInfo', {
			type: 'slide',
			direction: 'left'
		});
		Ext.getCmp('userInfo').setUserData();
	},

	showNewSubscription: function() {
		var me = this;
		Ext.Viewport.hideMenu('left');
		me.animateActiveItem('#newSubscription', {
			type: "slide",
			direction: "left"
		});
		Ext.getCmp('newSubscription').setUserData();
	},

	showMySubscription: function() {
		var me = this;
		Ext.Viewport.hideMenu('left');
		me.animateActiveItem('#mySubscription', {
			type: "slide",
			direction: "left"
		});
		Ext.getCmp('mySubscription').setUserData();
	},

	viewSubscription: function(orderNo) {
		var me = this;
		Ext.Viewport.hideMenu('left');
		me.animateActiveItem('#viewSubscription', {
			type: 'flip'
		});
		Ext.getCmp('viewSubscription').setUserData(orderNo);
	},

	showEditPassword: function() {
		var me = this;
		Ext.Viewport.hideMenu('left');
		me.animateActiveItem('#editPassword', {
			type: "slide",
			direction: "left"
		});
	},

	logout: function() {
		var me = this;
		HotelSvc.logout(function() {
			me.setHomeSwipe(false);
			Ext.Viewport.hideMenu('left');
			me.showHome();
			me.down('#home').beforeLog();
		});
	}
});
