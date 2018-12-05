function MyDrag(options) {
    this.el = options.el || ''
  this.parent = options.parent || ''
    this.flag = false
    this.nx = 0
    this.ny = 0
    this.dx = 0
    this.dy = 0
    this.x = 0
    this.y = 0
    this.cur = {
        x: 0,
        y: 0
    }

    this.init()
}

MyDrag.prototype.down = function() {
    this.flag = true
    var touch ;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.cur.x = touch.clientX;
    this.cur.y = touch.clientY;
    this.dx = this.el.offsetLeft;
    this.dy = this.el.offsetTop;
}
MyDrag.prototype.move = function() {
    if(this.flag){
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.nx = touch.clientX - this.cur.x;
        this.ny = touch.clientY - this.cur.y;
        this.x = this.dx+this.nx;
        this.y = this.dy+this.ny;

        if(this.parent) {
          this.x = Math.max(0, this.x)
          this.x = Math.min(this.x, this.parent.clientWidth - this.el.clientWidth)
          this.y = Math.max(0, this.y)
          this.y = Math.min(this.y, this.parent.clientHeight - this.el.clientHeight)
        }


        this.el.style.left = this.x+"px";
        this.el.style.top = this.y +"px";
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",function(){
            event.preventDefault();
        },false);
    }
}
MyDrag.prototype.end = function() {
    this.flag = false
}
MyDrag.prototype.init = function() {
  //  var div2 = document.getElementById("div2");
    var that = this
    this.el.addEventListener("mousedown",function(){
        that.down();
    },false);
    this.el.addEventListener("touchstart",function(){
        that.down();
    },false)
    this.el.addEventListener("mousemove",function(){
        that.move();
    },false);
    this.el.addEventListener("touchmove",function(){
        that.move();
    },false)
    document.body.addEventListener("mouseup",function(){
        that.end();
    },false);
    this.el.addEventListener("touchend",function(){
        that.end();
    },false);
}

