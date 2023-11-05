
<script>

    import { onMount } from 'svelte';
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
    <p class ="text-5xl font-bold text-white py-9">Welcome to quickQR</p>
</div>

<div class = "block py-16">


    <div class=" flex">
        <p class=" m-auto text-3xl font-bold text-white py-9 ">Enter text to generate QR code</p>
    </div>

    <div class=" flex">
        <input class = "m-auto p-3 placeholder:text-cyan-900 bg-green-300 text-zinc-500 text-5xl" type="text" id="qrtext"  placeholder="your text" />

    </div>

</div>

<img class = "m-auto" id="qrcode" src="https://quickchart.io/qr?text= " alt="QR Code" />