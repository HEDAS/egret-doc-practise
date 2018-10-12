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

class Main extends eui.UILayer {

    /**
     * TODO: 自己写一遍游戏设计模式的代码，可以原创
     * TODO: 搞懂JS、TS原型链
     * TODO: 自定义字体的问题
     * TODO: 多看项目
     * TODO: 网路那一章的内容先跳过不看
     * TODO: 数据库，服务器端，美术资源
     * TODO: 小游戏最后搞明白！
     */

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
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
        // let shp: egret.Shape = new egret.Shape();
        // this.addChild(shp);
        // shp.graphics.lineStyle(10, 0x00ff00);//10要除以一半才是真正的边框宽
        // shp.graphics.beginFill(0xff0000, 1);
        // shp.graphics.drawRect(5, 5, 100, 100);//矩形
        // shp.graphics.drawCircle(165, 55, 50);//圆形
        // shp.graphics.moveTo(225, 55);//直线
        // shp.graphics.lineTo(325, 55);
        // shp.graphics.moveTo(335, 55);
        // shp.graphics.curveTo(435, 155, 535, 105);//曲线不能用beginFill来填充颜色
        // shp.graphics.drawArc(55, 165, 50, 0, Math.PI, true);//用弧度来表示
        // shp.graphics.endFill();



        //高级绘图
        // let shp: egret.Shape = new egret.Shape();
        // this.addChild(shp);
        // shp.graphics.lineStyle(10, 0xff0000);
        // shp.graphics.drawArc(55, 55, 50, 0, Math.PI / 180 * 60, false);//圆弧
        // shp.graphics.lineStyle(0, 0xff0000);
        // shp.graphics.beginFill(0x00ff00);
        // shp.graphics.drawArc(165, 55, 50, 0, Math.PI / 180 * 120, false);//圆弧，填充
        // shp.graphics.endFill();



        //扇形
        // let sectorX = 275;
        // let sectorY = 55;
        // let radius = 50;
        // shp.graphics.beginFill(0x0000ff);
        // shp.graphics.moveTo(sectorX, sectorY);
        // shp.graphics.lineTo(sectorX + radius, sectorY);
        // shp.graphics.drawArc(sectorX, sectorY, radius, 0, Math.PI / 180 * 120);
        // shp.graphics.lineTo(sectorX, sectorY);
        // shp.graphics.endFill()



        //弧形进度条
        // let shp: egret.Shape = new egret.Shape();
        // this.addChild(shp);     //要添加，否则没有画面
        // let angle: number = 270;
        // egret.startTick(function (timeStamp: number): boolean {
        //     angle += 1;
        //     angle = angle % 360;
        //     changeGraphics(angle);
        //     return true;
        // }, this);

        // function changeGraphics(angle) {
        //     shp.graphics.clear();   //回调函数画图一般要先clear
        //     shp.graphics.lineStyle(10, 0xff0000);
        //     shp.graphics.drawArc(105, 105, 100, Math.PI / 180 * 270, Math.PI / 180 * angle);    //要用弧度
        //     shp.graphics.endFill()
        // }



        //扇形进度条
        // let shp: egret.Shape = new egret.Shape();
        // this.addChild(shp);
        // let angle: number = 270;
        // egret.startTick(function (timeStamp: number): boolean {
        //     angle += 1;
        //     angle %= 360;
        //     drawGraphics(angle);
        //     return true;
        // }, this);

        // function drawGraphics(angle) {
        //     shp.graphics.clear();
        //     shp.graphics.beginFill(0xff0000);
        //     shp.graphics.moveTo(100, 100);
        //     shp.graphics.lineTo(100, 0);
        //     shp.graphics.drawArc(100, 100, 100, Math.PI / 180 * 270, Math.PI / 180 * angle, false);
        //     shp.graphics.lineTo(100, 100);
        //     shp.graphics.endFill()
        // }



        //不规则进度条，mask 很消耗 cpu，建议少用不停修改 mask 的方式做动画。
        // let demo: egret.Bitmap = this.createBitmapByName("GraphicsDemo_png");
        // this.addChild(demo);
        // demo.x = 100;
        // demo.y = 100;

        // let width = demo.width;
        // let height = demo.height;
        // let radius = Math.max(width, height) / 2 * 1.5;

        // let shp: egret.Shape = new egret.Shape();
        // demo.mask = shp;
        // this.addChild(shp); //shp要添加才有效

        // let angle: number = 0;

        // egret.startTick(function (timeStamp: number): boolean {
        //     angle += 1;
        //     angle %= 360;
        //     drawGraphics(angle);
        //     return true;
        // }, this);

        // function drawGraphics(angle) {
        //     shp.graphics.clear()
        //     shp.graphics.beginFill(0xff0000);
        //     shp.graphics.moveTo(100 + width / 2, 100 + height / 2);
        //     shp.graphics.lineTo(100 + width / 2 + radius, 100 + height / 2);
        //     shp.graphics.drawArc(100 + width / 2, 100 + height / 2, radius, 0, angle * Math.PI / 180, true);//这个要用弧度
        //     shp.graphics.lineTo(100 + width / 2, 100 + height / 2);
        //     shp.graphics.endFill();
        // }



