Ext.define('Hotel.page.hub.LinkWay', {
	extend: 'Ext.Container',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.hub.linkway',
	config: {
		fullscreen: true,// 设置全屏
		layout: 'vbox',
		scrollable: {
			direction: 'vertical'// 设置允许垂直滚动
		},
		items: [{
			xtype: 'panel',
			itemId: 'title',
			width: '100%',
			height: '58px',
			html: '地址',
			style: {
				'line-height': '58px'
			}
		}, {
			xtype: 'list',
			scrollable: false,
			disableSelection: true,
			emptyText: '查询出错！',
			itemTpl: '<div>房间类型：{city}<br/>价&nbsp;&nbsp;&nbsp;&nbsp;格：{address}<br/>设施描述：{phone}</div>',
			flex: 1
		}]
	},

	initialize: function() {
		var me = this;
		me.createEventHandlers();
	},

	createEventHandlers: function() {
		var me = this;
		me.down('list').setStore(me.createStore());
	},

	createStore: function() {
		var store = Ext.create("Ext.data.Store", {
			fields: ['city', 'address', 'phone'],
			proxy: {
				type: "ajax",
				url: HotelSvc.getLinkWayUrl,
				reader: {
					type: "json",
					rootProperty: "data"
				}
			},
			autoLoad: true
		});
		return store;
	}

});
