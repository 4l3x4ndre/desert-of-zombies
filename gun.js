let bulletId = 0;

function Gun() {
  this.bullets = [];
  this.loadingTime = 300;
  this.loading = null;

  this.createBullet = function() {

    let el = document.createElement('img');
    el.setAttribute("src", './Images/bullet.png')
    el.setAttribute('class', 'bullet');
    el.setAttribute('id', 'bullet' + bulletId);
    el.setAttribute('style', `z-index: 10;`);
    let obj = {
      id: "#bullet"+ bulletId,
      getID: "bullet" + bulletId,
      x: player.x+player.width/2.5-5,
      y: player.y+player.height/2-5,
      speed: 15,
      elt: el,
      direction: player.state,
      height: 10,
      width: 10
    }
    this.bullets.push(obj);
    document.getElementById("playground").appendChild(el);
    bulletId += 1;

  }

  this.moveBullets = function() {
    let bulletsRemove = [];
    for (let bul in this.bullets) {
      let b = this.bullets[bul];

      if (b.direction == "RIGHT") {
        if (b.x > 500) {
          bulletsRemove.push(bul);
        }
        b.x += b.speed;
        document.getElementById(b.getID).src="./Images/bulletH.png";
      }else if (b.direction == "LEFT") {
        if (b.x < 0) {
          bulletsRemove.push(bul);
        }
        b.x -= b.speed;
        document.getElementById(b.getID).src="./Images/bulletH.png";
      }else if (b.direction == "DOWN") {
        if (b.y > 500) {
          bulletsRemove.push(bul);
        }
        b.y += b.speed;
      }else if (b.direction == "UP") {
        if (b.y < 0) {
          bulletsRemove.push(bul);
        }
        b.y -= b.speed;
      }

      $(b.id).css ({
          "top": b.y  + "px",
          "left": b.x + "px",
          "width": b.width + "px",
          "height": b.height + "px",
      })

      for (let z in zombies) {
        if (!zombies[z].isDying) {
          if (b.y < zombies[z].y + zombies[z].height &&
            b.y + b.height >= zombies[z].y+zombies[z].height
          || b.y + b.height >= zombies[z].y && b.y <= zombies[z].y
          || b.y >= zombies[z].y && b.y + b.height <= zombies[z].y + zombies[z].height
          ){

            if (b.x <= zombies[z].x+zombies[z].width &&
              b.x + b.width >= zombies[z].x+zombies[z].width
            || b.x + b.width >= zombies[z].x && b.x <= zombies[z].x
            || b.x >= zombies[z].x && b.x + b.width <= zombies[z].x + zombies[z].width) {
                  bulletsRemove.push(bul);
                  zHoleManager.createZombieHole(zombies[z].x, zombies[z].y);
                  removeZombie(zombies[z].id);
                  player.score += 1;
                  nbZombie -= 1;
                  /*zombies[z].isDying = true;
                  document.getElementById(zombies[z].getId).src='./Images/deadZombie.png';
                  zombies[z].removeDate = Date.now() + 500;*/
                  //removeZombie(zombies[z].id);
                  //setTimeout (removeZombie)
                  /*setTimeout(function() {
                      removeZombie(zombies[z].id);
                      $(zombies[z].id).remove();
                      zombies.splice(z, 1);
                      //$(zombies[z].id).remove();
                      //zombies.splice(z, 1);
                  }, 500)*/
            }
          }
      }

      }

    }

    bulletsRemove.reverse();
    for (i in bulletsRemove) {
      $(this.bullets[ bulletsRemove[i] ].id).remove();
      this.bullets.splice(bulletsRemove[i], 1);

    }

  }

  this.fire = function() {
    if (this.loading) {
      return;
    }

    this.createBullet();
    shootSound = new Sound("", false);
    shootSound = new Sound("./shot.mp3", false);
    shootSound.play();
    this.loading = setTimeout(this.readyToFire.bind(this), this.loadingTime);
  }

  this.readyToFire = function() {
    this.loading = null;
  }

  this.rapidFire = function()  {
    this.loadingTime -= 50;
    setTimeout(this.normalMode, 500);
  }

  this.normalMode = function() {
    this.loadingTime = 300;
  }


}
