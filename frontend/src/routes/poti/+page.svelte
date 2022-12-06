<script>
	import {browser} from '$app/environment';

	let socket;
	let potiValue;

	if (browser) {
        socket = new WebSocket('ws://localhost:8080');

        socket.addEventListener('open', (event) => {
            socket.send('Hello Server!');
        });

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            potiValue = data.message;
	    });
    }
    
    
</script>
<div class="container">
	
	<h1>Potentiometer - receiving data</h1>
	<p>For wiring you can check the plan at the <a href="https://docs.arduino.cc/built-in-examples/basics/AnalogReadSerial">Ardunio Documentation</a></p>
	<p class="sidenote">Make sure to upload the correct Code to the Arduino (/hardware/poti_photoresistor-example)</p>

	<div class="controls">
		<p>potiValue:</p>
		<p class="data-value center">{potiValue}</p>
	</div>
</div>

<style>
	.center {
		align-self: center;
	}
</style>