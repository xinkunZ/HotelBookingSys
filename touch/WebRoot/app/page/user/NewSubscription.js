Ext.define('Hotel.page.user.NewSubscription', {
	extend: 'Ext.form.Panel',
	requires: ['Hotel.svc.HotelSvc'],
	alias: 'widget.user.newSubscription',

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
			title: '新建订单',
			instructions: '请认真填写入住人信息',
			defaults: {
				xtype: 'textfield'
			},
			items: [{
				label: '姓名',
				name: 'linkMan',
				itemId: 'linkMan'
			}, {
				label: '身份证号',
				name: 'linkManId',
				itemId: 'linkManId'
			}, {
				label: '联系电话',
				name: 'phoneNo',
				itemId: 'phoneNo'
			}, {
				label: '入住时间',
				xtype: 'datepickerfield',
				itemId: 'startDate',
				name: 'startDate',
				dateFormat: 'Y-m-d',
				picker: {
					yearFrom: 2015
				}
			}, {
				label: '退房时间',
				xtype: 'datepickerfield',
				itemId: 'endDate',
				dateFormat: 'Y-m-d',
				name: 'endDate',
				picker: {
					yearFrom: 2015
				}
			}, {
				xtype: 'selectfield',
				label: '住房类型',
				name: 'category',
				itemId: 'category',
				options: [{
					text: '普通单人间',
					value: 'first'
				}, {
					text: '舒适双人间',
					value: 'second'
				}, {
					text: '豪华间',
					value: 'third'
				}]
			}, {
				xtype: 'selectfield',
				label: '可选房间',
				name: 'room',
				itemId: 'room',
				disabled: true
			}, {
				label: '优惠券数',
				itemId: 'numberOfTicket',
				readOnly: true
			}, {
				xtype: 'togglefield',
				label: '是否使用<br/>优惠券',
				itemId: 'withTicket',
				name: 'withTicket',
				hidden: true
			}, {
				label: '单价',
				itemId: 'price',
				readOnly: true
			}, {
				label: '天数',
				name: 'daysNo',
				itemId: 'daysNo',
				readOnly: true
			}, {
				label: '总价',
				name: 'amount',
				itemId: 'amount',
				readOnly: true
			}, {
				xtype: 'panel',
				layout: 'hbox',
				docked: 'bottom',
				items: [{
					xtype: 'button',
					text: '提交',
					itemId: 'submit',
					flex: 1,
					ui: 'round'
				}, {
					xtype: 'button',
					text: '取消',
					flex: 1,
					ui: 'confirm',
					itemId: 'cancel'
				}, {
					xtype: 'button',
					itemId: 'init',
					text: 'init',
					flex: 1,
					ui: 'confirm',
					hidden: true
				}]
			}]
		}]
	},

	initialize: function() {
		var me = this;
		me.roomList = [];
		me.roomOptions = [];
		me.createEventHandler();
	},

	createEventHandler: function() {
		var me = this;// 可在此处监听住房类型的变化然后到后台查找可用房间，将返回的房间号作为一个options设置

		me.down('#startDate').on('change', function() {
			me.getRoom();
		});
		me.down('#endDate').on('change', function() {
			me.getRoom();
		});
		me.down('#category').on('change', function() {
			me.getRoom();
		});

		me.down('#withTicket').on('change', function(cmp, newValue, oldValue, eOpts) {
			var daysNo = me.down('#daysNo').getValue();
			var price = me.down('#price').getValue();
			if (daysNo != null) {
				if (newValue == 0) {
					me.down('#amount').setValue(daysNo * price);
				} else {
					me.down('#amount').setValue(daysNo * price * 0.8);
				}
			}
		});

		me.down('#submit').on('tap', function() {
			if (me.isValid()) {
				HotelSvc.createSub(me.getUserData(), function(orderNo) {
					Ext.getCmp('entry').viewSubscription(orderNo);
				});
			}
		});

		me.down('#cancel').on('tap', function() {
			Ext.getCmp('entry').showHome();
		});

		me.down('#init').on('tap', function() {
			Ext.Ajax.request({
				method: 'POST',
				url: serviceUrl('init/start'),
				params: {
					init: 'init'
				},
				success: function(rsp) {
					var ret = Ext.JSON.decode(rsp.responseText);
					if (ret.success) {
						success();
					}
				}
			});
		});

	},

	getRoom: function() {
		var me = this;
		var startDate = me.down('#startDate').getValue();
		var endDate = me.down('#endDate').getValue();
		var category = me.down('#category').getValue();
		if (startDate != null && endDate != null && category != null && startDate < endDate
		|| (startDate - endDate == 0)) {

			me.down('#daysNo').setValue((endDate - startDate) / (24 * 60 * 60 * 1000) + 1);
			HotelSvc.getRoom(startDate, endDate, category, function(data) {
				me.roomList = data;
				me.roomOptions.length = 0;
				for (var i = 0; i < data.length; i++) {
					var option = {};
					option.text = me.roomList[i].text;
					option.value = me.roomList[i].text;
					me.roomOptions.push(option);
				}
				me.down('#room').setDisabled(false);
				me.down('#room').on('change', function(cmp, newValue, oldValue, eOpts) {
					me.roomChange(cmp, newValue, oldValue, eOpts);
				});
				var option = me.roomOptions;
				me.down('#room').setOptions([]);
				me.down('#room').setOptions(option);
			});
		} else {
			me.down('#room').setDisabled(true);
		}
	},

	roomChange: function(cmp, newValue, oldValue, eOpts) {
		var me = this;
		var roomList = me.roomList;
		for (var i = 0; i < roomList.length; i++) {
			if (newValue == roomList[i].value.roomNo) {
				me.down('#price').setValue(roomList[i].value.category.roomprice);
			}
		}
		var daysNo = me.down('#daysNo').getValue();
		var price = me.down('#price').getValue();
		me.down('#amount').setValue(daysNo * price);
	},

	setNumberOfTicket: function() {
		var me = this;
		HotelSvc.getNumberOfTicket(function(data) {
			me.down('#numberOfTicket').setValue(data);
			if (data > 0) {
				me.down('#withTicket').setHidden(false);
			} else {
				me.down('#withTicket').setHidden(true);
			}
		});
	},

	setUserData: function() {
		var me = this;
		me.reset();
		me.setNumberOfTicket();
	},

	getUserData: function() {
		var me = this;
		var value = me.getValues();
		var roomList = me.roomList;
		for (var i = 0; i < roomList.length; i++) {
			if (value.room == roomList[i].value.roomNo) {
				value.room = roomList[i].value;
				return value;
			}
		}

	},

	isValid: function() {
		var me = this;
		var startDate = me.down('#startDate').getValue();
		var endDate = me.down('#endDate').getValue();
		var linkMan = me.down('#linkMan').getValue();
		var linkManId = me.down('#linkManId').getValue();
		var phoneNo = me.down('#phoneNo').getValue();

		if (linkMan == '') {
			Ext.Msg.alert('请填写联系人');
			return false;
		}
		if (linkManId == '') {
			Ext.Msg.alert('请填写联系人身份证号');
			return false;
		}
		if (phoneNo == '') {
			Ext.Msg.alert('请填写联系人电话');
			return false;
		}
		if (startDate == null) {
			Ext.Msg.alert('请填写入住时间');
			return false;
		}
		if (endDate == null) {
			Ext.Msg.alert('请填写退房时间');
			return false;
		}
		if (startDate > endDate) {
			Ext.Msg.alert('入住时间需早于退房时间！');
			return false;
		}
		return true;
	}

});
