$(document).ready(function() {
  var
    canvas = $('canvas'),
    context = canvas.get(0).getContext('2d'),
    points = [],
    triangles = [],
    colorField = $('#color');

  loadLocalStorat();

  if(triangles === 'undefined') {
    triangles = [];
  }

  function drawTriangle(pts, col) {
    var color;

    if(col !== null) {
      color = col;
    } else {
      color = $('#color').val();
    }

    context.fillStyle = color;

    context.beginPath();

    pts.forEach(function(point) {
      context.lineTo(point.x, point.y);
    });

    triangles.push({
      color: color,
      points: pts
    });

    context.closePath();

    context.fill();
  }

  function saveCanvas() {
    var trianglesJSON = JSON.stringify(triangles);

    localStorage.setItem('canvas', trianglesJSON);
  }

  function loadLocalStorat() {
    points = [];

    $('img').hide();

    triangles = localStorage.getItem('canvas');

    if(triangles === null) {
      triangles = [];
      return false;
    } else {
      triangles = JSON.parse(triangles);
    }

    triangles.forEach(function(triangle) {
      drawTriangle(triangle.points, triangle.color);
    });
  }

  canvas.on('click', function(e) {
    var mousePos = {
      x: e.offsetX,
      y: e.offsetY
    };

    points.push(mousePos);

    $('#' + points.length).css('display', 'block').css('top', (mousePos.y - 3) + 'px').css('left', (mousePos.x - 3) + 'px');

    if(points.length === 3) {
      drawTriangle(points, null);
      points = [];

      $('img').hide();
    }
    console.log(triangles);
  });

  $('#clear').on('click', function() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 600, 400);

    points = [];
    triangles = [];
    $('img').hide();
  });

  $('#save').on('click', saveCanvas);
});