        //矩形遮罩，不用this.addChild()
        // let shp: egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0xff0000);
        // shp.graphics.drawRect(0, 0, 100, 100);
        // shp.graphics.endFill();
        // this.addChild(shp);
        // let shp2: egret.Shape = new egret.Shape();
        // shp2.graphics.beginFill(0x00ff00);
        // shp2.graphics.drawCircle(0, 0, 20);
        // shp2.graphics.endFill();
        // this.addChild(shp2);
        // shp2.x = 20;
        // shp2.y = 20;

        // let rect: egret.Rectangle = new egret.Rectangle(20, 20, 30, 50);
        // shp.mask = rect;



        //显示对象遮罩
        // let square: egret.Shape = new egret.Shape();
        // this.addChild(square);
        // square.graphics.beginFill(0xff0000);
        // square.graphics.drawRect(0, 0, 200, 200);
        // square.graphics.endFill();
        // let circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0x00ff00);
        // circle.graphics.drawCircle(50, 50, 30);
        // circle.graphics.endFill();
        // // this.addChild(circle);
        // square.mask = circle;
        // square.mask = null;//删除遮罩



        //碰撞检测，跟宽和高无关
        // let shp: egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0xff0000);
        // shp.graphics.drawRect(0, 0, 100, 100);
        // shp.graphics.endFill();
        // this.addChild(shp);
        // console.log(shp.hitTestPoint(100, 100));//true
        // console.log(shp.hitTestPoint(101, 101));//false
        // shp.width = 50;
        // shp.height = 50;
        // console.log(shp.hitTestPoint(100, 100));//true
        // console.log(shp.hitTestPoint(101, 101));//false
        // let shp2: egret.Shape = new egret.Shape();
        // shp2.graphics.beginFill(0x00ff00);
        // shp2.graphics.drawCircle(0, 0, 100);
        // shp2.graphics.endFill();
        // this.addChild(shp2);//像素判定有些奇怪
        // console.log(shp2.hitTestPoint(100, 100));//true
        // console.log(shp2.hitTestPoint(101, 101));//true
        // console.log(shp2.hitTestPoint(102, 102));//true
        // console.log(shp2.hitTestPoint(103, 103));//false



        //像素碰撞检测hitTestPoint的第三个参数为true
        // let shp: egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0xff0000);
        // shp.graphics.drawCircle(0, 0, 20);
        // shp.graphics.endFill();
        // this.addChild(shp);
        // var isHit: boolean = shp.hitTestPoint(19, 19, true);
        // console.log(isHit);



