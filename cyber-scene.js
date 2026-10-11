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
    var count = width <= 720 ? 70 : 160;
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

  function drawFlightGates() {
    var centerX = width * 0.5 + camera.x;
    var centerY = height * 0.42 + camera.y;
    var phase = (time * 0.28) % 1;
    var gates = [];
    for (var i = 0; i < 7; i += 1) {
      gates.push({ depth: 0.24 + ((i / 7 - phase + 1) % 1) * 1.5, pink: i % 3 === 0 });
    }
    gates.sort(function (a, b) { return b.depth - a.depth; });
    gates.forEach(function (gate) {
      var radiusX = width * 0.24 / gate.depth;
      var radiusY = height * 0.24 / gate.depth;
      var fade = Math.min((gate.depth - 0.24) / 0.16, (1.74 - gate.depth) / 0.2, 1);
      context.strokeStyle = gate.pink ? palette.pink : palette.cyan;
      context.fillStyle = context.strokeStyle;
      context.globalAlpha = Math.max(0, fade) * (0.12 + 0.24 / gate.depth);
      context.lineWidth = Math.min(2.5, 0.8 + 0.5 / gate.depth);
      context.beginPath();
      for (var corner = 0; corner < 8; corner += 1) {
        var angle = Math.PI / 8 + corner * Math.PI / 4;
        var x = centerX + Math.cos(angle) * radiusX;
        var y = centerY + Math.sin(angle) * radiusY;
        if (corner === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();
      for (var marker = 0; marker < 8; marker += 1) {
        var direction = Math.PI / 8 + marker * Math.PI / 4;
        var markX = centerX + Math.cos(direction) * radiusX;
        var markY = centerY + Math.sin(direction) * radiusY;
        context.fillRect(markX - 2, markY - 2, 4, 4);
      }
    });
    context.strokeStyle = palette.cyan;
    context.lineWidth = 0.8;
    context.globalAlpha = 0.1;
    for (var lane = 0; lane < 8; lane += 1) {
      var laneAngle = Math.PI / 8 + lane * Math.PI / 4;
      context.beginPath();
      context.moveTo(centerX + Math.cos(laneAngle) * 40, centerY + Math.sin(laneAngle) * 30);
      context.lineTo(centerX + Math.cos(laneAngle) * width, centerY + Math.sin(laneAngle) * height);
      context.stroke();
    }
  }

  function drawStars(delta) {
    stars.forEach(function (star) {
      star.z -= delta * 0.34;
      if (star.z < 0.16) resetStar(star, false);
      var point = project(star, star.z);
      if (point.x < -50 || point.x > width + 50 || point.y < -50 || point.y > height + 50) return;
      var tail = project(star, star.z + 0.035 + (1 - star.z) * 0.09);
      var length = Math.hypot(point.x - tail.x, point.y - tail.y);
      var maxTrail = width <= 720 ? 65 : 110;
      if (length > maxTrail) {
        tail.x = point.x + (tail.x - point.x) * maxTrail / length;
        tail.y = point.y + (tail.y - point.y) * maxTrail / length;
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

  function drawCockpit() {
    var inset = width <= 720 ? 6 : 18;
    var top = height <= 600 ? 72 : 112;
    var lower = height - 24;
    var bevel = Math.min(72, width * 0.06);
    var left = inset + camera.x * 0.08;
    var right = width - inset + camera.x * 0.08;
    context.strokeStyle = palette.rail;
    context.globalAlpha = 0.5;
    context.lineWidth = width <= 720 ? 5 : 10;
    context.beginPath();
    context.moveTo(left + bevel, top);
    context.lineTo(left, top + bevel);
    context.lineTo(left, lower - bevel);
    context.lineTo(left + bevel, lower);
    context.moveTo(right - bevel, top);
    context.lineTo(right, top + bevel);
    context.lineTo(right, lower - bevel);
    context.lineTo(right - bevel, lower);
    context.stroke();
    context.strokeStyle = palette.cyan;
    context.globalAlpha = 0.55;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(left + bevel, top + 7);
    context.lineTo(left + 8, top + bevel);
    context.lineTo(left + 8, lower - bevel);
    context.lineTo(left + bevel, lower - 7);
    context.moveTo(right - bevel, top + 7);
    context.lineTo(right - 8, top + bevel);
    context.lineTo(right - 8, lower - bevel);
    context.lineTo(right - bevel, lower - 7);
    context.stroke();
  }

  function drawFlightHUD(x, y, panelWidth, engine) {
    context.save();
    context.translate(x, y);
    context.fillStyle = palette.panel;
    context.globalAlpha = 0.85;
    context.fillRect(0, 0, panelWidth, 142);
    context.strokeStyle = palette.cyan;
    context.globalAlpha = 0.65;
    context.lineWidth = 1;
    context.strokeRect(0, 0, panelWidth, 142);
    context.font = '10px monospace';
    context.fillStyle = palette.cyan;
    context.globalAlpha = 0.8;
    context.fillText(engine ? 'PROPULSION // CRUISE' : 'NAV // STAR CORRIDOR', 10, 18);
    context.fillStyle = palette.pink;
    context.fillText(engine ? 'ION DRIVE' : 'VECTOR LOCK', 10, 35);
    if (engine) {
      for (var bar = 0; bar < 12; bar += 1) {
        var level = 14 + (Math.sin(time * 1.5 + bar * 0.6) + 1) * 21;
        context.fillStyle = bar > 8 ? palette.pink : palette.cyan;
        context.globalAlpha = 0.45 + (bar % 3) * 0.12;
        context.fillRect(10 + bar * (panelWidth - 20) / 12, 101 - level, (panelWidth - 20) / 12 - 3, level);
      }
    } else {
      var centerX = panelWidth / 2;
      context.globalAlpha = 0.5;
      context.strokeStyle = palette.cyan;
      context.beginPath();
      context.arc(centerX, 80, 27, 0, Math.PI * 2);
      context.moveTo(centerX - 38, 80);
      context.lineTo(centerX + 38, 80);
      context.moveTo(centerX, 44);
      context.lineTo(centerX, 116);
      context.stroke();
      context.fillStyle = palette.pink;
      context.globalAlpha = 0.85;
      context.beginPath();
      context.arc(centerX + camera.x * 0.3, 80 + camera.y * 0.3, 3, 0, Math.PI * 2);
      context.fill();
    }
    context.strokeStyle = palette.pink;
    context.globalAlpha = 0.6;
    context.beginPath();
    context.moveTo(10, 121);
    context.lineTo(panelWidth - 10, 121);
    context.stroke();
    context.fillStyle = palette.cyan;
    context.fillText('FLIGHT VISUAL // ZF', 10, 134);
    context.restore();
  }

  function draw(delta) {
    camera.x += (pointer.x * 45 - camera.x) * Math.min(delta * 4, 1);
    camera.y += (pointer.y * 28 - camera.y) * Math.min(delta * 4, 1);
    context.clearRect(0, 0, width, height);
    drawFlightGates();
    drawStars(delta);
    drawCockpit();
    if (width >= 1200 && height >= 500) {
      var panelWidth = Math.min(180, (width - 860) / 2 - 36);
      drawFlightHUD(36, height * 0.3, panelWidth, false);
      drawFlightHUD(width - panelWidth - 36, height * 0.64, panelWidth, true);
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
      pink: style.getPropertyValue('--cyber-pink').trim(),
      rail: style.getPropertyValue('--cyber-border').trim(),
      panel: style.getPropertyValue('--cyber-bg').trim()
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
