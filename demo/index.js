var adaptive = require('../')

require('canvas-testbed')(function(ctx, width, height) {
    var scale = 2
    var path = adaptive([20, 20], [100, 159], [50, 200], [200, 20], scale)
    
    ctx.save()
    ctx.scale(scale, scale)

    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.bezierCurveTo(100,159, 50,200, 200,20)
    ctx.lineWidth = 4
    ctx.strokeStyle = 'red'
    ctx.stroke()

    ctx.strokeStyle = '#000'
    path.forEach(function(p) {
        var r = 3
        ctx.fillRect(p[0]-r/2,p[1]-r/2, r, r)
    })
    ctx.restore()
})


/*
//This is how a typical (incremental) bezier curve might look
var bezier = require('bezier')
var tmpX = [0, 0, 0, 0]
var tmpY = [0, 0, 0, 0]

function createBezier(start, c1, c2, end, points) {
    if (!points)
        points = []

    tmpX[0] = start[0]
    tmpX[1] = c1[0]
    tmpX[2] = c2[0]
    tmpX[3] = end[0]

    tmpY[0] = start[1]
    tmpY[1] = c1[1]
    tmpY[2] = c2[1]
    tmpY[3] = end[1]
    for (var t = 0; t < 1; t += 0.01) {
        points.push([bezier(tmpX, t), bezier(tmpY, t)])
    }
    return points
}
*/