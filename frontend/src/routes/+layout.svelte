<script>
	import '$lib/main.css';
	import { page } from '$app/stores';
	import { connectWebSocket, boardConnected } from './stores.js';
	import {browser} from '$app/environment';

	//when the layout and therefore the app is in the browser connect the websocket
	if (browser) connectWebSocket();

	const pages = ['/', '/poti', '/photoresistor','/led', '/MultipleValues'];

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
		<li class="connection-monitor" class:connected={$boardConnected}>Board connectet: {$boardConnected}</li>
	</ul>
</nav>

<main>
	<slot><!-- optional fallback --></slot>
</main>

<style>
	nav {
		border-bottom: 3px solid #e3e3e3;
	}
	nav ul {
		width:80%;
		margin: 0 auto;
		margin-top: 2rem;
		display: flex;
		gap: 16px;
		list-style: none;
		padding: 0;
		flex-wrap: wrap;
		align-items: center;
	}

	.connection-monitor {
		margin-left:auto;
		font-weight: 700;
		color: rgb(167, 3, 3);
	}
	.connected {
		color: rgb(101, 167, 3);
	}

	a {
		text-decoration: none;
		color: black;
	}
	a:hover {
		color: lightseagreen;
	}
	.active {
		border-bottom: 3px solid black;
	}
</style>
