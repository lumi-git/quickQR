
<script>

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    function updateQRCode() {
        
        var qrtext = document.getElementById("qrtext").value;
        // if only space use default text

        if (!qrtext ||qrtext.trim() == "") {
            qrtext = "https://quickqr.ronantremoureux.fr/";
        }

        var qrcode = document.getElementById("qrcode");
        qrcode.src = "https://quickchart.io/qr?text=" + qrtext;
    }

    onMount(() => {
        document.getElementById("qrtext").addEventListener("keyup", updateQRCode);
        updateQRCode();
    });


</script>

<div class = "text-center">
    <p class ="text-5xl font-bold text-white my-9">Welcome to quickQR</p>
</div>

<div class = "block my-16">

    <div class=" flex text-center">
        <p class=" m-auto sm:text-4xl text-2xl font-bold text-white py-9 ">Enter text to generate QR code</p>
    </div>

    <div class=" flex">
        <input class = "typingbar  mx-auto p-3 text-center placeholder:text-white hover:scale-105 duration-75" type="text" id="qrtext"  placeholder="your text" />
    </div>

</div>

<img class = "m-auto hover:scale-[2] duration-100" id="qrcode" src="https://quickchart.io/qr?text= " alt="QR Code" />

