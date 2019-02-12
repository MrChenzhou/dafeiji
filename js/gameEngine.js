window.gameEngine = (function (window) {
    return {
        el:null,
        bullets : [],
        enemys : [],
        init(){
            this.el = document.querySelector("#main_body");
            return this;
        },
        //1.开始游戏
        start(){
            "use strict";
            this.el.innerHTML = "";
            //2.开始游戏,加载进度条
            this.loading(function () {
                //5.移除页面的进度条和logo
                gameEngine.el.innerHTML = "";
                //6.创建我们的飞机
                myPlane.init();
                //7.按键控制位置
                gameEngine.keyController();
                //8.疯狂的发射子弹
                myPlane.fire();
                gameEngine.createEnemy();
                gameEngine.testing();

            });

        },

        loading : function (callback) {
            //3.创建飞机大战的logo
            var logo = document.createElement("div");
            this.el.appendChild(logo);
            logo.classList.add("logo");

            //4.创建进度条
            var loading = document.createElement("div");
            this.el.appendChild(loading);
            loading.className = "loading";
            let g = this;
            var index = 0;
            var timer = setInterval(function () {
                index++;
                loading.style.backgroundImage = `url(images/loading${(index%3)+1}.png)`;
                if (index>=5){
                    clearInterval(timer);
                    if (callback){
                        callback.bind(g)();
                    }
                }

            },200);
        },
        //7.键盘控制位置
        keyController(){
            "use strict";
            window.onkeydown = function(evt){
                var e = evt || window.event;
                //向左移动
                if (e.keyCode == 37){
                    if (myPlane.el.offsetLeft<0){
                        return;
                    }
                    myPlane.el.style.left = myPlane.el.offsetLeft - 10 +"px";
                }
                if (e.keyCode == 39){
                    var maxMove = gameEngine.el.offsetWidth - myPlane.el.offsetWidth;
                    if (myPlane.el.offsetLeft >= maxMove){
                        return;
                    }
                    myPlane.el.style.left = myPlane.el.offsetLeft + 10 +"px";
                }
            }
        },
        createEnemy(){
            "use strict";
            setInterval(function () {
                var en = new Enemys().init();
                en.move();
            },1000)
        },
        testing(){
            "use strict";
            var timer = setInterval(function () {
                //1.敌机与我们的飞机
                for (var ee in gameEngine.enemys){
                    var flag1 = crashTest(gameEngine.enemys[ee].el,myPlane.el);
                    if (flag1){
                        clearInterval(timer);
                        gameEngine.enemys[ee].boom();
                        myPlane.boom();
                        alert("游戏结束");//游戏结束,把定时器清除一下
                        window.location.reload(true);
                        break;
                    }
                }
                //2.敌机与子弹
                //短循环放外层
                //长循环放内层
                for (var bb in gameEngine.bullets){
                    for (var ee in gameEngine.enemys){
                        var flag2 = crashTest(gameEngine.bullets[bb].el,gameEngine.enemys[ee].el);
                        if (flag2){
                            gameEngine.bullets[bb].boom();
                            gameEngine.enemys[ee].hurt();
                        }
                    }
                }

            })
        }
    }
})(window);