var mat4 = {
    create: require('gl-mat4/create'),
    multiply: require('gl-mat4/multiply')
}

var tmpMat = mat4.create()

function Projector(opt) {
    opt = opt||{}
    this.combined = mat4.create()
    this.view = mat4.create
    this.invCombined = mat4.create()
}


Projector.prototype.build = function(projection, position, direction, up) {
    //build the view matrix 
    mat4.add(tmpMat, position, direction)
    mat4.lookAt()
    tmpVec3.copy(this.position).add(this.direction);
    this.view.lookAt(this.position, tmpVec3, this.up);

    //projection * view matrix
    this.combined.copy(this.projection).mul(this.view);

    //invert combined matrix, used for unproject
    this.invProjectionView.copy(this.combined).invert();
}

function project(vec3d, out) {
    if (!out)
        out = new Vector4();

    var viewportWidth = this.viewportWidth,
        viewportHeight = this.viewportHeight,
        n = 1,
        f = 0;

    // for useful Z and W values we should do the usual steps...
    //    clip space -> NDC -> window coords

    //implicit 1.0 for w component
    tmpVec4.set(vec.x, vec.y, vec.z, 1.0);

    //transform into clip space
    tmpVec4.transformMat4(this.combined);

    //now into NDC
    tmpVec4.x = tmpVec4.x / tmpVec4.w;
    tmpVec4.y = tmpVec4.y / tmpVec4.w;
    tmpVec4.z = tmpVec4.z / tmpVec4.w;

    //and finally into window coordinates
    out.x = viewportWidth / 2 * tmpVec4.x + (0 + viewportWidth / 2);
    out.y = viewportHeight / 2 * tmpVec4.y + (0 + viewportHeight / 2);
    out.z = (f - n) / 2 * tmpVec4.z + (f + n) / 2;

    //if the out vector has a fourth component, we also store (1/clip.w)
    //same idea as gl_FragCoord.w
    if (out.w === 0 || out.w)
        out.w = 1 / tmpVec4.w;

    return out;
},