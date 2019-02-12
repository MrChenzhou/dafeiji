window.myPlane = (function () {
    return {
        el:null,
        sendSpeed : 0,
        //6.初始化我们的飞机
        init() {
            "use strict";
            this.el = document.createElement("div");
            gameEngine.el.appendChild(this.el);
            this.el.className = "myplane";

            this.el.style.left = (gameEngine.el.offsetWidth/2-this.el.offsetWidth/2)-2+"px";
            this.el.style.bottom = "0px";
            return this;
        },
        fire(){
            "use strict";
            setInterval(function () {
                new Bullets().init().move();

            },this.sendSpeed);
        },
        boom(){
            "use strict";
            var num = 0;
            this.timer = setInterval(()=>{
                num++;
                this.el.style.backgroundImage = `url(images/me_die${num}.png)`;
                if (num>=4){
                    clearInterval(this.timer);
                    this.el.remove();
                }
            },100)
        }
    }
})();
