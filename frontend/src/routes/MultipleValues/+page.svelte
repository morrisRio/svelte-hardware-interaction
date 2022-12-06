<script>
    import {connectWebSocket, socket} from '../stores.js'
    import {browser} from '$app/environment';

    //if (browser) connectWebSocket();

    let light = "on"
    let brightness = 50;

    const switchTheLight = () => {
        //send the current statut with a tag what type of message it is
        socket.send("l:" + light);

        //switch the state:
        if(light === "off") {
            light = "on";
        } else {
            light ="off";
        }
    }

    const changeBrightness = () => {
        socket.send("b:" + brightness);
    }

</script>

<div class="container">
    <h1>Controlling an LED - sending multiple Values</h1>
    <p>Sending multiple Values with custom tags, so the Arduino knows what type of data it gets.</p>
    <p>For wiring you can check the plan at the <a href="https://create.arduino.cc/projecthub/rowan07/make-a-simple-led-circuit-ce8308">Ardunio ProjectHub</a></p>
    <p class="sidenote">Make sure to upload the correct Code to the Arduino (/hardware/read_multiple_values)</p>
    
    <div class="controls">
        <h3>Controls</h3>
        <p class="data-value">{brightness}</p>
        <input bind:value={brightness} on:input={changeBrightness} type="range" min="0" max="255">
        <button on:click={()=>{switchTheLight()}}>turn {light.toUpperCase()}</button>
    </div>

</div>


<style>

</style>

