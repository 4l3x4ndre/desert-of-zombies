const screen = {
  width: 500,
  height: 500
}


let rapidFireTime = 0;
let rapidFireActive = false;

let playerLose = false;


const KEYS = {
  SPACE: 32,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  UP: 38,
  DOWN: 40
}

var player= {
  life: 100,
  score: 0,
  width: 34,
  height: 38,
  y: 300,
  x: 300,
  speed: 8,
  pressedKeys: [],
  KEY: KEYS,
  state: "LEFT",
  img: 1,
  isIdle: true
}

function playerMovement() {

  if (player.pressedKeys[player.KEY.RIGHT] && player.x + player.width < screen.width) {
      player.x += player.speed;
      player.state = "RIGHT";
  }
  if (player.pressedKeys[player.KEY.LEFT] && player.x > 0) {
      player.x -= player.speed;
      player.state = "LEFT";
  }
  if (player.pressedKeys[player.KEY.UP] && player.y > 0) {
      player.y -= player.speed;
      player.state = "UP";
  }
  if (player.pressedKeys[player.KEY.DOWN] && player.y + player.height < screen.height) {
      player.y += player.speed;
      player.state = "DOWN";
  }

  if (player.pressedKeys[player.KEY.SPACE]) {
      gunManager.fire();
  }

  $("#player").css ({
      "top": player.y  + "px",
      "left": player.x + "px",
      "width": player.width + "px",
      "height": player.height + "px",
  })

  if (!player.pressedKeys[player.KEY.UP]
    && !player.pressedKeys[player.KEY.DOWN]
    && !player.pressedKeys[player.KEY.LEFT]
    && !player.pressedKeys[player.KEY.RIGHT]) {
    player.isIdle = true;
  }else {
    player.isIdle = false;
  }


  for (let p in powerUPManager.powersUP) {
    if (player.y < powerUPManager.powersUP[p].y + powerUPManager.powersUP[p].height &&
      player.y + player.height >= powerUPManager.powersUP[p].y + powerUPManager.powersUP[p].height
    || player.y + player.height >= powerUPManager.powersUP[p].y && player.y <= powerUPManager.powersUP[p].y
    || player.y >= powerUPManager.powersUP[p].y && player.y + player.height <= powerUPManager.powersUP[p].y + powerUPManager.powersUP[p].height
    ){

      if (player.x <= powerUPManager.powersUP[p].x+powerUPManager.powersUP[p].width &&
        player.x + player.width >= powerUPManager.powersUP[p].x+powerUPManager.powersUP[p].width
      || player.x + player.width >= powerUPManager.powersUP[p].x && player.x <= powerUPManager.powersUP[p].x
      || player.x >= powerUPManager.powersUP[p].x && player.x + player.width <= powerUPManager.powersUP[p].x + powerUPManager.powersUP[p].width) {

        if (powerUPManager.powersUP[p].speciality == "Health") {
          powerUPSound = new Sound("", false);
          powerUPSound = new Sound("./powerUP.mp3", false);
          powerUPSound.play();
          player.life += 10;
        } else if (powerUPManager.powersUP[p].speciality == "Ammo") {
          powerUPSound = new Sound("", false);
          powerUPSound = new Sound("./powerUP.mp3", false);
          powerUPSound.play();
          gunManager.rapidFire();
          rapidFireTime = Date.now() + 5000;
          rapidFireActive = true;
        } else if (powerUPManager.powersUP[p].speciality == "Bomb") {
          powerUPSound = new Sound("", false);
          powerUPSound = new Sound("./bomb.mp3", false);
          powerUPSound.play();
          Bomb();
        }
        powerUPManager.removePowerUp(powerUPManager.powersUP[p].id);

      }
    }
  }

}

function playerSprite() {
  if (player.img == 1) {
    if (player.state == "RIGHT" && !player.isIdle) {
      document.getElementById("player").src='./Images/playerL.png';
      player.img = 2;
    }else if (player.state == "LEFT" && !player.isIdle) {
      document.getElementById("player").src='./Images/player2.png';
      player.img = 2;
    }else if (player.state == "UP" && !player.isIdle) {
      document.getElementById("player").src='./Images/playerBack2.png';
      player.img = 2;
    }else if (player.state == "DOWN" && !player.isIdle) {
      document.getElementById("player").src='./Images/playerFront2.png';
      player.img = 2;
    }

  }else if (player.img == 2) {

    if (player.state == "RIGHT") {
      document.getElementById("player").src='./Images/player2L.png';
      player.img = 1;
    }else if (player.state == "LEFT") {
      document.getElementById("player").src='./Images/player.png';
      player.img = 1;
    }else if (player.state == "UP") {
      document.getElementById("player").src='./Images/playerBack.png';
      player.img = 1;
    }else if (player.state == "DOWN") {
      document.getElementById("player").src='./Images/playerFront.png';
      player.img = 1;
    }
  }
}
