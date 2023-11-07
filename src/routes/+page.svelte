<script lang="ts">
    import { onMount } from 'svelte';
    import { generateQRMatrix } from '$lib/generateqr';
  
    let qrImageUrl = ''; // For the image source
    let qrMatrix:any[] = []; // For the matrix of 0s and 1s
    var pixelsize = 6;
    var elementMatrix:any[] = [];
    function QrAnnimation(){
        // empty the div
        var animqrcodeDiv:HTMLElement = document.getElementById("animqrcode");
        //set the size of the div

        var oldwidth = animqrcodeDiv.style.width;
        var oldheight = animqrcodeDiv.style.height;

        animqrcodeDiv.style.width = qrMatrix[0].length*pixelsize+"px";
        animqrcodeDiv.style.height = qrMatrix.length*pixelsize+"px";
        if (oldwidth != animqrcodeDiv.style.width || oldheight != animqrcodeDiv.style.height){
            elementMatrix = [];
            animqrcodeDiv.innerHTML = "";
        }        
        var x = 0;
        var y = 0;
        qrMatrix.forEach(element => {
            if (elementMatrix[y] == null)
                elementMatrix[y] = [];

            element.forEach(element2 => {
                if (elementMatrix[y][x] == null){
                    var el = createPixel(element2,x,y)
                    elementMatrix[y].push(el);
                    animqrcodeDiv.appendChild(el);
                }
                else{
                    modifyPixel(element2,elementMatrix[y][x]);
                }
                x++;
            });
            x = 0;
            y++;
        });
        
    }

    //here we run any animation we want for the change of the qr code for each pixel
    function modifyPixel(value, element) {
    // Define a transition class string using Tailwind CSS classes
        const transitionClasses = "transition ease-in-out duration-[500ms]";
        
        // Apply the transition classes to the element
        element.className = transitionClasses;

        // Depending on the value, toggle between black and transparent backgrounds
        if (value == 1) {
            // Use Tailwind's `bg-black` class for black background
            element.classList.add('bg-black');
            element.classList.remove('bg-transparent');
        } else {
            // Use Tailwind's `bg-transparent` class for transparent background
            element.classList.add('bg-transparent');
            element.classList.remove('bg-black');
        }
    }


    function createPixel(value:any,x:number,y:number){
        var newElement = document.createElement("div");
        newElement.style.width = pixelsize+"px";
        newElement.style.height = pixelsize+"px";
        newElement.style.position = "absolute";
        newElement.style.left = x*pixelsize+"px";
        newElement.style.top = y*pixelsize+"px";
        
        if (value == 1){
            newElement.classList.remove('bg-transparent');
            newElement.classList.add('bg-black');
        }
        else{
            newElement.classList.add('bg-transparent');
            newElement.classList.remove('bg-black');

        }        


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


