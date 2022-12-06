<script>
    import {connectWebSocket, socket} from '../stores.js'
    import {browser} from '$app/environment';


    if (browser) connectWebSocket();

    let light = "on"
    let brightness = 0;

    const switchTheLight = () => {
        //send the current status
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


<h1>Controlling an LED</h1>
<div class="controls">
    <h3>Controls</h3>
    <p class="code">{brightness}</p>
    <input bind:value={brightness} on:input={changeBrightness} type="range" min="0" max="255">
    <button on:click={()=>{switchTheLight()}}>turn {light.toUpperCase()}</button>
</div>

<div>
    <pre>
        <code>

        </code>
    </pre>

</div>



<style>
    .controls {
        display: flex;
        width: 300px;
        background-color: lightgray;
        border-radius: 8px;
        flex-direction: column;
        gap:16px;
        padding: 16px;
    }
</style>