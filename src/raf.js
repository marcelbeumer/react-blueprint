import { once } from 'lodash';

export default once(() => ({
  requestAnimationFrame: global.requestAnimationFrame ||
    global.webkitRequestAnimationFrame ||
    global.mozRequestAnimationFrame,
  cancelAnimationFrame:
    global.cancelAnimationFrame ||
    global.webkitCancelAnimationFrame ||
    global.webkitCancelRequestAnimationFrame ||
    global.mozCancelAnimationFrame,
  now: (global.performance || Date).now,
}));
