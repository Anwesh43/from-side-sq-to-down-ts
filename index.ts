const w : number = window.innerWidth
const h : number = window.innerHeight 
const parts : number = 4
const scGap : number = 0.04 / parts  
const sizeFactor : number = 5.9  
const delay : number = 20 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#B71C1C",
    "#01579B",
    "#BF360C",
    "#00B8D4",
    "#00C853"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n))
    }
}

class DrawingUtil {

    static drawFromSideSquareToDown(context : CanvasRenderingContext2D, scale : number) {
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        const sc4 : number = ScaleUtil.divideScale(scale, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor
        const x : number = w / 2 - size / 2 * (1 - (sc2 - sc3))
        const y  : number = (h / 2 + size / 2) * (-1 + sc1 + sc4) 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            context.translate(x, y)
            context.fillRect(-size / 2, -size / 2, size , size)
            context.restore()
        }
        context.restore()
    }

    static drawDFSSTDNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawFromSideSquareToDown(context, scale)
    }
}
