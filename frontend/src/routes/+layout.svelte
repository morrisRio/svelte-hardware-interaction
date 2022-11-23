<script>
	import '$lib/main.css';
	import { page } from '$app/stores';

	import { browser } from '$app/environment';

	let boardConnected = false;

	if (browser) {
		const socket = new WebSocket('ws://localhost:8080');
		// Connection opened
		socket.addEventListener('open', (event) => {
			socket.send('Hello Server!');
		});

		// Listen for messages
		socket.addEventListener('message', (event) => {
			let data = JSON.parse(event.data);
			console.log('Message from server :', data);
			console.log(data);
			if (typeof data === 'object' && data.connected === true) {
				boardConnected = true;
			} else {
				boardConnected = false;
			}
		});
	}

	const pages = ['/', '/poti', '/photoresistor', '/led', '/servo'];

	const capitalize = (word) => {
		if (word.length === 0) {
			return '';
		} else {
			return word[0].toUpperCase() + word.slice(1);
		}
	};

	const navigation = pages.map((page) => {
		const name = capitalize(page.replace(/\//gm, ''));

		return { name: name, link: page };
	});

	$: isActive = (link) => {
		return $page.url.pathname === link ? true : false;
	};
</script>

<nav>
	<ul>
		{#each navigation as element}
			<li>
				{#if element.link === '/'}
					<a class:active={isActive(element.link)} href={element.link}>Home</a>
				{:else}
					<a class:active={isActive(element.link)} href={element.link}>{element.name}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<main>
	<slot><!-- optional fallback --></slot>
</main>

<style>
	nav ul {
		margin-top: 2rem;
		display: flex;
		gap: 16px;
		list-style: none;
		padding: 0;
		flex-wrap: wrap;
		align-items: center;
	}

	a {
		text-decoration: none;
		color: black;
	}
	a:hover {
		color: lightseagreen;
	}
	.active {
		border-bottom: 1px solid black;
	}
	:global(body) {
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		font-family: sans-serif;
	}

	@media (max-width: 560px) {
		:global(body) {
			max-width: 100%;
			padding: 0 20px;
		}
	}
</style>
