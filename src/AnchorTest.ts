class AnchorTest extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e: egret.Event) {
		let shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0x00ff00);
		shape.graphics.drawRect(0, 0, 100, 100);
		shape.graphics.endFill();
		shape.x = 100;
		shape.y = 100;
		shape.anchorOffsetX = 50;	//正数向左移动
		this.addChild(shape);
	}
}