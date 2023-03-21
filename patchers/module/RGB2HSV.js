inlets = 3;
outlets = 3;

var r = 0;
var g = 0;
var b = 0;
	
/*
function msg_float(){
  r = arguments[0];
  g = arguments[1];
  b = arguments[2];
  console.log(r);
  console.log(g);
  console.log(b);*/

function msg_float(val){
  switch(this.inlet){
    case 0:
      r = val;
      break;

    case 1:
      g = val;
      break;

    case 2:
      b = val;
      break;

      default:
        break;
    }
  rgb2hsv(r, g, b);
  //console.log("R: " + r +" G: " + g +" B: " + b);

}

var rgb2hsv = function (_r, _g, _b){
  var max = Math.max( r, g, b ) ;
  var min = Math.min( r, g, b ) ;
  var diff = max - min ;

  var h = 0;

  switch( min ) {
    case max :
      h = 0;
      break;

    case r :
      h = (60 * ((_b - _g) / diff)) + 180;
      break;

    case g :
      h = (60 * ((_r - _b) / diff)) + 300;
      break;

    case b :
      h = (60 * ((_g - _r) / diff)) + 60;
      break;
	}

	var s = max == 0 ? 0 : diff / max;
	var v = max;

	//return [ h, s, v ] ;
	
	//console.log("H: " + h +" S: " + s +" V: " + v);
	
	outlet(0, h / 360);
	outlet(1, s);
	outlet(2, v);
	
};


Console = new Function;
var console = new Console();
Console.prototype.log = function(msg) {
  post(msg);
  post();
};