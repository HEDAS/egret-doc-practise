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
        let shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_TAP, remove, this);

        function remove(e: egret.TouchEvent) {
            //该对象存在，但已被移除显示列表，画面上不显示，驻于内存中
            this.removeChild(shape);
        }
    }
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
