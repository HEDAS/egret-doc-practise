class SoundExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    private onAddtoStage() {
        this.startLoad();
    }
    private startLoad(): void {
        //创建 URLLoader 对象
        let loader: egret.URLLoader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        let url: string = "resource/zhuanpan.mp3";
        let request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
    private onLoadComplete(event: egret.Event): void {
        let loader: egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的 Sound 对象
        let sound: egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
        //一个简单的播放按钮
        let btn = new egret.Sprite();
        btn.graphics.beginFill(0x18f7ff);
        btn.graphics.drawRoundRect(0, 0, 80, 40, 5, 5);
        btn.graphics.endFill();
        btn.touchEnabled = true;
        btn.anchorOffsetX = btn.width / 2;
        btn.x = this.stage.stageWidth / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.y = this.stage.stageHeight / 2;
        //监听按钮的触摸事件
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(btn);
    }
    private sound: egret.Sound;
    private soundChannel: egret.SoundChannel;
    private onTouch(event: egret.Event) {
        let sound = this.sound;
        let channel: egret.SoundChannel = this.soundChannel;
        if (channel) {
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.soundChannel = null;
            return;
        }
        //使用SoundChannel播放音频
        channel = sound.play(0, -1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //保存soundChannel对象
        this.soundChannel = channel;
    }
    private onSoundComplete(event: egret.Event): void {
        console.log("onSoundComplete");
    }
}