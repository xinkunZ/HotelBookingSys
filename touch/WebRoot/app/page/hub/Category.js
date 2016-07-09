Ext.define('Hotel.page.hub.Category', {
	extend: 'Ext.Container',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.hub.categoty',
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
			html: '设施状况',
			style: {
				'line-height': '58px'
			}
		}, {
			xtype: 'list',
			scrollable: false,
			disableSelection: true,
			emptyText: '查询出错！',

			itemTpl: '<div>房间类型：{name}<br/>价&nbsp;&nbsp;&nbsp;&nbsp;格：{roomprice}<br/>设施描述：{description}</div>',
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
			fields: ['name', 'roomprice', 'description'],
			proxy: {
				type: "ajax",
				url: HotelSvc.getCategoryUrl,
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
