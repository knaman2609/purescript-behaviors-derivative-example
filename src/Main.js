var y = 0;
var x = 0;
var maxSpeed = 0;

var updateChart = function (x, y) {
  window.dps.push({x: x, y: y});
  window.chart.render();
};

exports.attachSignalEvents = function(axis) {
  return function(sub) {
    var inp = document.getElementsByTagName("input");

    if (axis == "x") {
      setInterval(function() {
        x++;
        sub(x)();
      },0);
    } else if (axis == "y") {
      inp[0].addEventListener("input", function(e) {
        sub(e.target.value)();
      });
    } else {
      inp[0].addEventListener("input", function(e) {
        sub(true)();
      });
    }
  }
}

exports.logAny = function(y) {
  return function() {
    var topSpeedDiv = document.getElementById("top-speed");

    if (y == Infinity)
     return

    y = y*1;

    if (y > maxSpeed) {
      maxSpeed = y;
    }

    topSpeedDiv.innerHTML = maxSpeed;

    updateChart(x, y);
  }
}
