// TypeScript file
class MyGrid extends egret.Shape {
    public constructor(width: number) {
        super();
        this.drawGrid(width);
    }

    private drawGrid(width) {
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
    }
}