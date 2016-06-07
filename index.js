require('./TweenMax.min');

const TIME = 5;
const TOTAL = 25;
const EMOJI = 'http://77g0kq.com1.z0.glb.clouddn.com/birthday-emoji.png';

const w = window.innerWidth;
const h = window.innerHeight;

const R = (min, max) => min + Math.random() * (max - min);

let animing = false;

const KEY = '__falling_emoji';

const isShowedAnim = () => {
  const result = window.localStorage.getItem(KEY);
  return result !== null && Date.now() < result;
};

const setAnimShowed = () => {
  window.localStorage.setItem(KEY, Date.now() + 1000 * 3600 * 3);
};

window.onload = (() => {
  const today = new Date();
  // only work on 6/8 every year
  if (today.getMonth() !== 5 || today.getDate() !== 8) return;
  $('body').append(`<style>
    .birthday-emoji {
      width: 28px;
      height: 28px;
      position: absolute;
      background: url(${EMOJI});
      background-size: 100% 100%;
    }
  <style>`);

  $('a#site-logo').on('click', e => {
    e.preventDefault();
    if (animing) return;
    startAnim();
  });

  if (!isShowedAnim()) startAnim();
});

function startAnim() {
  animing = true;
  setAnimShowed();
  const $container = $(document.createElement('div'));
  $container
    .css({
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: '0',
      zIndex: '10',
    })
    .attr('id', 'falling-birthday');

  $('body').append($container)

  TweenLite.set("#falling-birthday", {
    perspective: 600
  });

  for (let i = 0; i < TOTAL; i++) {
    const div = document.createElement('div');
    TweenLite.set(div, {
      attr: {
        class: 'birthday-emoji'
      },
      x: R(0, w),
      y: R(-500, -200),
      scale: R(0.8, 1.3),
    });
    $container.append(div);
    anim(div);
  }

  function anim(elm) {
    TweenMax.to(elm, R(TIME / 2, TIME / 1.5), {
      y: h + 100,
      ease: Linear.easeNone,
      repeat: 0,
      delay: R(0, TIME - TIME / 1.5),
    });
    TweenMax.to(elm, R(1, 4), {
      x: Math.random() > 0.5 ? '+=100' : '-=100',
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
  };

  setTimeout(() => {
    $container.remove();
    animing = false;
  }, TIME * 1000);
}
