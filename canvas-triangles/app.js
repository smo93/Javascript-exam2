$(document).ready(function() {
  var
    canvas = $('canvas'),
    context = canvas.get(0).getContext('2d'),
    points = [],
    triangles = [],
    saves = [],
    colorField = $('#color');

  saves = localStorage.getItem('saves');
  if(saves === null) {
    saves = [];
  } else {
    saves = JSON.parse(saves);
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
    var trianglesJSON = JSON.stringify(triangles),
      canvasName = prompt('Enter a name for your masterpiece:');

    if(canvasName === '') {
      return;
    }

    localStorage.setItem(canvasName, trianglesJSON);

    saves.push(canvasName);
    localStorage.setItem('saves', JSON.stringify(saves));
  }

  function loadLocalStorage(canvasName) {
    points = [];

    $('img').hide();

    triangles = localStorage.getItem(canvasName);

    canvas.get(0).width = canvas.get(0).width;

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
  });

  $('#clear').on('click', function() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 600, 400);

    points = [];
    triangles = [];
    $('img').hide();
  });

  $('#save').on('click', saveCanvas);
  $('#load').on('click', function() {
    var dropdown = $('#saved-list');

    dropdown.empty();

    saves.forEach(function(save) {
      dropdown.append([
        '<option>',
        save,
        '</option>'
      ].join(''));
    });
  });
  
  $('#load-selected').on('click', function() {
    var canvasName = $('#saved-list').val();

    loadLocalStorage(canvasName);
    $('#loadingModal').modal('toggle');
  });
});
