zHoleId = 0;

function ZombieHole() {
  this.zombiesHole = [];

  this.createZombieHole = function(x, y) {
      let e = document.createElement('img');
      e.setAttribute('src', './Images/deadZombie.png');
      e.setAttribute('id', 'hole' + zHoleId);
      e.setAttribute('style', `top: ${y}px; left: ${x}px; z-index: 1000; width: 20px; height: 38px; position: absolute`);
      let o = {
        id: "#hole"+zHoleId,
        speed: 10,
        width: 15,
        height: 15,
        x: x,
        y: y,
        directionX: 1,
        directionY: 1,
        elt: e
      }
      this.zombiesHole.push(o);
      document.getElementById("playground").appendChild(e);
      let destroyTimer = setTimeout(this.destroyHole.bind(this), 500, o.id);
    }

    /// Destroy a explosion
    this.destroyHole = function(id) {
      for (h in this.zombiesHole) {
        if (this.zombiesHole[h].id == id) {
          $(this.zombiesHole[h].id).remove();
          this.zombiesHole.splice(h, 1);
        }
      }
    }


}
