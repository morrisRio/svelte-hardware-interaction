<script>
    import {connectWebSocket, socket} from '../stores.js'
    import {browser} from '$app/environment';


    if (browser) connectWebSocket();

    let light = "off"
    const switchTheLight = () => {

        socket.send(light);

        //switch the state
        if(light === "off") {
            light = "on";
        } else {
            light ="off";
        }
    }
</script>


<h1>Controlling an LED</h1>

<button on:click={()=>{switchTheLight()}}>turn {light.toUpperCase()}</button>


<style>

</style>