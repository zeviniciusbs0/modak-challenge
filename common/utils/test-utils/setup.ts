jest.mock("@/common/config/notifications", () => ({
	useConfigureNotificationsHandler: jest.fn(() => ({
		expoPushToken: "ExponentPushToken[test]",
		notification: null,
	})),
	sendLocalNotification: jest.fn(),
}));

jest.mock("axios", () => ({
	create: jest.fn(() => ({
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
	})),
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	delete: jest.fn(),
}));

global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};

afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

afterAll(() => {
	return new Promise((resolve) => setTimeout(resolve, 100));
});
