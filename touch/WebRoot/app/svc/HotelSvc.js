Ext.define('Hotel.svc.HotelSvc', {

	singleton: true,
	alternateClassName: 'HotelSvc',

	checkLoginUrl: serviceUrl('member/check'),
	registUrl: serviceUrl('member/regist'),
	loginUrl: serviceUrl('member/login'),
	editPasswordUrl: serviceUrl('member/editpass'),
	logoutUrl: serviceUrl('member/logout'),
	getUserInfoUrl: serviceUrl('member/get'),
	getNumberOfTicketUrl: serviceUrl('member/ticket'),

	getRoomUrl: serviceUrl('room/get'),
	queryRoomUrl: serviceUrl('room/query'),

	getCategoryUrl: serviceUrl('category/get'),

	getLinkWayUrl: serviceUrl('linkway/get'),

	createSubUrl: serviceUrl('sub/create'),
	getSubListUrl: serviceUrl('sub/list'),
	getSubUrl: serviceUrl('sub/get'),

	checkLogin: function(success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.checkLoginUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				}
			}
		});

	},

	doRegist: function(data, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.registUrl,
			jsonData: data,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success();
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	doLogin: function(userName, password, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.loginUrl,
			params: {
				userName: userName,
				password: password
			},
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success();
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	logout: function(success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.logoutUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success();
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	editPassword: function(oldPassword, newPassword, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.editPasswordUrl,
			params: {
				oldPassword: oldPassword,
				newPassword: newPassword
			},
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success();
					Ext.Msg.alert('修改成功，请重新登录！');
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	getUserInfo: function(success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.getUserInfoUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	getNumberOfTicket: function(success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.getNumberOfTicketUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	getRoom: function(startDate, endDate, category, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.getRoomUrl,
			jsonData: {
				"startDate": startDate,
				"endDate": endDate,
				"category": category
			},
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}

		});
	},

	queryRoom: function(type, sdate, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.queryRoomUrl,
			jsonData: {
				"startDate": sdate,
				"category": type
			},
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	createSub: function(data, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.createSubUrl,
			jsonData: data,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	getSub: function(orderNo, success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			params: {
				orderNo: orderNo
			},
			url: me.getSubUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	getSubList: function(success) {
		var me = this;
		Ext.Ajax.request({
			method: 'POST',
			url: me.getSubListUrl,
			success: function(rsp) {
				var ret = Ext.JSON.decode(rsp.responseText);
				if (ret.success) {
					success(ret.data);
				} else {
					me.showFailure(ret.message);
				}
			}
		});
	},

	showFailure: function(msg) {
		// var errorBox = Ext.create('Ext.MessageBox');
		Ext.Msg.alert('错误', msg, Ext.emptyFn);
	}
});