        //文本类型，默认是白色
        // let label: egret.TextField = new egret.TextField();
        // this.addChild(label);
        // label.text = "张家俊";
        // label.textColor = 0x000000;
        // label.type = egret.TextFieldType.INPUT;//不能换行，设置宽和高也不行
        // label.width = 282;
        // label.height = 43;
        // let button: egret.Shape = new egret.Shape();
        // this.addChild(button);
        // button.graphics.beginFill(0x00ff00);
        // button.graphics.drawRect(0, 50, 100, 50);
        // button.graphics.endFill();
        // button.touchEnabled = true;
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {//跟TouchTap的效果不一样
        //     label.setFocus();
        // }, this);



        //普通文本（默认），密码和电话号
        // let input: egret.TextField = new egret.TextField();
        // this.addChild(input);
        // input.type = egret.TextFieldType.INPUT;
        // input.inputType = egret.TextFieldInputType.PASSWORD;
        // input.inputType = egret.TextFieldInputType.TEL;//所有用户输入最好格式化一下，免得恶意代码



        //位图文本
        // RES.getResByUrl('resource/cool.fnt', complete, this, RES.ResourceItem.TYPE_FONT);
        // function complete(font: egret.BitmapFont) {
        //     let bitmapText: egret.BitmapText = new egret.BitmapText();
        //     bitmapText.font = font;
        //     bitmapText.text = "旋风大烈斩";
        //     bitmapText.scaleX = 2;
        //     bitmapText.scaleY = 2;
        //     this.addChild(bitmapText);
        // }



        //文本样式，egret.TextField 的对象自身尺寸会根据首次设置的文本内容自动计算。
        // let label: egret.TextField = new egret.TextField();
        // this.addChild(label);
        // label.strokeColor = 0xffffff;
        // label.stroke = 5;
        // label.fontFamily = "楷体";//设置字体
        // label.size = 60;//大小
        // label.textColor = 0x0000ff;//颜色
        // label.width = this.stage.stageWidth;
        // label.height = this.stage.stageHeight;
        // label.textAlign = egret.HorizontalAlign.CENTER;//一个是center，一个是middle
        // label.verticalAlign = egret.VerticalAlign.MIDDLE;//这两个要设置宽和高

        // //文本的加粗和斜体适用与整体 egret.TextField 对象，不能单独设置 egret.TextField 中某一个文字或一段文字。
        // label.bold = true;
        // label.italic = true;

        // console.log(egret.TextField.default_size, egret.TextField.default_textColor, egret.TextField.default_fontFamily);
        // label.text = "旋风大裂斩";



        //多种文本样式：json——基本结构接口egret.ITextElement，此结构是这样的
        //借口结构 interface ITextElement {
        //借口结构     text: string;
        //借口结构     style: ITextStyle; 
        //借口结构 }
        //注意：换行直接用 “\n” 即可。
        // let tx: egret.TextField = new egret.TextField();
        // tx.textFlow = <Array<egret.IWTextElement>>[
        //     { text: "你好", style: { textColor: 0xff0000, size: 30 } },
        //     { text: "\n世界", style: { textColor: 0x00ff00, size: 30 } },
        // ];
        // this.addChild(tx);



        //多种文本样式：类html
        // let tx: egret.TextField = new egret.TextField();
        // this.addChild(tx);
        // tx.fontFamily = "微软雅黑";
        // tx.textFlow = (new egret.HtmlTextParser()).parse(
        //     '<font color=0xff0000 size=30>你好</font>' +
        //     '<font>\n</font>' +
        //     '<font color=0x00ff00 size=30>世界</font>'
        // );



        //响应一大段文字的某一部分，用json方法实现
        // let tx: egret.TextField = new egret.TextField();
        // tx.textFlow = <Array<egret.IWTextElement>>[
        //     { text: "你好\n", style: { textColor: 0xff0000, size: 30, href: "event:我点击了“你好”" } },
        //     { text: "世界", style: { textColor: 0x00ff00, size: 30, href: "event:我点击了“世界”" } },
        // ];
        // tx.touchEnabled = true;//还要设置可点击
        // this.addChild(tx);
        // //监听egret.TextEvent.LINK事件
        // tx.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
        //     console.log(evt.text);
        // }, this);



        //打开URL，用json方法实现
        // let tx: egret.TextField = new egret.TextField();
        // tx.textFlow = <Array<egret.IWTextElement>>[
        //     { text: "你好\n", style: { textColor: 0xff0000, size: 30, href: "https://www.bilibili.com" } },
        //     { text: "世界", style: { textColor: 0x00ff00, size: 30, href: "https://www.zhihu.com" } },
        // ];
        // tx.touchEnabled = true;//还要设置可点击
        // this.addChild(tx);
        // //监听egret.TextEvent.LINK事件
        // tx.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
        //     console.log(evt.text);
        // }, this);



        //事件例子
        //定义消息面板：
        // this.showMsg = new egret.TextField();
        // this.addChild(this.showMsg);
        // this.showMsg.width = this.stage.stageWidth;
        // this.showMsg.height = this.stage.stageHeight;

        // let boy = new Boy("工藤新一");//发送者
        // let gril = new Gril("毛利兰");//接收者

        // // 检测某一个事件发送者是否注册了侦听器
        // // 方法一
        // console.log(boy.hasEventListener(DateEvent.Data));

        // // 方法二
        // console.log(boy.willTrigger(DateEvent.Data));

        // // 使用事件发送者的 addEventListener() 将相应的事件分配给侦听器。
        // boy.addEventListener(DateEvent.Data, gril.show, gril);         //只有事件的发送者才可以注册侦听器
        // // useCapture: 确定侦听器是运行于捕获阶段还是运行于冒泡阶段，可选。
        // // 设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。
        // // 设置为 false，则侦听器只在冒泡阶段处理事件。

        // // priority： 事件侦听器的优先级，可选。优先级由一个带符号的整数指定。
        // // 数字越大，优先级越高。优先级为 n 的所有侦听器会在优先级为 n - 1 的侦听器之前得到处理。
        // // 如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。

        // // 检测某一个事件发送者是否注册了侦听器
        // // 方法一
        // console.log(boy.hasEventListener(DateEvent.Data));

        // // 方法二
        // console.log(boy.willTrigger(DateEvent.Data));

        // // 发送请求
        // boy.invitation();

        // //通常情况下，注册侦听器与移除侦听器都是成对出现。
        // boy.removeEventListener(DateEvent.Data, gril.show, gril);

        // //显示消息
        // this.showMsg.text = gril.receiveMsg;



        // TouchEvent的启动开关 touchEnabled 指定此对象是否接收触摸或其他用户输入。 
        // 要更改显示对象的所有子级的 touchEnabled 行为，请使用 DisplayObjectContainer.touchChildren。
        // 显示对象实例.touchEnabled = true;

        // TOUCH_BEGIN：当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）触发
        // TOUCH_CANCEL：由于某个事件取消了触摸时触发
        // TOUCH_END：当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）触发
        // TOUCH_MOVE：当用户触碰设备并移动时进行触发，而且会连续触发，直到接触点被删除
        // TOUCH_TAP：当用户在触摸设备上与开始触摸的同一 DisplayObject 实例上抬起接触点时触发（相当与点击事件）
        // 在Egret中使用触摸事件时，需要打开显示对象的触摸事件开关，即将该显示对象的touchEnabled属性设置为true
        // 父级容器都可以监听事件

        //监听点击事件        
        // let shp: egret.Shape = new egret.Shape();
        // this.addChild(shp);
        // shp.graphics.beginFill(0x00ff00);
        // shp.graphics.drawRect(0, 0, 100, 100);
        // shp.graphics.endFill()
        // shp.touchEnabled = true;
        // shp.addEventListener(egret.TouchEvent.TOUCH_TAP, onTouch, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, onTouchTap, this);//冒泡
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, onTouchTaps, this, true);//捕获

        // function onTouch(evt: egret.TouchEvent) {
        //     console.log("点击了shp");
        // }

        // function onTouchTap(evt: egret.TouchEvent) {
        //     console.log("容器冒泡阶段监听了！");
        // }

        // function onTouchTaps(evt: egret.TouchEvent) {
        //     console.log("容器捕获阶段监听了！");
        // }



