//子弹类
class Bullets{
    constructor(){
        this.el = null;
        this.id = parseInt(Math.random()*1000)+"";
        gameEngine.bullets[this.id] = this;
    }
    init(){
        this.el = document.createElement("div");
        this.el.className = "bullet";
        gameEngine.el.appendChild(this.el);
        //位置
        this.el.style.left = myPlane.el.offsetLeft+myPlane.el.offsetWidth/2-this.el.offsetWidth/2+"px";
        this.el.style.bottom = myPlane.el.offsetHeight+"px";
         return this;
    }
    move(){
        this.timer = setInterval(()=>{
            this.el.style.top = this.el.offsetTop-5+"px";
            if (this.el.offsetTop<=0){
                clearInterval(this.timer);
                this.boom();
            }
        },10)
    }
    boom(){
        this.el.className = "bullet-die";
        var num = 0;
        var timer = setInterval(()=>{
            num++;
            this.el.style.backgroundImage=`url(images/die${num}.png)`;
            this.el.style.backgroundSize = "100%";

            if (num==2){
                clearInterval(timer);
                this.el.remove();
                gameEngine.bullets.splice(this.id,1);
            }
        },40);
    }
}