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
var SoundExample = (function (_super) {
    __extends(SoundExample, _super);
    function SoundExample() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        return _this;
    }
    SoundExample.prototype.onAddtoStage = function () {
        this.startLoad();
    };
    SoundExample.prototype.startLoad = function () {
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        var url = "resource/zhuanpan.mp3";
        var request = new egret.URLRequest(url);
        loader.load(request);
    };
    SoundExample.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        var sound = loader.data;
        this.sound = sound;
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x18f7ff);
        btn.graphics.drawRoundRect(0, 0, 80, 40, 5, 5);
        btn.graphics.endFill();
        btn.touchEnabled = true;
        btn.anchorOffsetX = btn.width / 2;
        btn.x = this.stage.stageWidth / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.y = this.stage.stageHeight / 2;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(btn);
    };
    SoundExample.prototype.onTouch = function (event) {
        var sound = this.sound;
        var channel = this.soundChannel;
        if (channel) {
            console.log(channel);
            channel.stop();
            this.soundChannel = null;
            return;
        }
        channel = sound.play(0, -1);
        console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.soundChannel = channel;
    };
    SoundExample.prototype.onSoundComplete = function (event) {
        console.log("onSoundComplete");
    };
    return SoundExample;
}(egret.DisplayObjectContainer));
__reflect(SoundExample.prototype, "SoundExample");
//# sourceMappingURL=SoundExample.js.map