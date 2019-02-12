//敌人飞机
class Enemy{
    constructor(){
        this.el = null;
        this.id = parseInt(Math.random()*1000);
        this.hp = 1;
    }
    init(){
        this.el = document.createElement("div");
        this.el.className = "enemy-small";
        gameEngine.el.appendChild(this.el);
        this.el.style.top = "0px";
        this.el.style.left = (gameEngine.el.offsetWidth-this.el.offsetWidth)*Math.random()+"px";
        gameEngine.enemys[this.id] = this;
        return this;
    }
    move(){
        this.timer = setInterval(()=>{
            this.el.style.top = this.el.offsetTop+5+"px";
            if (this.el.offsetTop>=gameEngine.el.offsetHeight){
                clearInterval(this.timer);
                delete (gameEngine.enemys[this.id]);
            }
        },100)
    }
    hurt(){
        this.hp--;
        if (this.hp<=0){
            this.boom();//掉血就爆炸
        }
    }
    boom(){
        var num = 0;
        var timer = setInterval(()=>{
            num++;
            this.el.style.backgroundImage = `url(./images/plane1_die${num}.png)`;
            if (num == 3){
                this.el.remove();
                clearInterval(timer);
                delete (gameEngine.enemys[this.id]);
            }
        },30);
    }
}