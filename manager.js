zombieManager = new Zombie();
zombieManager.createZombie();

gunManager = new Gun();
powerUPManager = new Power();
zHoleManager = new ZombieHole();

let zombieSpriteCall = setInterval(zombieManager.zombieSprite, 500);
let playerSpriteCall = setInterval(playerSprite, 100);

let canPlayEndSound = true;

var gameLoop = setInterval(function() {

  if (rapidFireActive) {
    if (Date.now() >= rapidFireTime) {
      gunManager.loadingTime = 300;
    }
  }

  $(document).keydown(function(e) {
    player.pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e) {
    player.pressedKeys[e.which] = false;
  });

  if (player.life > 0) {
    playerMovement();
    zombieManager.zombieMovement();
    $("#life").text("Life: " + Math.floor(player.life) + " % ");
    $("#score").text("Score: " + player.score);
  }else {
    clearInterval(zombieSpriteCall);
    clearInterval(playerSpriteCall);
    document.getElementById("player").src="./Images/playerDead.png";
    document.getElementById("panelOver").style.display = "block";
    Bomb();
    $("#life").text("Life: 0 %");
    if (player.pressedKeys[player.KEY.ENTER]) {
        document.location.reload();
      }
    if (!playerLose) {
        backgroundmusic.stop();
      if (canPlayEndSound) {
        loseSound = new Sound("", false);
        loseSound = new Sound("./wasted.mp3", false);
        loseSound.play();
        canPlayEndSound = false;
      }
    }
  }
  gunManager.moveBullets();




  /*if (nbZombie == maxZombie) {
    nbZombie = 0;
    zombieManager.createZombie();
  }*/


}, 30);
