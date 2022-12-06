<script>
	import {serialMessage, connectWebSocket} from '../stores.js';
	import {browser} from '$app/environment';

	if (browser) connectWebSocket();
    
</script>

<h1>Potentiometer Values</h1>

<p>This is a prime example for using analouge values from sensors.</p>
<p>Message: {$serialMessage}</p>