        // Scroller 滚动列表
        // 不滚动——TouchBegin 触摸开始，TouchEnd 触摸结束，TouchTap 点击。
        // 滚动——TouchBegin 触摸开始，如果此时没有滚动，直接离开屏幕，那么还是原来标准的流程，抛出 TouchEnd 和 TouchTap。
        // 但是当手指滚动它以后，则会抛出一个 TouchCancel 事件，而后续的 TouchEnd 和 TouchTap 事件就不会被触发了。
        // let scroller: eui.Scroller = new eui.Scroller();
        // let list: eui.List = new eui.List();
        // list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // scroller.viewport = list;
        // this.addChild(scroller);
        // scroller.height = 200;

        // list.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => { console.log('111 list TOUCH_BEGIN') }, this);
        // scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => { console.log('111 scroller TOUCH_BEGIN') }, this);

        // list.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => { console.log('222 list TOUCH_END') }, this);
        // scroller.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => { console.log('222 scroller TOUCH_END') }, this);

        // list.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => { console.log('333 list TOUCH_TAP') }, this);
        // scroller.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => { console.log('333 scroller TOUCH_TAP') }, this);

        // list.addEventListener(egret.TouchEvent.TOUCH_CANCEL, (e: egret.TouchEvent) => { console.log('444 list TOUCH_CANCEL') }, this);
        // scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL, (e: egret.TouchEvent) => { console.log('444 scroller TOUCH_CANCEL') }, this);



        // 封装了 XMLHttpRequest 进行异步的数据交互。无状态协议：浏览器向服务端发送信息，服务端做出应答之后将关闭链接
        // 建立TCP连接.
        // Web浏览器向Web服务器发送请求命令.
        // Web浏览器发送请求头信息
        // Web服务器应答
        // Web服务器发送应答头信息
        // Web服务器向浏览器发送数据
        // Web服务器关闭TCP连接(如果请求头部设置了Connection:keep-alive将保持连接状态仍然打开).

        // HTTP 请求方法：GET 方法、POST 方法
        // let request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        /**
         * TODO: 网络先跳过，等看了服务器再来搞这个
         */



        // 资源加载
        // let img: egret.Bitmap = new egret.Bitmap();
        // img.texture = RES.getRes("bg_jpg");
        // this.addChild(img);



        // 设置九宫格的属性是 Bitmap 类中的 scale9Grid 属性。九宫格不能用scaleX=2，不然没效果
        // 正确的九宫格设置为: x,y,w,h 应大于等于 0
        // x + w < 图片宽度;
        // y + h < 图片高度;
        // 在 Egret 3.0.3 之前的版本中 x,y,w,h 是不能设置为 0 的。
        // 否则会报错：Warning #1018: 9宫格设置错误

        // let img1: egret.Bitmap = new egret.Bitmap();
        // img1.texture = RES.getRes("new_button_up_png");
        // this.addChild(img1);
        // img1.x = 50;
        // img1.y = 50;
        // img1.width *= 2;

        // let img2: egret.Bitmap = new egret.Bitmap();
        // img2.texture = RES.getRes("new_button_up_png");
        // this.addChild(img2);
        // img2.x = 50;
        // img2.y = 100;
        // let rect: egret.Rectangle = new egret.Rectangle(17, 15, 100, 20);
        // img2.scale9Grid = rect;
        // img2.width *= 2;



        // 纹理填充方式
        // let img: egret.Bitmap = new egret.Bitmap();
        // img.texture = RES.getRes("new_button_up_png");
        // this.addChild(img);
        // img.x = 50;
        // img.y = 50;
        // // let rect: egret.Rectangle = new egret.Rectangle(17, 15, 100, 20);
        // // img.scale9Grid = rect;
        // // 默认拉伸填充，除非主动改变填充模式，不能设置九宫格！否则无法改变填充模式
        // img.fillMode = egret.BitmapFillMode.REPEAT;   // 填充方式改为重复
        // // img.fillMode = "repeat";
        // img.width *= 3;
        // img.height *= 2;



        // 纹理集，最好不超过2048*2048
        // let img: egret.Bitmap = new egret.Bitmap();
        // img.texture = RES.getRes("new_button_down1_png");   // 直接输入subkey即可，不用输入json名#subkey名
        // this.addChild(img);



        // 截屏功能
        // 通常静态纹理的获取方式有下面四种：
        // 1.从已经创建出来的Bitmap中直接取 texture 属性。
        // 2.通过 RES.getRes("run_down_png");（如果有使用Res模块）直接获取
        // 3.通过URLLoader加载后获取
        // 4.通过 ImageLoader 加载的，将获取的 data 赋值给 Texture 对象的 bitmapData.
        // egret 提供了动态纹理类egret.RenderTexture，用来将显示对象及其子对象绘制成为一个纹理，以实现截图功能。
        // 示例代码：let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        // 示例代码：renderTexture.drawToTexture(displayObject);
        // TODO: 暂时不看截屏功能



        // 混合模式是指同一个显示容器中的两个显示对象重叠时，重叠区域如何呈现的方式
        // let bg: egret.Bitmap = this.createBitmapByName("main_map_jpg");
        // this.addChild(bg);

