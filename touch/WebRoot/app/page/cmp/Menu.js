Ext.define('Hotel.page.cmp.Menu', {
	extend: 'Ext.Menu',
	config: {
		items: [{
			text: '个人信息',
			iconCls: 'user',
			itemId: 'userinfo'
		}, {
			text: '新建订单',
			itemId: 'newSub',
			iconCls: 'add'
		}, {
			text: '我的订单',
			itemId: 'mySub',
			iconCls: 'compose'
		}, {
			text: '修改密码',
			iconCls: 'settings',
			itemId: 'editPassword'
		}, {
			text: '退出登录',
			iconCls: 'delete',
			itemId: 'logout'
		}]
	},

	initialize: function() {
		var me = this;
		me.callParent();
		me.createEventHandlers();
	},

	createEventHandlers: function() {
		var me = this;

		me.down('#userinfo').on('tap', function() {
			Ext.getCmp('entry').showUserInfo();
		});

		me.down('#editPassword').on('tap', function() {
			Ext.getCmp('entry').showEditPassword();
		});

		me.down('#mySub').on('tap', function() {
			Ext.getCmp('entry').showMySubscription();
		});

		me.down('#newSub').on('tap', function() {
			Ext.getCmp('entry').showNewSubscription();
		});

		me.down('#logout').on('tap', function() {
			Ext.getCmp('entry').logout();
		});

	}

});
