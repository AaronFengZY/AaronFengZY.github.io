(function () {
  var canvas = document.getElementById('cyber-canvas');
  if (!canvas) throw new Error('Cyber canvas is missing.');
  var context = canvas.getContext('2d');
  if (!context) {
    console.warn('Canvas rendering is unavailable; Cyber style will use its static background and scanning line.');
    return;
  }

  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var printing = window.matchMedia('print');
  var width = 0;
  var height = 0;
  var stars = [];
  var palette;
  var frameId = null;
  var lastFrame = 0;
  var time = 0;
  var pointer = { x: 0, y: 0 };
  var camera = { x: 0, y: 0 };

  function isActive() {
    return root.getAttribute('data-style') === 'cyber' && !printing.matches;
  }

  function canAnimate() {
    return isActive() && root.getAttribute('data-effects') === 'on' && !document.hidden && !reducedMotion.matches;
  }

  function resetStar(star, initial) {
    star.x = (Math.random() * 2 - 1) * 1.35;
    star.y = Math.random() * 2 - 1;
    star.z = initial ? 0.2 + Math.random() * 0.8 : 1;
  }

  function resize() {
    width = document.documentElement.clientWidth;
    height = window.innerHeight;
    var ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2500000 / (width * height)));
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    var count = width <= 720 ? 50 : 100;
    if (stars.length !== count) {
      stars = [];
      for (var i = 0; i < count; i += 1) {
        var star = { pink: i % 4 === 0 };
        resetStar(star, true);
        stars.push(star);
      }
    }
    sync();
  }

  function project(star, depth) {
    return {
      x: width * 0.5 + camera.x + star.x * width * 0.5 / depth,
      y: height * 0.42 + camera.y + star.y * height * 0.45 / depth
    };
  }

  function drawGrid() {
    var horizon = height * 0.57 + camera.y * 0.4;
    var center = width * 0.5 + camera.x;
    var phase = (time * 0.42) % 1;
    context.strokeStyle = palette.cyan;
    context.lineWidth = 0.8;
    context.globalAlpha = 0.15;
    for (var i = -10; i <= 10; i += 1) {
      context.beginPath();
      context.moveTo(center + i * 6, horizon);
      context.lineTo(center + i * width * 0.22, height);
      context.stroke();
    }
    for (var row = 0; row < 16; row += 1) {
      var depth = Math.pow((row + phase) / 16, 2);
      var y = horizon + depth * (height - horizon);
      context.globalAlpha = 0.07 + depth * 0.28;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.globalAlpha = 0.35;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(0, horizon);
    context.lineTo(width, horizon);
    context.stroke();
  }

  function drawStars(delta) {
    stars.forEach(function (star) {
      star.z -= delta * 0.23;
      if (star.z < 0.16) resetStar(star, false);
      var point = project(star, star.z);
      if (point.x < -50 || point.x > width + 50 || point.y < -50 || point.y > height + 50) return;
      var tail = project(star, star.z + 0.025 + (1 - star.z) * 0.045);
      var length = Math.hypot(point.x - tail.x, point.y - tail.y);
      if (length > 65) {
        tail.x = point.x + (tail.x - point.x) * 65 / length;
        tail.y = point.y + (tail.y - point.y) * 65 / length;
      }
      context.strokeStyle = star.pink ? palette.pink : palette.cyan;
      context.fillStyle = context.strokeStyle;
      context.globalAlpha = 0.25 + (1 - star.z) * 0.65;
      context.lineWidth = 0.7 + (1 - star.z) * 1.2;
      context.beginPath();
      context.moveTo(tail.x, tail.y);
      context.lineTo(point.x, point.y);
      context.stroke();
      context.beginPath();
      context.arc(point.x, point.y, 1 + (1 - star.z) * 1.5, 0, Math.PI * 2);
      context.fill();
    });
  }

  function drawRadar(x, y, radius, direction) {
    var angle = time * 0.6 * direction;
    context.save();
    context.translate(x + camera.x * 0.15, y + camera.y * 0.15);
    context.strokeStyle = palette.cyan;
    context.fillStyle = palette.cyan;
    context.globalAlpha = 0.28;
    context.lineWidth = 1;
    for (var ring = 1; ring <= 3; ring += 1) {
      context.beginPath();
      context.arc(0, 0, radius * ring / 3, 0, Math.PI * 2);
      context.stroke();
    }
    context.beginPath();
    context.moveTo(-radius - 12, 0);
    context.lineTo(radius + 12, 0);
    context.moveTo(0, -radius - 12);
    context.lineTo(0, radius + 12);
    context.stroke();
    context.rotate(angle);
    context.globalAlpha = 0.14;
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, radius, 0, 0.55);
    context.closePath();
    context.fill();
    context.globalAlpha = 0.7;
    context.setLineDash([5, 8]);
    context.beginPath();
    context.arc(0, 0, radius + 6, 0, Math.PI * 1.6);
    context.stroke();
    context.setLineDash([]);
    context.strokeStyle = palette.pink;
    context.beginPath();
    context.arc(0, 0, radius * 0.7, 0.7, 2.8);
    context.stroke();
    context.fillStyle = palette.pink;
    context.beginPath();
    context.arc(radius, 0, 3, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function draw(delta) {
    camera.x += (pointer.x * 30 - camera.x) * Math.min(delta * 5, 1);
    camera.y += (pointer.y * 20 - camera.y) * Math.min(delta * 5, 1);
    context.clearRect(0, 0, width, height);
    drawGrid();
    drawStars(delta);
    if (width > 720) {
      var radius = Math.min(72, width * 0.055);
      drawRadar(width * 0.085, height * 0.3, radius, 1);
      drawRadar(width * 0.915, height * 0.68, radius * 0.85, -1);
    }
    context.globalAlpha = 1;
  }

  function animate(now) {
    frameId = null;
    if (!canAnimate()) return;
    if (!lastFrame) lastFrame = now;
    var elapsed = now - lastFrame;
    if (elapsed >= 1000 / 30) {
      var delta = Math.min(elapsed / 1000, 0.1);
      time += delta;
      draw(delta);
      lastFrame = now;
    }
    frameId = requestAnimationFrame(animate);
  }

  function sync() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastFrame = 0;
    if (!isActive()) {
      context.clearRect(0, 0, width, height);
      return;
    }
    var style = getComputedStyle(root);
    palette = {
      cyan: style.getPropertyValue('--cyber-cyan').trim(),
      pink: style.getPropertyValue('--cyber-pink').trim()
    };
    draw(0);
    if (canAnimate()) frameId = requestAnimationFrame(animate);
  }

  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-style', 'data-theme', 'data-effects'] });
  reducedMotion.addEventListener('change', sync);
  printing.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', function (event) {
    if (!canAnimate() || event.pointerType === 'touch') return;
    pointer.x = (event.clientX / width - 0.5) * 2;
    pointer.y = (event.clientY / height - 0.5) * 2;
  }, { passive: true });
  window.addEventListener('blur', function () {
    pointer.x = 0;
    pointer.y = 0;
  });
  resize();
})();
