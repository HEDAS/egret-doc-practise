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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0.05;
        _this.time = 0;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
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
                    case 0: return [4, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4, platform.login()];
                    case 2:
                        _a.sent();
                        return [4, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2];
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
                        return [4, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.createGameScene = function () {
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "}";
        var fragmentSrc = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "uniform float width;\n" +
            "uniform float height;\n" +
            "void main(void) {\n" +
            "vec4 fg;\n" +
            "if(mod(floor(vTextureCoord.x / width) + floor(vTextureCoord.y / height), 2.0) == 0.0) {" +
            "fg = vec4(1,1,1,1);" +
            "}" +
            "else {" +
            "fg = vec4(0,0,0,1);" +
            "}" +
            "gl_FragColor = fg;\n" +
            "}";
        var sky = this.createBitmapByName("7262f15fd9a1c0402837510b326cc952cdb33755_jpg");
        sky.width = this.stage.stageWidth;
        sky.height = this.stage.stageHeight;
        this.addChild(sky);
        var size = 50;
        var filter = new egret.CustomFilter(vertexSrc, fragmentSrc, { width: size / this.stage.stageWidth, height: size / this.stage.stageHeight });
        sky.filters = [filter];
        var inc = 1;
        this.stage.addEventListener(egret.Event.ENTER_FRAME, function () {
            size += inc;
            if (size >= 80) {
                inc = -1;
            }
            if (size <= 50) {
                inc = 1;
            }
            filter.uniforms.width = size / this.stage.stageWidth;
            filter.uniforms.height = size / this.stage.stageHeight;
        }, this);
    };
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var Boy = (function (_super) {
    __extends(Boy, _super);
    function Boy(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Boy.prototype.invitation = function () {
        var dataEvent = new DateEvent(DateEvent.Data);
        dataEvent._year = 2018;
        dataEvent._month = 10;
        dataEvent._day = 11;
        dataEvent._where = "肯德基";
        dataEvent._todo = "共进晚餐";
        this.dispatchEvent(dataEvent);
    };
    return Boy;
}(egret.Sprite));
__reflect(Boy.prototype, "Boy");
var Gril = (function (_super) {
    __extends(Gril, _super);
    function Gril(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Gril.prototype.show = function (evt) {
        this.receiveMsg = "\u5F97\u5230\u4E86" + evt.target.name + "\u7684\u9080\u8BF7\uFF01\n" + this.name + "\u4F1A\u5728" + evt._year + "\u5E74" + evt._month + "\u6708" + evt._day + "\u65E5\u5728" + evt._where + "\u4E0E" + evt.target.name + evt._todo;
    };
    return Gril;
}(egret.Sprite));
__reflect(Gril.prototype, "Gril");
var DateEvent = (function (_super) {
    __extends(DateEvent, _super);
    function DateEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._year = 2000;
        _this._month = 1;
        _this._day = 1;
        _this._where = "";
        _this._todo = "";
        return _this;
    }
    DateEvent.Data = "约会";
    return DateEvent;
}(egret.Event));
__reflect(DateEvent.prototype, "DateEvent");
//# sourceMappingURL=Main.js.map