        // // let bg2: egret.Bitmap = this.createBitmapByName("main_map_jpg");
        // // this.addChild(bg2);
        // // bg2.y = 100;

        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);
        // // animal.blendMode = egret.BlendMode.NORMAL;   //默认模式
        // // animal.blendMode = egret.BlendMode.ADD;      //融入背景
        // // animal.blendMode = egret.BlendMode.ERASE;    //无论多少张图都会被擦除



        // 滤镜
        // 使用 GlowFilter 类可以对显示对象应用发光效果
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);

        // // 创建滤镜        
        // let color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        // let alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        // let blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        // let blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        // let strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。
        // let quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        // let inner: boolean = false;            /// 指定发光是否为内侧发光
        // let knockout: boolean = false;            /// 指定对象是否具有挖空效果
        // let glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);

        // animal.filters = [glowFilter];



        // 颜色矩阵滤镜
        // ColorMatrixFilter–颜色矩阵滤镜(egret.ColorMatrixFilter) 在颗粒等级上提供更好的控制显示对象的颜色转换方式。
        // ColorMatrixFilter为 4行5列的多维矩阵(20个元素的数组)。
        // | \ | R | G | B | A | off |
        // | R | 1 | 0 | 0 | 0 |  0  |
        // | G | 0 | 1 | 0 | 0 |  0  |
        // | B | 0 | 0 | 1 | 0 |  0  |
        // | A | 0 | 0 | 0 | 1 |  0  |
        // 颜色转换矩阵代码添加一个“灰度化”的效果：
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);

        // let colorMatrix = [
        //     0.3, 0.6, 0, 0, 0,
        //     0.3, 0.6, 0, 0, 0,
        //     0.3, 0.6, 0, 0, 0,
        //     0, 0, 0, 1, 0
        // ];
        // let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        // animal.filters = [colorFlilter];

        // 通过 ColorMatrixFilter 的 matrix 属性可以设置颜色矩阵。
        // 需要注意的是不能直接通过 colorFlilter.matrix[4] = 100; 这样的方式直接修改颜色矩阵。
        // 只能通过获得数组的引用然后修改, 最后重置矩阵：
        // let test = colorFlilter.matrix;
        // test[4] = 100;
        // colorFlilter.matrix = test;

        // 实际的颜色值由下面的公式决定：
        // redResult   = (a[0] * srcR)  + (a[1] * srcG)  + (a[2] * srcB)  + (a[3] * srcA)  + a[4];
        // greenResult = (a[5] * srcR)  + (a[6] * srcG)  + (a[7] * srcB)  + (a[8] * srcA)  + a[9];
        // blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14];
        // alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19];

        // 与原来完全相同的矩阵转换应该是下面这样的：
        // let colorMatrix = [
        //     1,0,0,0,0,
        //     0,1,0,0,0,
        //     0,0,1,0,0,
        //     0,0,0,1,0
        // ];

        // 在颜色矩阵中直接设置每一行中最后一个值即可设置偏移量，直接设置红色通道的偏移量，结果整张图片变红。
        // let colorMatrix = [
        //     1,0,0,0,100,
        //     0,1,0,0,0,
        //     0,0,1,0,0,
        //     0,0,0,1,0
        // ];

        // 需要注意的 R G B 通道对应的偏移量的值应该为 - 255 ~ 255，
        // Alpha 通道对应的偏移量取值范围为 -255 ~ 255.应避免传入除数字外其他类型的值，比如字符串等。

        // 如果想使绿色通道加倍,colorMatrix[6] 加倍即可：
        // let colorMatrix = [
        //     1,0,0,0,0,
        //     0,2,0,0,0,
        //     0,0,1,0,0,
        //     0,0,0,1,0
        // ];

        // 红色决定蓝色值
        // 如果要使结果图像中的蓝色与原图的红色数量相等，
        // 将colorMatrix[10]设为1， colorMatrix[12]设为0 , 
        // 即结果的蓝色值完全由原始的红色值决定：
        // let colorMatrix = [
        //     1,0,0,0,0,
        //     0,1,0,0,0,
        //     1,0,0,0,0,
        //     0,0,0,1,0
        // ];

        // 增加亮度
        // 增加亮度的最简单途径是给每个颜色值添加相同的偏移量。
        // let colorMatrix = [
        //     1,0,0,0,100,
        //     0,1,0,0,100,
        //     0,0,1,0,100,
        //     0,0,0,1,0
        // ];

        // 通过”颜色矩阵滤镜”可以完成除了亮度和灰度之外复杂的颜色调整，如调整对比度，饱和度和色相等



        // 模糊滤镜，通过 BlurFilter 类设置模糊滤镜。
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);
        // // animal.cacheAsBitmap = true;

        // let blurFilter = new egret.BlurFilter(10, 10);  // x 、y 方向的模糊度。值越大效果越模糊。
        // animal.filters = [blurFilter];

        // 需要注意的是模糊滤镜对性能的消耗比较大，应谨慎使用。普通显示对象可以开启 cacheAsBitmap 提高一些性能。
        // 显示对象的 filters 属性可以保存多个滤镜效果，比如同时使用hero.filters = [blurFliter,colorFlilter]; 模糊和颜色矩阵滤镜效果。多个效果同时生效。



        // 投影滤镜
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);

        // // 创建投影滤镜
        // let distance: number = 6;           /// 阴影的偏移距离，以像素为单位
        // let angle: number = 45;              /// 阴影的角度，0 到 360 度
        // let color: number = 0x000000;        /// 阴影的颜色，不包含透明度
        // let alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        // let blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        // let blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        // let strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        // let quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        // let inner: boolean = false;            /// 指定发光是否为内侧发光
        // let knockout: boolean = false;            /// 指定对象是否具有挖空效果
        // let dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);

        // // 应用滤镜        
        // animal.filters = [dropShadowFilter];
        // // 对比发光滤镜，可以看到投影滤镜的构造函数正好比发光滤镜多出前两个参数：distance 和 angle 。
        // // 在投影滤镜的 distance 和 angle 属性设置为 0 时，投影滤镜与发光滤镜极为相似。



        /**
         * TODO: 自定义Shader暂时不看
         */



        // 时间控制，想象一个真正的手机计时器
        // Timer 相关的有两个属性，三个方法和两个事件。
        // 两个属性是 delay 与 repeatCount ,分别表示每次间隔的时间（以毫秒为单位）和执行的次数（如果次数为0，则表示不停的执行）。
        // 三个方法为 start, reset 和 stop。作用分别是开始计时，重新计时和暂停计时。
        // 两个事件分别为 TimerEvent.TIMER 和 TimerEvent.TIMER_COMPLETE 。分别在计时过程中触发和计时结束后触发。
        // let timer: egret.Timer = new egret.Timer(10000, 2);

        // timer.addEventListener(egret.TimerEvent.TIMER, timing, this);
        // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerComplete, this);

        // //务必要手动启动计时器！
        // timer.start();

        // function timing(e: egret.TimerEvent) {
        //     console.log("计时");
        // }

        // function timerComplete(e: egret.TimerEvent) {
        //     console.log("计时结束");
        // }



        // Ticker 心跳
        // startTick（停止对应stopTick）全局函数将以 60 帧速率回调函数。
        // 它与 ENTER_FRAME 事件不同。ENTER_FRAME 是每帧回调，改变帧率会改变回调速度；
        // startTick是定时回调，改变帧率也不会影响回调速度。
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);
        // this.animal = animal;
        // this.time = egret.getTimer();   // 返回自启动 Egret 框架以来经过的毫秒数。
        // console.log(this.time);
        // egret.startTick(moveStar, this);// 注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳

        // function moveStar(timeStamp: number) {
        //     let now = timeStamp;
        //     let time = this.time;
        //     let pass = now - time;
        //     console.log("moveAnimal: ", (1000 / pass).toFixed(5));// 将数字转换为一个小数点后有指定num位的字符串
        //     // 证明了startTick大概是以1/60s的速度来回调的！
        //     this.time = now;

        //     //移动animal
        //     animal.x += this.speed * pass;
        //     if (animal.x > 300) {
        //         egret.stopTick(moveStar, this);
        //     }
        //     return true;
        // }
        // startTick 函数有两个传入参数，第一个参数是回调函数，该回调函数要求有返回值，如果返回为true将在回调函数执行完成之后立即重绘，为false则不会重绘。
        // 第二个参数是this对象，通常传入this即可。



        // 帧事件
        // let animal: egret.Bitmap = this.createBitmapByName("pig_png");
        // this.addChild(animal);
        // this.addEventListener(egret.TimerEvent.ENTER_FRAME, onEnterFrame, this);
        // this.time = egret.getTimer();

        // function onEnterFrame(e: egret.TimerEvent) {
        //     let now = egret.getTimer();
        //     let time = this.time;
        //     let pass = now - time;
        //     console.log("onEnterFrame: ", (1000 / pass).toFixed(5));
        //     this.time = egret.getTimer();   // 好吧，更公正一点

        //     //移动animal
        //     animal.x += this.speed * pass;
        //     if (animal.x > 300) {
        //         this.removeEventListener(egret.TimerEvent.ENTER_FRAME, onEnterFrame, this);
        //     }
        // }
        // 通过计算时间间隔来实现位移会使动画看起来更平滑一些，因为每帧的时间间隔不是固定的。



        // 音频示例
        // 通过 var sound: egret.Sound = new egret.Sound() 创建 Sound 对象，
        // 再通过 sound.load(url)加载，Sound 类支持的事件类型有两个：
        // egret.Event.COMPLETE 音频加载完成时抛出；
        // egret.IOErrorEvent.IO_ERROR 音频加载失败时抛出.

        // 通过Sound加装音频        
        // let sound = new egret.Sound();
        // sound.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //     sound.play(0, 2);
        // }, this);   //一定要由sound来注册监听器
        // sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (e: egret.IOErrorEvent) => {
        //     console.log("加载音频失败！");
        // }, this);
        // sound.load("resource/zhuanpan.mp3");    // 监听事件最好放在前面



        // 通过 URLLoader 加装音频，需要加载game库
        // let loader: egret.URLLoader = new egret.URLLoader();
        // loader.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //     let sound = loader.data;
        //     sound.play(0, 2);
        // }, this)
        // loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        // loader.load(new egret.URLRequest("resource/zhuanpan.mp3"));



        // 通过 res 加装音频
        // let sound = RES.getRes("zhuanpan_mp3");
        // sound.play(0, 2);



        // play() 方法播放音频，有2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
        // 运行 play() 之后，会返回一个 SoundChannel 对象，开发者可以直接对 SoundChannel 进行操作，比如设置音量等。
        // SoundChannel 对象的 egret.Event.SOUND_COMPLETE 事件是播放完成事件。
        // 根据 SoundChannel 返回的 position 属性和 Sound 的 play() 方法可实现暂停和重播功能。
        // stop() 方法停止播放。

        // 目前引擎内提供了4种声音的兼容模式，分别是 Audio、 WebAudio、QQAudio（qzone提供的声音解决方案）、以及 NativeAudio（打包方案Audio）
        // WebAudio：IOS系统版本大于等于7的所有IOS版本的浏览器，Egret 3.2.0 以后 Android 默认也使用 WebAudio，如果不支持 WebAudio 的 app 则会自动改成 Audio 方式。
        // QQAudio：在html页面指定了 “ https://qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js ” （Qzone使用的js api）并且运行在qq空间的 android 机型。
        // Audio：除使用 WebAudio 以及 QQAudio 外的其他所有的 Web 浏览器或者平台。可能出现的问题是声音播放有延迟，同一时间只能有一个音频的存在。
        // NativeAudio：打包方案使用的audio。
        // 设置播放类型在项目根目录下的 index.html 模板文件中进行："audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio

        // 播放多个音频        
        // let sound1 = RES.getRes("zhuanpan_mp3");
        // sound1.play(0, 1);
        // let sound2 = RES.getRes("steal_mp3");
        // sound2.play(0, 2);



        // 注意事项
        // 声音资源的格式生成请严格按照此步骤来，不然会影响兼容性。
        // 使用格式工厂。选择 44100Hz，96kbps 转换。
        // 如果还有问题，请再转一次。
        // 如果还有问题，请裁减音频长度再次转换。
        // 如果还有问题，请到论坛联系开发者论坛，并提供对应的音频文件。
        // 如果有问题，请尝试多转几次。
        // 对于更专业的转换工具比如 audition，在测试中发现转换后的文件并不能解决在所有的浏览器中的播放问题，所以不推荐大家使用。
        // 在 iOS 系统（所有设备，包括IPAD）中，使用者在可能付费的网络环境中需要等待用户交互操作后才能播放媒体。为了获得在 iOS 系统中最大的兼容性，请避免使用自动播放音频（载入完成即播放），应添加合适的触发条件（比如播放按钮）。
        // 如果使用 WebAudio 方式还不能自动播放的话，那么目前来说没有其他方式来解决自动播放的问题。
        // iOS 游戏的域名必须要在玩吧指定的域名下才可以使用上面提到的Qzone的js api(jsBridge)。
        // 由于一些浏览器不支持直接加载后播放，因此建议先预加载音乐文件，并在点击事件时直接调用 sound.play()。
        // 非 WebAudio 方式播放的音频，很有可能在浏览器只能同时播放一种声音（这个也是为什么qzone单独提供了声音解决方案）。



        // 官方的例子        
        // let soundExample = new SoundExample();
        // this.addChild(soundExample);



        // 视频
        // TODO: 暂时跳过视频和环境信息



        // WebGL渲染
        // 在开启 WebGL 渲染模式下，如果浏览器不支持将自动切换到 Canvas 渲染模式下。
        // 开启 WebGL 渲染
        // 找到 index.html 文件，然后开启 egret.runEgret({renderMode:"webgl"});  //也可以指定为canvas
        // 判断当前的渲染模式
        // 可以通过 Capabilities 类的 renderMode 来判断当前的渲染模式。
        // 目前暂时在 WebGL 下关闭了的脏矩形渲染
        // 使用 WebGL 渲染可以得到性能提升。但在使用很多文本和矢量绘图的情况下，可能有更多的开销，起不到提升性能的作用。
        // 在 WebGL 下如果要使用 Texture 对象的 toDataURL() 方法把纹理转换为 base64 字符串，那么纹理图片应放在同一服务器下，引用不同的服务器下的资源将不成功。
        // 当然 WebGL 标准正在普及，在手机上有些特性支持还不是很友好。手机上非 Chrome 浏览器现在对不规则遮罩支持还不是很好，在使用 WebGL 渲染器时可以尽量避免使用不规则遮罩。

        // console.log(egret.Capabilities.renderMode);



        // 缩放模式： Egret 目前支持的模式有：showAll, noScale, noBorder, exactFit, fixedWidth, fixedHeight, fixedNarrow, fixedWide
        // 也可以在代码中修改：
        // showAll模式：舞台尺寸(stage.stageWidth,stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸
        // noScale 模式：在此模式下，舞台尺寸（stage.stageWidth,stage.stageHeight）始终跟播放器窗口大小保持一致。
        // noBorder 模式：缩放后应用程序内容向较宽方向填满播放器窗口，不会有黑边存在，另一个方向的两侧可能会超出播放器窗口而被裁切，只显示中间的部分。
        // exactFit 模式：直接拉伸，暴力填充整个屏幕。
        // fixedWidth 模式：优先宽的部分缩放程度没那么大
        // fixedHeight 模式优先高的部分缩放程度没那么大
        // fixedNarrow 模式：保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，应用程序内容的较窄方向可能会不够宽而填充。
        // fixedWide 模式：保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，应用程序内容的较宽方向的两侧可能会超出播放器视口而被裁切。

        // fixedNarrow 模式和fixedWide 模式，可以理解为fixedWidth和fixedHeight的高级封装，显示效果与那两种模式类似，
        // 但是决定缩放比例的方向不是定死的，而是根据内容距离屏幕的边距宽窄来决定。在这两种模式下可以比较方便的布局 UI。
        // this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;



        // 旋转模式：auto、portrait、landscape、landscapeFlipped
        // landscape 和 landscapeFlipped 这两种模式，一般用于横屏游戏，但需要提示用户关闭重力感应锁，锁定屏幕方向。
        // 也可以在代码中修改：
        // this.stage.orientation = egret.OrientationMode.AUTO;



        // 调试
        // 使用 DEBUG 编译参数
        // 开发者经常写一些希望仅在开发阶段使用的代码，来进行数据校验、输出日志等。
        // Egret 提供了 DEBUG 这一全局变量来实现这样的功能。
        // 下面的代码校验 value 是不是由4个数字组成，如果不是，输出指定的错误信息。

        // 下面代码不能运行的！        
        // let value="1,2,3,4"        
        // if (DEBUG) {
        //     var rect = value.split(",");
        //     if (rect.length != 4 || isNaN(parseInt(rect[0])) || isNaN(parseInt(rect[1])) ||
        //         isNaN(parseInt(rect[2])) || isNaN(parseInt(rect[3]))) {
        //         egret.$error(2016, this.currentClassName, toXMLString(node));
        //     }
        // }

        // 在发行版生成过程中，Egret 命令行会移除 if(DEBUG){ ... } 这一整个代码块，保持发行版包体的精简。
        // Egret 还提供了另外一个与 DEBUG 对应的编译参数 RELEASE，用来编写只在发行版中运行的代码。



        // 在PC端可使用 console 提供的诸多方法输出日志，然后使用浏览器提供的开发者工具查看。
        // 但是在移动端这个方式受到了限制，大多数移动端浏览器没有查看日志的方法。
        // 因此 Egret 集成了向屏幕输出日志的功能，以方便移动设备调试。

        // 在 index.html 文件中有如下代码块：
        //     <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
        //         data-entry-class="Main"
        //         data-orientation="auto"
        //         data-scale-mode="noScale"
        //         data-frame-rate="30"
        //         data-content-width="480"
        //         data-content-height="800"
        //         data-show-paint-rect="false"
        //         data-multi-fingered="2"
        //         data-show-fps="true" data-show-log="false"
        //         data-log-color="#b0b0b0"> 
        //     </div>
        // 通过 data-show-log： 设置是否在屏幕中显示日志。 true 显示，false 不显示。
        // 在代码中可以直接调用 egret.log(message?:any, ...optionalParams:any[]) 来输出日志。
        // egret.log("hello,老师", [1, 2, 2]);



        // 帧频
        // FPS: 60 - 帧频
        // Draw: 13 - 每帧 draw 方法调用的平均次数
        // Cost: 0,0,0 - Ticker 和 EnterFrame 阶段显示的耗时,每帧舞台所有事件处理和矩阵运算耗时，绘制显示对象耗时（单位是ms）



        /**
         * TODO: 扩展插件暂时不看
         */



        // ts 与 js 互调
        // ts 是 js 的超集，因此只要是 js 与 js 可以互相调用的，ts 均可以调用，只不过需要增加声明来解决编译时报错。
        // ts 最终生成的文件为 js，因此 js 调用 ts 其实就是 js 调用 js（ts 生成的 js 文件）。
        /**
         * TODO: 暂时用不到ts、js相互调用，先不看
         */



        // 发布项目：egret publish，或者用launcher来发布
        // 在 Html5 类型里可以填写版本号，用于版本控制。查看bin-release文件夹
    }

    private animal: egret.Bitmap;
    private speed: number = 0.05;
    private time: number = 0;

    private showMsg: egret.TextField;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

