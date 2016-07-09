Ext.define('Hotel.page.Home', {
	extend: 'Ext.Container',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.page.Home',
	me: {},
	home: {},
	config: {
		fullscreen: true,// 设置全屏
		layout: 'vbox',
		scrollable: {
			direction: 'vertical'// 设置允许垂直滚动
		},
		items: [{
			margin: '5',
			html: '酒店风采'
		}, {
			xtype: 'carousel',
			height: '200px',
			defaults: {
				styleHtmlContent: true,
				xtype: 'img'
			},
			items: [{
				src: './img/1.jpg'
			}, {
				src: './img/2.jpg'
			}, {
				src: './img/3.jpg'
			}, {
				src: './img/4.jpg'
			}, {
				src: './img/5.jpg'
			}, {
				src: './img/6.jpg'
			}]
		}, {
			xtype: 'panel',
			margin: '20 5 0 5 ',
			items: [{
				xtype: 'panel',
				html: '&nbsp;&nbsp;&nbsp;&nbsp;欢迎访问有间酒店！<br/>&nbsp;&nbsp;&nbsp;&nbsp;您可以在注册/登录后预定房间，也可以在本页面内找到您需要的信息。<br/>&nbsp;&nbsp;&nbsp;&nbsp;祝您本次入住顺心！'
			}, {
				xtype: 'panel',
				itemId: 'logAndRegBtn',
				layout: 'hbox',
				margin: '10',
				items: [{
					xtype: 'button',
					text: '注册',
					itemId: 'registBtn',
					flex: 1
				}, {
					align: 'left',
					text: '测试',
					iconMask: true,
					itemId: 'testBtn'
				}, {
					xtype: 'button',
					text: '登录',
					itemId: 'loginBtn',
					flex: 1
				}]
			}]
		}, {
			xtype: 'panel',
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				margin: '0 5 0 10',
				html: '酒店介绍',
				itemId: 'introduce',
				style: {
					'line-height': '100px',
					'background-color': '#F65314',
					'text-align': 'center'
				},
				height: '100px',
				flex: 1
			}, {
				xtype: 'panel',
				margin: '0 10 0 0',
				html: '设施状况',
				itemId: 'category',
				height: '100px',
				style: {
					'line-height': '100px',
					'background-color': '#7CBB00',
					'text-align': 'center'
				},
				flex: 1
			}]
		}, {
			xtype: 'panel',
			layout: 'hbox',
			margin: '0 0 20 0',
			items: [{
				xtype: 'panel',
				margin: '5 5 0 10',
				html: '房间查询',
				itemId: 'queryRoom',
				style: {
					'line-height': '100px',
					'background-color': '#00A1F1',
					'text-align': 'center'
				},
				height: '100px',
				flex: 1
			}, {
				xtype: 'panel',
				margin: '5 10 0 0',
				html: '联系方式',
				itemId: 'linkWay',
				height: '100px',
				style: {
					'line-height': '100px',
					'background-color': '#FFBB00',
					'text-align': 'center'
				},
				flex: 1
			}]
		}]
	},

	initialize: function() {
		me = this;
		me.callParent();
		me.checkLogin();
		me.createEventHandlers();
	},

	createEventHandlers: function() {
		var me = this;

		me.down('#loginBtn').on('tap', function() {
			me.showLogin();
		});

		me.down('#registBtn').on('tap', function() {
			me.showRegist();
		});

		// hub注册tap事件
		me.down('#introduce').element.on({
			tap: function() {
				Ext.getCmp('entry').showIntroduce();
			}
		});

		me.down('#category').element.on({
			tap: function() {
				Ext.getCmp('entry').showCategory();
			}
		});

		me.down('#queryRoom').element.on({
			tap: function() {
				Ext.getCmp('entry').showQueryroom();
			}
		});

		me.down('#linkWay').element.on({
			tap: function() {
				Ext.getCmp('entry').showLinkway();
			}
		});

	},

	showRegist: function() {
		var me = this;
		me.up('#entry').showRegist();
	},

	showLogin: function() {
		var loginBox = new Ext.MessageBox;
		loginBox.show({
			title: '登录',
			itemId: 'loginBox',
			width: 300,
			buttons: Ext.MessageBox.OKCANCEL,
			items: [{
				xtype: 'textfield',
				itemId: 'userName',
				label: '用户名'
			}, {
				xtype: 'passwordfield',
				itemId: 'password',
				label: '密码'
			}],
			fn: function(buttonId) {
				if (buttonId === 'ok') {
					var userName = loginBox.down('#userName').getValue();
					var password = loginBox.down('#password').getValue();
					var me = loginBox.up('container').down('#home');
					me.doLogin(userName, password);
				}
			}
		});
	},

	doLogin: function(userName, password) {
		var me = this;
		HotelSvc.doLogin(userName, password, function() {
			me.afterLog();
		});
	},

	// 此方法用于判断是否有人登录
	checkLogin: function() {
		var me = this;
		HotelSvc.checkLogin(function(data) {
			if (data) {
				me.afterLog();
			} else {
				me.beforeLog();
			}
		});
	},

	beforeLog: function() {
		var me = this;
		me.down('#logAndRegBtn').setHidden(false);
	},

	afterLog: function() {
		var me = this;
		me.down('#logAndRegBtn').setHidden(true);
		Ext.getCmp('entry').setHomeSwipe(true);
	}

});
