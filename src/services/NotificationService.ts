type NotificationType = 'success' | 'error' | 'info';

type Notification = {
	message: string;
	type: NotificationType;
};

type Listener = (notification: Notification) => void;

class NotificationService {
	private listeners: Listener[] = [];

	subscribe(listener: Listener) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	show(message: string, type: NotificationType) {
		const notification = { message, type };
		this.listeners.forEach((listener) => listener(notification));
	}
}

export default new NotificationService();
