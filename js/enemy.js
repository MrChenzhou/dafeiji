//敌人飞机
function Enemys() {
    this.id = parseInt(Math.random()*1000)+"";
    this.el = null;
    this.hp = 1;
    gameEngine.enemys[this.id] = this;
    
}

Enemys.prototype.init = function () {
    this.el = document.createElement("div");
    gameEngine.el.appendChild(this.el);
    this.el.className = "enemy-small";
    this.el.style.top = "0px";
    this.el.style.left = (Math.random() * (gameEngine.el.offsetWidth-this.el.offsetWidth))+"px";
    
    return this;
};

Enemys.prototype.move = function () {
    var num = 5;
    this.timer = setInterval(()=>{
        "use strict";
        this.el.style.top = this.el.offsetTop + num +"px";
        if (this.el.offsetTop>gameEngine.el.offsetHeight-this.el.offsetHeight) {
            clearInterval(this.timer);
            this.el.remove();
            delete (gameEngine.enemys[this.id]);
        }
    },30)
};

//伤害
Enemys.prototype.hurt = function () {
    this.hp--;
    if (this.hp==0){
        this.boom();
    }
};

Enemys.prototype.boom = function () {
    var num = 0;
    var timer = setInterval(()=>{
        "use strict";
        num++;
        this.el.style.backgroundImage = `url(images/plane1_die${num}.png)`;
        if (num == 3){
            clearInterval(timer);
            this.el.remove();
            delete (gameEngine.enemys[this.id]);
        }
    },100)
}