import { writable } from 'svelte/store';

export const serialMessage = writable(undefined);

export const boardConnected = writable(false);

export let socket;

export const connectWebSocket = () => {
	socket = new WebSocket('ws://localhost:8080');

	socket.addEventListener('open', (event) => {
		socket.send('Hello Server!');
	});

	socket.addEventListener('message', (event) => {
		const data = JSON.parse(event.data);
		//console.log(data);
		serialMessage.set(data.message);

		boardConnected.set(data.connected);
	});
};
