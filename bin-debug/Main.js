//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        //显示对象
        // let shape: egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0x0000ff);
        // shape.graphics.drawRect(0, 0, 200, 200);
        // shape.graphics.endFill();
        // shape.x = 100;
        // shape.y = 20;
        // shape.scaleX = 0.5;
        // shape.scaleY = 0.5; //如果对位图进行缩放或拉伸，图像会发生模糊。
        // shape.alpha = 0.4;  //alpha取值范围为 0-1
        // shape.rotation = 30;//旋转30°，注意是角度不是弧度
        // this.addChild(shape);
        /** 常用的可视属性
         *  alpha：透明度
            width：宽度
            height：高度
            rotation：旋转角度
            scaleX：横向缩放
            scaleY：纵向缩放
            skewX：横向斜切
            skewY：纵向斜切
            visible：是否可见
            x：X轴坐标值
            y：Y轴坐标值
            anchorOffsetX：对象绝对锚点X
            anchorOffsetY：对象绝对锚点Y
        
            核心显示类
            DisplayObject	显示对象基类，所有显示对象均继承自此类
            Bitmap	位图，用来显示图片
            Shape	用来显示矢量图，可以使用其中的方法绘制矢量图形
            TextField	文本类
            BitmapText	位图文本类
            DisplayObjectContainer	显示对象容器接口，所有显示对象容器均实现此接口
            Sprite	带有矢量绘制功能的显示容器
            Stage	舞台类
         */
        //自定义显示对象
        // let _myGrid = new MyGrid(150);
        // this.addChild(_myGrid);
        //自定义容器
        // let _myGrid = new GridSprite(150);
        // this.addChild(_myGrid);
        //变换操作
        // let _anchorTest = new AnchorTest();
        // this.addChild(_anchorTest);
        //坐标系统
        // let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // container.x = 200;
        // container.y = 200;
        // this.addChild(container);
        // //红色的圆
        // let circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0xff0000);
        // circle.graphics.drawCircle(25, 25, 25);
        // circle.graphics.endFill();
        // container.addChild(circle);
        // //给圆增加点击事件
        // circle.touchEnabled = true;
        // circle.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, this);
        // let isOrigin: boolean = true;
        // function onClick() {
        //     if (isOrigin) {
        //         let targetPoint: egret.Point = container.globalToLocal(0, 0);
        //         container.addChild(circle);
        //         circle.x = targetPoint.x;
        //         circle.y = targetPoint.y;
        //         isOrigin = false;
        //     }
        //     else {
        //         let targetPoint: egret.Point = container.localToGlobal(0, 0);
        //         this.addChild(circle);
        //         circle.x = targetPoint.x;
        //         circle.y = targetPoint.y;
        //         isOrigin = true;
        //     }
        // }
        //平移        
        // let offsetX: number;
        // let offsetY: number;
        // //一个圆
        // let circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0xff0000);
        // circle.graphics.drawCircle(50, 50, 50);
        // circle.graphics.endFill();
        // this.addChild(circle);
        // //可移动
        // circle.touchEnabled = true;
        // //监听移动开始，停止事件
        // circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        // circle.addEventListener(egret.TouchEvent.TOUCH_END, endMove, this);
        // function startMove(e: egret.TouchEvent) {
        //     circle.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        //     offsetX = e.stageX - circle.x;
        //     offsetY = e.stageY - circle.y;
        //     circle.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        // }
        // function onMove(e: egret.TouchEvent) {
        //     circle.x = e.stageX - offsetX;
        //     circle.y = e.stageY - offsetY;
        // }
        // function endMove(e: egret.TouchEvent) {
        //     circle.removeEventListener(egret.TouchEvent.TOUCH_END, endMove, this);
        // }
        //添加与删除显示对象
        // let shape: egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0xff0000);
        // shape.graphics.drawRect(0, 0, 100, 100);
        // shape.graphics.endFill();
        // this.addChild(shape);        //显示对象的坐标系是相对坐标系，而非绝对坐标系。相对于父级原点的位置。
        // shape.touchEnabled = true;   //同一个显示对象无论被代码加入显示列表多少次，在屏幕上只绘制一次。
        // shape.addEventListener(egret.TouchEvent.TOUCH_TAP, remove, this);
        // function remove(e: egret.TouchEvent) {
        //     //该对象存在，但已被移除显示列表，画面上不显示，驻于内存中
        //     //最佳的删除方式
        //     if (shape.parent) {
        //         this.removeChild(shape);
        //     }
        // }
        //深度管理
        // let spr1: egret.Sprite = new egret.Sprite();
        // spr1.graphics.beginFill(0xff0000);
        // spr1.graphics.drawRect(0, 0, 100, 100);
        // spr1.graphics.endFill();
        // this.addChild(spr1);
        // let spr2: egret.Sprite = new egret.Sprite();
        // spr2.graphics.beginFill(0x00ff00);
        // spr2.graphics.drawRect(0, 0, 80, 80);
        // spr2.graphics.endFill();
        // this.addChild(spr2);
        // spr2.x = 50;
        // spr2.y = 50;
        //添加指定深度的对象：容器.addChild( 显示对象 )、容器.addChildAt( 显示对象, 深度值 )
        //删除指定深度的对象：容器.removeChild( 显示对象 )、容器.removeChildAt( 深度值 )
        //使用 容器.removeChildren() 方法可以将当前容器内的所有子对象全部移除显示列表。
        //当前容器的子对象数量。容器.numChildren 属性
        //交换不同深度对象：容器.swapChildren( 显示对象, 显示对象 )、容器.swapChildrenAt( 深度值, 深度值 )
        //重设子对象深度：容器.setChildIndex( 显示对象, 新的深度值 )
        //访问容器子对象（DisplayObject好用），比下面方法快：let _spr:egret.DisplayObject = 容器.getChildAt( 深度值 )
        //getChildByName要事先设置子对象的name属性：let _spr:egret.DisplayObject = 容器.getChildByName(显示对象)
        // let sprcon: egret.Sprite = new egret.Sprite();
        // this.addChild(sprcon);
        // sprcon.x = 50;
        // for (let i = 0; i < 4; ++i) {
        //     let spr: egret.Shape = new egret.Shape();
        //     spr.graphics.beginFill(0xffffff * Math.random());
        //     spr.graphics.drawRect(0, 0, 100, 100);
        //     spr.graphics.endFill();
        //     sprcon.addChild(spr);
        //     spr.x = i * 20;
        // }
        // let sprNew: egret.Sprite = new egret.Sprite();
        // sprNew.graphics.beginFill(0xff0000);
        // sprNew.graphics.drawRect(0, 0, 300, 150);
        // sprNew.graphics.endFill();
        // sprNew.x = 10;
        // sprNew.y = 50;
        // sprcon.addChildAt(sprNew, 1);
        //使用矢量绘图
        var shp = new egret.Shape();
        this.addChild(shp);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map