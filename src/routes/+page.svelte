<script lang="ts">
    import { onMount } from 'svelte';
    import { generateQRMatrix } from '$lib/generateqr';
  
    let qrImageUrl = ''; // For the image source
    let qrMatrix = null; // For the matrix of 0s and 1s
    
    let pixels = [];

    function QrAnnimation(){
        qrMatrix.array.forEach(element => {
            pixels.push(createPixel(element));
        });

        pixels.forEach(element => {
            document.getElementById("animqrcode").appendChild(element);
        });

    }

    function createPixel(value:Number){
        var newElement = document.createElement("div");
        newElement.style.width = "100px";
        newElement.style.height = "100px";
        if (value == 1)
            newElement.style.background = "black";
        else        
            newElement.style.background = "red";
        return newElement;

    }

    function updateQRCode() {
      let qrtext = document.getElementById('qrtext').value;
      if (!qrtext.trim()) {
        qrtext = 'https://quickqr.ronantremoureux.fr/';
      }
      
      // Get the QR Code matrix and data URL
      const { matrix, qrDataURL } = generateQRMatrix(qrtext);
      qrMatrix = matrix;
      qrImageUrl = qrDataURL;
    }
  
    onMount(() => {
      document.getElementById('qrtext').addEventListener('keyup', updateQRCode);
      updateQRCode();
      console.log("Here is the matrix of the qr code");
        console.log(qrMatrix);
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

<img bind:this={qrImageUrl} class="m-auto hover:scale-[2] duration-100" id="qrcode" src={qrImageUrl} alt="QR Code" />

<div id=animqrcode>qrcode</div>