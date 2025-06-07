// Mock notifications config
jest.mock("@/common/config/notifications", () => ({
	useConfigureNotificationsHandler: jest.fn(() => ({
		expoPushToken: "ExponentPushToken[test]",
		notification: null,
	})),
	sendLocalNotification: jest.fn(),
}));

// Silence console warnings in tests
global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};

// Global cleanup para evitar problemas com operações assíncronas pendentes
afterEach(() => {
	// Limpar todos os timers
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

// Forçar cleanup no final dos testes
afterAll(() => {
	// Aguardar um pouco para permitir cleanup
	return new Promise((resolve) => setTimeout(resolve, 100));
});
