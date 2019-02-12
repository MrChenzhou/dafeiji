//子弹类
function Bullets() {
    "use strict";
    //子弹的编号
    this.id = parseInt(Math.random()*1000)+"";
    this.el = null;
    //创建一颗子弹,在游戏引擎里面都有登记;
    gameEngine.bullets[this.id] = this;
}
//初始化
Bullets.prototype.init = function () {
    this.el=document.createElement("div");
    this.el.className = "bullet";
    gameEngine.el.appendChild(this.el);
    //子弹有初始的位置,初始位置就是机头
    //(战机到父元素的距离+战机的自身的一半的宽度)-子弹的自身的一半的宽度
    this.el.style.left = (myPlane.el.offsetLeft+myPlane.el.offsetWidth/2)-this.el.offsetWidth/2+1+"px";
    this.el.style.bottom = myPlane.el.offsetHeight-5+"px";
    return this;
};
//移动
Bullets.prototype.move = function () {
    //每一个子弹都有自己的"发动机"
    var self = this;
    this.timer = setInterval(function () {
        self.el.style.top = self.el.offsetTop-10+"px";
        if (self.el.offsetTop<=0){
            clearInterval(self.timer);
            self.boom();
        }

    },30)
};
Bullets.prototype.boom = function () {
    var self = this;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        self.el.style.backgroundImage=`url(./images/die${index}.png)`;
        if (index>=2){
            clearInterval(timer);
            self.el.remove();
            gameEngine.bullets.splice(self.id,1);
        }
    })
}