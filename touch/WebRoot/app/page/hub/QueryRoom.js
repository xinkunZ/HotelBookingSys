Ext.define('Hotel.page.hub.QueryRoom', {
	extend: 'Ext.Container',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.hub.queryroom',
	config: {
		fullscreen: true,// 设置全屏
		layout: 'vbox',
		scrollable: {
			direction: 'vertical'// 设置允许垂直滚动
		},
		fullscreen: true,
		items: [{
			xtype: 'panel',
			itemId: 'conditions',
			height: '200px',
			items: [{
				xtype: 'fieldset',
				title: '查询条件：',
				items: [{
					xtype: 'selectfield',
					label: '住房类型',
					name: 'category',
					itemId: 'category',
					options: [{
						text: '不限',
						value: 'any'
					}, {
						text: '普通设施',
						value: 'first'
					}, {
						text: '豪华设施',
						value: 'second'
					}, {
						text: '旗舰设施',
						value: 'third'
					}]
				}, {
					label: '入住时间',
					xtype: 'datepickerfield',
					itemId: 'startDate',
					name: 'startDate',
					dateFormat: 'Y-m-d',
					picker: {
						yearFrom: 2015
					}
				}]
			}, {
				xtype: 'button',
				itemId: 'queryBtn',
				text: '查询'
			}]
		}, {
			xtype: 'panel',
			margin: '10 0 0 0',
			itemId: 'title',
			width: '100%',
			height: '58px',
			html: '查询结果：',
			style: {
				'line-height': '58px'
			}
		}, {
			xtype: 'list',
			emptyText: '没有结果！',
			height: 200,
			scrollable: false,
			disableSelection: true,
			store: {
				fields: ['roomNo', 'category']
			},
			itemTpl: '<div>房&nbsp;间&nbsp;号：{roomNo}<br/>房间类型：{category.name}<br/>'
		}]
	},

	initialize: function() {
		var me = this;

		me.createEventHandlers();
	},

	createEventHandlers: function() {
		var me = this;
		me.down('#queryBtn').on('tap', function() {
			me.queryRoom();
		});
		var type = me.down('selectfield').getValue();
		var sdate = me.down('datepickerfield').getValue();
		me.createStore(type, sdate);
	},

	createStore: function(type, sdate) {
		var me = this;
		HotelSvc.queryRoom(type, sdate, function(data) {
			var store = Ext.create("Ext.data.Store", {
				fields: ['roomNo', 'category'],
				data: data,
				autoLoad: true
			});
			me.down('list').setStore(store);
			me.down('list').setHeight(data == null ? 0 : data.length * 35 * 2);

		});
	},

	queryRoom: function() {
		var me = this;
		var type = me.down('selectfield').getValue();
		var sdate = me.down('datepickerfield').getValue();
		me.createStore(type, sdate);
	}

});
