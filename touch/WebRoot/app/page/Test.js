Ext.define('Hotel.page.Test', {
	extend: 'Ext.Panel',
	requires: ['Hotel.page.Home', 'Hotel.page.Regist'],
	alias: 'widget.page.Entry',
	initialize: function() {
		var me = this, cfg = {

			fullscreen: true,// 设置全屏
			items: [{
				xtype: 'titlebar',
				docked: 'top',
				title: '青年旅舍',
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
			}]
		};
		Ext.apply(me, cfg);
		me.callParent();
		// me.createEventHandlers();
	}

	// createEventHandlers: function() {
	// me.down('#homeBtn').setHandler(me.showHome, me);
	// me.down('#userBtn').setHandler(me.showUser, me);
	// },
	//
	// showHome: function() {
	// me.animateActiveItem(0, {
	// type: "slide",
	// direction: "right"
	// });
	// me.down('#homeBtn').setHidden(true);
	// },
	//
	// showRegist: function() {
	// me.animateActiveItem(1, {
	// type: "slide",
	// direction: "left"
	// });
	// me.down('#homeBtn').setHidden(false);
	// }

});
