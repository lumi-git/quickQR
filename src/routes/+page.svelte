<script lang="ts">
    import { onMount } from 'svelte';
    import { generateQRMatrix } from '$lib/generateqr';
  
    let qrImageUrl = ''; // For the image source
    let qrMatrix = null; // For the matrix of 0s and 1s
    var pixelsize = 6;

    function QrAnnimation(){
        // empty the div
        var animqrcodeDiv:HTMLElement = document.getElementById("animqrcode");
        animqrcodeDiv.innerHTML = "";
        //set the size of the div
        animqrcodeDiv.style.width = qrMatrix[0].length*pixelsize+"px";
        animqrcodeDiv.style.height = qrMatrix.length*pixelsize+"px";

        
        var x = 0;
        var y = 0;
        qrMatrix.forEach(element => {
            element.forEach(element2 => {
                animqrcodeDiv.appendChild(createPixel(element2,x,y));
                x++;
            });
            x = 0;
            y++;
        });
    }


    function createPixel(value:any,x:number,y:number){
        var newElement = document.createElement("div");
        newElement.style.width = pixelsize+"px";
        newElement.style.height = pixelsize+"px";
        newElement.style.position = "absolute";
        newElement.style.left = x*pixelsize+"px";
        newElement.style.top = y*pixelsize+"px";
        
        if (value == 1)
            newElement.style.background = "black";
        else        
            newElement.style.background = "";


        return newElement;

    }

    function createQRcode(){
        let qrtext = document.getElementById('qrtext').value;
      if (!qrtext.trim()) {
        qrtext = 'https://quickqr.ronantremoureux.fr/';
      }
      
      // Get the QR Code matrix and data URL
      const { matrix, qrDataURL } = generateQRMatrix(qrtext);
      qrMatrix = matrix;
      qrImageUrl = qrDataURL;
    }

    function updateQRCode() {

      setTimeout(createQRcode, 0);
      setTimeout(QrAnnimation, 0);
    }
  
    onMount(() => {
      document.getElementById('qrtext').addEventListener('keyup', updateQRCode);
      updateQRCode();
    });
  </script>

<div class = "text-center">
    <p class ="text-5xl font-bold text-white  mt-9">Welcome to quickQR</p>
</div>

<div class = "block mb-16">

    <div class=" flex text-center">
        <p class=" m-auto sm:text-4xl text-2xl font-bold text-white py-9 ">Enter text to generate QR code</p>
    </div>

    <div class=" flex">
        <input class = "active:scale-110 typingbar shadow-sm shadow-gray-700 mx-auto p-3 text-center placeholder:text-white hover:placeholder:text-opacity-50 hover:scale-105 duration-75" type="text" id="qrtext"  placeholder="https://.." />
    </div>

</div>

<div class = "flex">
    <div id=qrcodeHolder class = "bgqrimage p-10 m-auto bg-white shadow-md shadow-slate-900 rounded-2xl">

        <div class = "hover:bg-white bg-transparent duration-[500ms] hover:scale-[2] hover:cursor-none active:scale-[1.90]">
            <div id=animqrcode class = "m-auto relative duration-200 hover:shadow-sm shadow-gray-700 "></div>
        </div>
        
        </div>

</div>

<div class= flex>
    <a class= "m-auto text-bl font-bold" href = {qrImageUrl} download>Download it here ! </a>

</div>


