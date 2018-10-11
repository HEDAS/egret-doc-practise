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
var AnchorTest = (function (_super) {
    __extends(AnchorTest, _super);
    function AnchorTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    AnchorTest.prototype.onAddToStage = function (e) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.graphics.endFill();
        shape.x = 100;
        shape.y = 100;
        shape.anchorOffsetX = 50;
        this.addChild(shape);
    };
    return AnchorTest;
}(egret.DisplayObjectContainer));
__reflect(AnchorTest.prototype, "AnchorTest");
//# sourceMappingURL=AnchorTest.js.map