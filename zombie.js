let zombieId = 0,
    spawnZombieTime = 2000,
    maxZombie = 17;
    nbZombie = 0,
    fastdetect = 100;

zombies = [];

canSpawn = false;

function Zombie() {
  //this.zombies = [];
  this.createZombie = function() {
    /*if (nbZombie >= maxZombie) {
      return;
    }*/
    let el = document.createElement('img');
    el.setAttribute('src', './Images/ZombieRight1.png');
    el.setAttribute('class', 'zombie');
    el.setAttribute('id', 'zombie' + zombieId);
    posX = Math.floor(Math.random() * 600) + 0;
    posY = Math.floor(Math.random() * 600) + 0;
    randomNumber = Math.random() * 100;

    if (randomNumber > 90) {
      posX = screen.width - 100;
      posY = -38;
    }else if (randomNumber > 80) {
      posX = screen.width + 20;
      posY = 40;
    }else if (randomNumber > 70) {
      posX = screen.width + 20;
      posY = screen.height/2;
    }else if (randomNumber > 60) {
      posX = screen.width + 20;
      posY = screen.height - 100;
    }else if (randomNumber > 50) {
      posX = screen.width - 100;
      posY = screen.height + 20;
    }else if (randomNumber > 40) {
      posX = screen.width/2;
      posY = screen.height + 20;
    }else if (randomNumber > 30) {
      posX = 40;
      posY = screen.height + 20;
    }else if (randomNumber > 20) {
      posX = -38;
      posY = screen.height - 100;
    }else if (randomNumber > 10) {
      posX = -38;
      posY = 0;
    }else if (randomNumber >= 0) {
      posX = screen.width/2;
      posY = -38;
    }

    el.setAttribute('style', `left: ${posX}px; top: ${posY}px; z-index: 1000;`);

    isBonus = Math.random()*100;
    isFast = Math.random()*100;

    let obj = {
      id: "#zombie"+ zombieId,
      getId: "zombie" + zombieId,
      x: posX,
      y: posY,
      angleD: 0,
      angleSpeed: 0.3,
      speed: 1,
      elt: el,
      height: 38,
      width: 20,
      state: "LEFT",
      img: 1,
      imgSrc: "./zombie.png",
      inside: isBonus,
      isDying: false,
      removeDate: 0
    }
    if (isFast >= fastdetect) {
      obj.speed = 2;
    }
    zombies.push(obj);
    document.getElementById("playground").appendChild(el);
    zombieId += 1;
    if (fastdetect > 0) {
      fastdetect -= 1;
    }

    if (spawnZombieTime > 400) {
      spawnZombieTime -= 25;
    }
    nbZombie += 1
    if (player.life > 0) {
      setTimeout(zombieManager.createZombie, spawnZombieTime);
    }

  }

  this.zombieSprite = function() {
    for (let zomb in zombies) {
      if (zombies[zomb].img == 1 && !zombies[zomb].isDying) {

        if (zombies[zomb].state == "RIGHT") {
          document.getElementById(zombies[zomb].getId).src='./Images/ZombieRight2.png';
          zombies[zomb].img = 2;
        }else if (zombies[zomb].state == "LEFT") {
          document.getElementById(zombies[zomb].getId).src='./Images/ZombieLeft2.png';
          zombies[zomb].img = 2;
        }

      }else if (zombies[zomb].img == 2 && !zombies[zomb].isDying) {

        if (zombies[zomb].state == "RIGHT") {
          document.getElementById(zombies[zomb].getId).src='./Images/ZombieRight1.png';
          zombies[zomb].img = 1;
        }else if (zombies[zomb].state == "LEFT") {
          document.getElementById(zombies[zomb].getId).src='./Images/ZombieLeft1.png';
          zombies[zomb].img = 1;
        }
      }


    }
  }

  this.zombieMovement = function() {
    for (let zomb in zombies) {

      let z = zombies[zomb];

      if (z.isDying) {
        if (z.removeDate >= Date.now()) {
          //$(z.id).remove();
          document.getElementById(zombies[zomb].getId).remove();
          zombies.splice(z, 1);
          return;
        }
      }


      if (z.x <  player.x - 5 && !zombies[zomb].isDying || z.x > player.x + 5 && !zombies[zomb].isDying) {
        if (z.x > player.x) {
          z.x -= z.speed;
          z.state = "LEFT";
        }else {
          z.x += z.speed;
          z.state = "RIGHT";
        }
      }
      if (z.y <  player.y - 5 && !zombies[zomb].isDying || z.y > player.y + 5 && !zombies[zomb].isDying){
        //if (z.y != player.y) {
          if (z.y > player.y) {
            z.y -= z.speed;
            z.img
          }else {
            z.y += z.speed;
          }
        //}
      }

      $(z.id).css ({
          "top": z.y  + "px",
          "left": z.x + "px",
          "width": z.width + "px",
          "height": z.height + "px",
          "src": z.imgSrc,
      })

      for (z in zombies) {

        if (!zombies[z].isDying) {

          if (player.y < zombies[z].y + zombies[z].height &&
            player.y + player.height >= zombies[z].y+zombies[z].height
          || player.y + player.height >= zombies[z].y && player.y <= zombies[z].y
          || player.y >= zombies[z].y && player.y + player.height <= zombies[z].y + zombies[z].height){

            if (player.x <= zombies[z].x+zombies[z].width &&
              player.x + player.width >= zombies[z].x+zombies[z].width
            || player.x + player.width >= zombies[z].x && player.x <= zombies[z].x
            || player.x >= zombies[z].x && player.x + player.width <= zombies[z].x + zombies[z].width) {
              if (player.life > 0) {
                player.life -= 0.1;
              }else {
                player.life = 0;
              }
            }
          }

        }

      }

    }
  }

}

function Bomb() {
  for (let zomb in zombies) {
    zHoleManager.createZombieHole(zombies[zomb].x, zombies[zomb].y);
      $(zombies[zomb].id).remove();
      zombies.splice(zomb, 1);
  }
}

function removeZombie(id) {
  for (let zomb in zombies) {
      if (zombies[zomb].id == id) {
        if (zombies[zomb].inside > 80) {
          powerUPManager.createPowerUP(zombies[zomb].x, zombies[zomb].y);
        }
        $(zombies[zomb].id).remove();
        zombies.splice(zomb, 1);
        return;
      }
  }
}
