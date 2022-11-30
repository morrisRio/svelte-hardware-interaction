import { writable } from 'svelte/store';

export const serialMessage = writable(undefined);

export const boardConnected = writable(false);

export const connectWebSocket = () => {
	const socket = new WebSocket('ws://localhost:8080');

	socket.addEventListener('open', (event) => {
		socket.send('Hello Server!');
	});

	socket.addEventListener('message', (event) => {
		const data = JSON.parse(event.data);
		console.log(data);
		serialMessage.set(data.message);

		if (typeof data === 'object' && data.connected === true) {
			boardConnected.set(true);
		} else {
			boardConnected.set(false);
		}
	});
};
