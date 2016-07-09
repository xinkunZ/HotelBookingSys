Ext.define('Hotel.page.user.UserInfo', {
	extend: 'Ext.form.Panel',
	alias: 'widget.user.userinfo',
	me: {},
	config: {
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',// 设置允许垂直滚动
			indicators: false
		},
		fullscreen: true,// 设置全屏
		defaults: {
			readOnly: true
		},
		items: [{
			xtype: 'fieldset',
			title: '个人信息',
			itemId: 'fieldset',
			defaults: {
				xtype: 'textfield',
				readOnly: true
			},
			items: [{
				label: '用户名',// 帐户
				name: 'userName'
			}, {
				label: '出生年月',
				name: 'birthday'
			}, {
				label: '性别',
				name: 'gender'
			}, {
				label: '手机号码',
				name: 'phone'
			}, {
				label: '电子邮箱',
				name: 'email'
			}, {
				label: '优惠券数',
				name: 'numberOfTicket'
			}, {
				label: '累计消费',
				name: 'amount'
			}]
		}]
	},

	initialize: function() {
		var me = this;
		me.callParent();
		me.createEventHandlers();
	},

	createEventHandlers: function() {

	},

	setUserData: function() {
		var me = this;
		HotelSvc.getUserInfo(function(data) {
			me.setValues(data);
		});

	}

});
