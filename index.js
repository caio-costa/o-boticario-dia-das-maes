window.document.addEventListener('DOMContentLoaded', function(e) {

    var canvas = document.getElementById('canvas');
    var imageElem = document.getElementById('image');
    var context = canvas.getContext('2d');
    var maxWidth = 230;
    var lineHeight = 30;
    var x = canvas.width/2;
    var y = 180;
    var background = new Image();

    context.fillStyle = '#6a3329'
    context.font = '19px Domaine';
    context.textAlign = 'center';

    background.onload = function () {
        context.drawImage(background, 0, 0);
        imageElem.src = context.canvas.toDataURL();
    }

    background.src = "./assets/bg.jpg";
  
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
          var words = text.split(' ');
          var line = '';
  
          for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              context.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight;
            }
            else {
              line = testLine;
            }
          }
          context.fillText(line, x, y);
        }

        document.getElementById('text').addEventListener('keyup', function (){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(background, 0, 0);
            wrapText(context, this.value, x, y, maxWidth, lineHeight);
            imageElem.src = context.canvas.toDataURL('image/jpeg');
        });

        document.getElementById('step-1').addEventListener('click', function(e) {
          this.classList.add('clicked');
        });

        document.getElementById('submit').addEventListener('click', function(e) {

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(background, 0, 0);
          wrapText(context, document.getElementById('text').value, x, y, maxWidth, lineHeight);
          imageElem.src = context.canvas.toDataURL('image/jpeg');

          var download = document.getElementById("download");
          var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
          document.getElementById('step-2').classList.add('clicked');
          download.setAttribute("href", image);
        });
  });