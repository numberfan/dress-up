/**
 * Created by chenfan on 2017/2/20/0020.
 */

;(function () {

    'use strict';

    var eleTit = $(".hz-tit"), //类别
        eleCon = $(".hz-con"), //详情
        eleClean = $(".hz-clean"), //清空
        eleFinish = $(".hz-finish"), //完成
        eleWork = $(".hz-work"), //作品展示
        canvas = document.querySelector(".hz-paint"), //canvas
        context = canvas.getContext("2d"),
        canWidth = canvas.width,
        canHeight = canvas.height;

   var HuanZhuang = function() {
        if (eleTit.length !== eleCon.length) {
            console.error("the length of " + eleTit + "and the length of " + eleCon + "is not equal.");
            return;
        }
   };

    HuanZhuang.prototype = {
        paintCanvas: new Paint(),
        swipe: function() {
            eleTit.click(function() {
                var _ele = $(this),
                    _index = _ele.index();

                eleTit.removeClass("active");
                _ele.addClass("active");

                eleCon.removeClass("active");
                eleCon.eq(_index).addClass("active");
            });
        },
        change: function () {

            var self = this;

            eleCon.click(function (event) {
               var ele = event.target,
                   $ele = $(ele);

               if ($ele.hasClass("repeat")) {
                    var _type = $ele.attr("data-type"),
                        _x = $ele.attr("data-x"),
                        _y = $ele.attr("data-y");

                   self.paintCanvas.draw(_type, _x, _y);
               }
            });
        },
        clean: function () {
            var self = this;
            eleClean.click(function () {
                self.paintCanvas.reset();
            });
        },
        save: function () {
            var self = this;
            eleFinish.click(function () {
                self.paintCanvas.finish();
            });
        },
        init: function() {
            this.paintCanvas.draw();
            this.swipe();
            this.change();
            this.clean();
            this.save();
        }
    };
    
    function Paint() {

        var clothX = 1, //上衣
            clothY = 1,
            pantX = 2, //下装
            pantY = 1,
            decorX = 3, //佩饰
            decorY = 1;

        function person() {
            context.save();
            /*context.fillStyle = "#fff";
            context.fillRect(0, 0, canWidth, canHeight);*/
            context.fillStyle = "#e8e7e7";
            context.fillRect(50, 50, 200, 200);
            context.restore();
        }
        function clothes() {

            var _val = "上装" + clothX + "," + clothY;

            context.save();
            context.strokeText(_val, 30, 100);
            context.restore();
        }
        function pants() {

            var _val = "下装" + pantX + "," + pantY;

            context.save();
            context.strokeText(_val, 80, 100);
            context.restore();
        }
        function decorate() {

            var _val = "佩饰" + decorX + "," + decorY;

            context.save();
            context.strokeText(_val, 200, 100);
            context.restore();
        }
        function reset() {
            context.clearRect(0, 0, canWidth, canHeight);
            person();
        }

        return {
            reset: reset,
            draw: function (val, x, y) {
                if (val == "clothes") {
                    clothX = x;
                    clothY = y;
                } else if (val == "pants") {
                    pantX = x;
                    pantY = y;
                } else if (val == "decorate") {
                    decorX = x;
                    decorY = y;
                }

                reset();
                pants();
                clothes();
                decorate();
            },
            finish: function () {
                var url =  canvas.toDataURL();
                eleWork.attr("src", url);
            }
        };
    }


    var huan = new HuanZhuang();
    huan.init();
})();
