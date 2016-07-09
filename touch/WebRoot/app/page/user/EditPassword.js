Ext.define('Hotel.page.user.EditPassword', {
	extend: 'Ext.Container',
	alias: 'widget.user.EditPassword',
	config: {
		me: this,
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',// 设置允许垂直滚动
			indicators: false
		},
		fullscreen: true,// 设置全屏
		items: [{
			xtype: 'fieldset',
			title: '修改密码',
			instructions: 'Tell us all about yourself',
			defaults: {
				xtype: 'textfield'
			},
			items: [{
				xtype: 'passwordfield',
				label: '原密码',
				name: 'oldPassword',
				itemId: 'oldPassword'
			}, {
				xtype: 'passwordfield',
				label: '密码',
				name: 'newPassword',
				itemId: 'newPassword'
			}, {
				xtype: 'passwordfield',
				label: '确认密码',
				name: 'rePassword',
				itemId: 'reNewPassword'
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
					itemId: 'cancel',
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
		me.down('#submit').on('tap', function() {
			me.doEditPassword();
		});

		me.down('#cancel').on('tap', function() {
			Ext.getCmp('entry').showHome();
		});
	},

	doEditPassword: function() {
		var me = this;
		var oldPassword = me.down('#oldPassword').getValue();
		var newPassword = me.down('#newPassword').getValue();
		if (me.isValid()) {
			HotelSvc.editPassword(oldPassword, newPassword, function() {
				Ext.getCmp('entry').logout();
			});
		}
	},

	isValid: function() {
		var me = this;
		var newPassword = me.down('#newPassword').getValue();
		var reNewPassword = me.down('#reNewPassword').getValue();
		var oldPassword = me.down('#oldPassword').getValue();
		if (oldPassword == '') {
			Ext.Msg.alert('原密码不能为空！');
			return false;
		}
		if (newPassword == '') {
			Ext.Msg.alert('新密码不能为空！');
			return false;
		}
		if (reNewPassword == '') {
			Ext.Msg.alert('重复密码不能为空！');
			return false;
		}
		if (newPassword != reNewPassword) {
			Ext.Msg.alert('两次密码输入不一致!');
			return false;
		}
		return true;
	}
});
