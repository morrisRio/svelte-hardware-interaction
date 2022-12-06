<script>
	import {serialMessage, connectWebSocket} from '../stores.js';
	import {browser} from '$app/environment';

	if (browser) connectWebSocket();
    $: color = 'rgb(' + $serialMessage/4 + ',' + $serialMessage/4 + ',' + $serialMessage/4 + ')';

</script>
<div class="container">

	<h1>Photosensor - receiving data</h1>
	<p>Check store.js to see how the WebSocket connection is established.</p>
	<p>Received data is then written to a svelte-store so it can be accesed across multiple pages</p>
    <p>For wiring you can check the plan at the <a href="https://create.arduino.cc/projecthub/MisterBotBreak/how-to-use-a-photoresistor-46c5eb">Ardunio ProjectHub</a></p>
    <p class="sidenote">Make sure to upload the correct Code to the Arduino (/hardware/poti_photoresistor-example)</p>

	<div class="controls">
		<p>Photosensor:</p>
        <div class="lightblock center" style="--grayscale: {color}"></div>
		<p class="data-value center">{$serialMessage}</p>
	</div>
</div>

<style>
	.center {
		align-self: center;
	}

    .lightblock {
        background-color: var(--grayscale);
        width: 150px;
        height: 150px;
        border-radius: 8px;
    }
</style>
