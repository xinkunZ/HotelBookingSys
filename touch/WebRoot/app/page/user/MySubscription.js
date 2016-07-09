Ext.define('Hotel.page.user.MySubscription', {
	extend: 'Ext.Container',
	alias: 'widget.user.mySubscription',
	me: {},
	config: {
		layout: 'vbox',
		items: [{
			xtype: 'panel',
			itemId: 'title',
			width: '100%',
			height: '58px',
			html: '我的订单',
			style: {
				'line-height': '58px'
			}
		}, {
			xtype: 'panel',
			hidden: true,
			layout: 'hbox',
			width: '100%',
			height: 42,
			style: {
				'background': 'white'
			},
			defaults: {
				xtype: 'panel',
				style: {
					'line-height': '42px',
					'text-align': 'center'
				}
			},
			items: [{
				html: '订单号',
				flex: 2
			}, {
				html: '房间号',
				flex: 1
			}, {
				html: '入住人',
				flex: 1
			}]
		}, {
			xtype: 'list',
			emptyText: '您还没有订单哦！',
			disableSelection: true,
			store: {

			},
			// itemTpl:
			// '<div>{orderNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{room.roomNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{linkMan}</div>',
			itemTpl: '<div>单&nbsp;&nbsp;&nbsp;&nbsp;号：{orderNo}<br/>房间号：{room.roomNo}<br/>联系人：{linkMan}</div>',

			flex: 1
		}]
	},

	initialize: function() {
		me = this;
		me.callParent();
		me.createEventHandlers();
	},

	createEventHandlers: function() {
		var me = this;

		me.down('list').on('itemsingletap', function(cmp, index, target, record, e, eOpts) {
			Ext.getCmp('entry').viewSubscription(record.data.orderNo);
		});
		me.down('list').setStore(me.createStore());
	},

	createStore: function() {
		var store = Ext.create("Ext.data.Store", {
			fields: ['orderNo', 'room', 'linkMan'],
			proxy: {
				type: "ajax",
				url: HotelSvc.getSubListUrl,
				reader: {
					type: "json",
					rootProperty: "data"
				}
			},
			autoLoad: true
		});
		return store;
	},

	setUserData: function() {
		var me = this;
		me.down('list').setStore(me.createStore());
		// HotelSvc.getSubList(function(data) {
		//
		// var curData = me.down('list').getData();
		// if (!me.isEquals(curData, data)) {
		// me.down('list').setData(data);
		// }
		// me.down('#title').setHtml(Ext.String.format('我的订单(共{0}个)', data.length));
		// });
	},

	isEquals: function(json1, json2) {
		if (json1 == null) {
			return false;
		}
		if (json1.length != json2.length) {
			return false;
		}
		for (var i = 0; i < json1.length; i++) {
			if (json1[i].uuid != json2[i].uuid) {
				return false;
			}
		}
		return true;
	}

});
