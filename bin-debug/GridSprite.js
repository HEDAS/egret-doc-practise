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
// TypeScript file
var GridSprite = (function (_super) {
    __extends(GridSprite, _super);
    function GridSprite(width) {
        var _this = _super.call(this) || this;
        _this.drawGrid(width);
        return _this;
    }
    GridSprite.prototype.drawGrid = function (width) {
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, width, width);
        this.graphics.endFill();
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(width, width, width, width);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(width, 0, width, width);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0, width, width, width);
        this.graphics.endFill();
    };
    return GridSprite;
}(egret.Sprite));
__reflect(GridSprite.prototype, "GridSprite");
//# sourceMappingURL=GridSprite.js.map