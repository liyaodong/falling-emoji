require('./TweenMax.min');

window.onload = () => {
  TweenLite.set("#container", {
    perspective: 600
  });

  var total = 20;
  var warp = document.getElementById("container"),
  w = window.innerWidth,
  h = window.innerHeight;

  for (let i = 0; i < total; i++) {
    var Div = document.createElement('div');
    TweenLite.set(Div, {
      attr: {
        class: 'dot'
      },
      x: R(0, w),
      y: R(-200, -150)
    });
    warp.appendChild(Div);
    animm(Div);
  }

  function animm(elm) {
    TweenMax.to(elm, R(6, 15), {
      y: h + 100,
      ease: Linear.easeNone,
      repeat: -1,
      delay: -15
    });
    TweenMax.to(elm, R(4, 8), {
      x: '+=100',
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut
    });
  };

  function R(min, max) {
    return min + Math.random() * (max - min)
  };
}
