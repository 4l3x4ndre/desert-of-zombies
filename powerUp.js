let powerId = 0;

function Power() {
  this.powersUP = [];

  this.createPowerUP = function(x, y) {
    posX = x;
    posY = y;
    let el = document.createElement('img');
    el.setAttribute('class', 'power');
    el.setAttribute('id', 'power' + powerId);
    nb = Math.random()*100;
    s = "";
    if (nb > 66) {
      s = "Health";
    }else if (nb > 33) {
      s = "Ammo";
    }else if (nb >= 0) {
      s = "Bomb";
    }
    el.setAttribute('style', 'left: ${posX}px; top: ${posY}px; width: 10px; height:10px;z-index: 100; position: absolute;');
    let obj = {
      id: "#power"+ powerId,
      getID: "power" + powerId,
      x: x,
      y: y,
      speed: 15,
      elt: el,
      height: 15,
      width: 20,
      speciality: s
    }
    this.powersUP.push(obj);
    document.getElementById("playground").appendChild(el);
    if (s == "Health") {
      document.getElementById("power"+powerId).src='./Images/medicKit.png';
    } else if (s == "Ammo") {
      document.getElementById("power"+powerId).src='./Images/rapidFire.png';
    }else if (s == "Bomb") {
        document.getElementById("power"+powerId).src='./Images/bomb.png';
    }
    $(obj.id).css ({
        "width": obj.width+"px",
        "height": obj.height+"px",
    })
    $(obj.id).css ({
        "top": y  +"px",
        "left": x +"px",
    })
    powerId += 1;

  }

  this.removePowerUp = function(id) {
    for (let p in this.powersUP) {
        if (this.powersUP[p].id == id) {
          $(id).remove();
          this.powersUP.splice(p, 1);
          return;
        }
      }
  }
}
