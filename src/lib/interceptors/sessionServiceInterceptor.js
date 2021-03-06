var sessionService = require("services/session.service").default;
var socketService = require("services/socket.service").default;

var interceptor = {

	transformResponse: function (response, request) {
		if (request.sid && !response.logedin) {
			sessionService.logout();
		}
		return response;
	},

	transformRequest: function(request) {
		request.sid = sessionService.getSID();
		return request;
	}
};

socketService.addInterceptor(interceptor);
