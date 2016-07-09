Ext.define('Hotel.page.user.ViewSubscription', {
	extend: 'Ext.form.Panel',
	alias: 'widget.user.viewSubscription',
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
			title: '订单详情',
			defaults: {
				xtype: 'textfield',
				readOnly: true
			},
			items: [{
				label: '入住人',
				name: 'linkMan'
			}, {
				label: '身份证号',
				name: 'linkManId'
			}, {
				label: '联系电话',
				name: 'phoneNo'
			}, {
				label: '入住时间',
				name: 'startDate'
			}, {
				label: '退房时间',
				name: 'endDate'
			}, {
				label: '住房类型',
				name: 'category'
			}, {
				label: '入住房间',
				name: 'room'
			}, {
				label: '是否使用<br/>优惠券',
				name: 'withTicket'
			}, {
				label: '总计金额',
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

	setUserData: function(orderNo) {
		var me = this;
		HotelSvc.getSub(orderNo, function(data) {
			var value = data;
			value.room = data.room.roomNo;
			if (data.category == 'first')
				value.category = '普通单人间';
			if (data.category == 'second')
				value.category = '舒适双人间';
			if (data.category == 'third')
				value.category = '豪华间';
			if (data.withTicket == 1)
				value.withTicket = '已使用';
			if (data.withTicket == 0)
				value.withTicket = '未使用';
			me.setValues(value);
		});
	}
});
