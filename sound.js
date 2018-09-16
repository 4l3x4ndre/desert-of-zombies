backgroundmusic = new Sound("./music.mp3", true);
backgroundmusic.play();


function Sound(src, isBackgroundMusic) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        if (isBackgroundMusic && !playerLose) {
          //this.stop();
            backgroundmusic = new Sound("", true);
            backgroundmusic = new Sound("./music.mp3", true);
            setTimeout(this.rebootSound, 31000);
        }

        if (src == "./wasted.mp3" && !playerLose) {
            setTimeout(this.lose, 500);
        }
        if (!playerLose) {
          this.sound.play();
        }
    }

    this.stop = function(){
        this.sound.pause();
    }

    this.rebootSound = function() {
      backgroundmusic.play();
    }

    this.lose = function() {
      playerLose = true;
    }
}
