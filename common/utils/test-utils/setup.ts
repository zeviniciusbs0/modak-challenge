jest.mock("@/common/config/notifications", () => ({
	useConfigureNotificationsHandler: jest.fn(() => ({
		expoPushToken: "ExponentPushToken[test]",
		notification: null,
	})),
	sendLocalNotification: jest.fn(),
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
