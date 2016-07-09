Ext.define('Hotel.page.Regist', {
	extend: 'Ext.form.Panel',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.page.Regist',
	config: {
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',// 设置允许垂直滚动
			indicators: false
		},
		fullscreen: true,// 设置全屏
		items: [{
			xtype: 'fieldset',
			title: '用户注册',
			itemId: 'fieldset',
			instructions: '请认真填写您的身份信息。',
			defaults: {
				xtype: 'textfield'
			},
			items: [{
				label: '用户名',// 帐户
				name: 'userName'
			}, {
				xtype: 'passwordfield',
				label: '密码',
				name: 'password'
			}, {
				xtype: 'passwordfield',
				label: '确认密码',
				name: 'rePassword'
			}, {
				xtype: 'datepickerfield',
				label: '出生年月',
				name: 'birthday',
				itemId: 'birthday'
			}, {
				xtype: 'radiofield',
				name: 'gender',
				value: '男',
				label: '男',
				checked: true
			}, {
				xtype: 'radiofield',
				name: 'gender',
				value: '女',
				label: '女'
			}, {
				label: '手机号码',
				name: 'phone'
			}, {
				label: '电子邮箱',
				name: 'email'
			}, {
				xtype: 'panel',
				layout: 'hbox',
				docked: 'bottom',
				items: [{
					xtype: 'button',
					itemId: 'submit',
					text: '提交',
					flex: 1,
					ui: 'round'
				}, {
					xtype: 'button',
					itemId: 'cancelBtn',
					text: '取消',
					flex: 1,
					ui: 'confirm'
				}]
			}]
		}]
	},

	initialize: function() {
		var me = this;
		me.callParent();
		me.createEventHandlers();
	},

	createEventHandlers: function() {

		var me = this;

		me.down('#cancelBtn').on('tap', function() {
			Ext.getCmp('entry').showHome();
		});

		me.down('#submit').on('tap', function() {
			var data = me.getUserData();
			HotelSvc.doRegist(data, function() {
				Ext.getCmp('entry').showHome();
			});
		});
	},

	getUserData: function() {
		var me = this;
		var data = me.getValues();
		var birthday = me.down('#birthday').getFormattedValue();
		data.birthday = birthday;
		return me.getValues();
	}
});