// 事件的发送者必须是 egret.EventDispatcher 类或者子类的实例。
class Boy extends egret.Sprite {    //一定要继承，不然报错
    //属性：name，方法：派发约会事件
    constructor(public name: string) {
        super();
    }

    public invitation() {
        let dataEvent: DateEvent = new DateEvent(DateEvent.Data);
        dataEvent._year = 2018;
        dataEvent._month = 10;
        dataEvent._day = 11;
        dataEvent._where = "肯德基";
        dataEvent._todo = "共进晚餐";
        this.dispatchEvent(dataEvent);  //发送事件
        //只有事件发送者才能侦听事件，并且可以注册侦听器。
    }
}

class Gril extends egret.Sprite {

    // public receive: boolean = false;
    public receiveMsg: string;

    constructor(public name: string) {
        super();
    }

    // 侦听器的返回值必须为空（void），有一个参数必须是 Event 类实例或其子类的实例
    public show(evt: DateEvent) {
        this.receiveMsg = `得到了${evt.target.name}的邀请！
${this.name}会在${evt._year}年${evt._month}月${evt._day}日在${evt._where}与${evt.target.name}${evt._todo}`;
    }
}

class DateEvent extends egret.Event {
    public static Data: string = "约会";     //事件类型
    public _year: number = 2000;
    public _month: number = 1;
    public _day: number = 1;
    public _where: string = "";
    public _todo: string = "";
    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        //bubbles是指定事件是否参与事件流的冒泡阶段
        //cancelable表示是否可以取消与事件关联的默认动作
    }
    // constructor(type: string) {
    //     super(type, true, true);
    // }
}