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

            })

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
        }
    }
})();