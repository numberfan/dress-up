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
                        _index = parseInt($ele.index());

                    self.paintCanvas.draw(_type, _index);
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

        /*
         [开始剪切的 x 坐标位置, 开始剪切的 y 坐标位置
         被剪切图像的宽度，被剪切图像的高度，
         在画布上放置图像的 x 坐标位置，在画布上放置图像的 y 坐标位置]
         */
        var decorateArr = [ //头饰
                [0, 0, 134, 82, 18, 30],
                [145, 0, 131, 148, 20, 5],
                [284, 0, 163, 181, 9, 15],
                [456, 11, 110, 51, 27, 60],
                [587, 10, 136, 86, 20, 30],
                [763, 11, 120, 60, 28, 55],
            ],
            clothesArr = [ //裙子
                [3, 207, 64, 82, 60, 185],
                [145, 207, 113, 85, 40, 185],
                [308, 207,  115, 114, 43, 185],
                [461, 207, 104, 100, 40, 183],
                [616, 207, 103, 81, 43, 184],
                [795, 207, 92, 111, 46, 184],
            ],
            shoesArr = [ //鞋子
                [3, 365, 45, 21, 77, 314],
                [145, 349, 64, 73, 64, 260],
                [308, 349, 59, 62, 68, 270],
                [461, 349, 65, 75, 61, 262],
                [616, 349, 55, 44, 72, 290],
                [795, 349, 47, 23, 77, 314],
            ],
            //各搭配的索引
            decorateIndex = -1,
            clothesIndex = -1,
            shoesIndex = -1;

        function person() {

            var img = new Image();
            img.src = "assets/images/base-girl.png";
            img.onload = function () {
                var _x = (canWidth - img.width)/2,
                    _y = (canHeight - img.height)*3/4;
                context.drawImage(img, _x, _y);
            };
        }

        function drawImage(arr, index) {

            if (!arr || index < 0 || index > arr.length) {
                return;
            }

            var img = new Image();
            img.src = "assets/images/sprite-clothes.png";
            img.onload = function () {
                /*
                 drawImage(image, sx, sy, swidth, sheight, x, y, width, height)
                 sx:开始剪切的 x 坐标位置
                 sy:开始剪切的 y 坐标位置
                 swidth: 被剪切图像的宽度
                 sheight: 被剪切图像的高度
                 x:在画布上放置图像的 x 坐标位置
                 y:在画布上放置图像的 y 坐标位置
                 width:要使用的图像的宽度
                 height: 要使用的图像的高度
                 */
                context.drawImage(img,
                    arr[index][0], arr[index][1],
                    arr[index][2], arr[index][3],
                    arr[index][4], arr[index][5],
                    arr[index][2], arr[index][3]
                );
            };
        }

        function reset() {
            context.clearRect(0, 0, canWidth, canHeight);
            person(context);
        }


        return {
            reset: reset,
            draw: function (val, index) {

                if (val == "clothes") {
                    clothesIndex = index;
                } else if (val == "shoes") {
                    shoesIndex = index;
                } else if (val == "decorate") {
                    decorateIndex = index;
                }

                reset();
                person();
                drawImage(shoesArr, shoesIndex);
                drawImage(clothesArr, clothesIndex);
                drawImage(decorateArr, decorateIndex);

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
