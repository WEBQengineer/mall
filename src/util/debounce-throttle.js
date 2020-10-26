/**
 * 
 * @param {要执行的参数} fn 
 * @param {间隔时间} delay 
 * @param {是否立即执行} immediate 
 */
export function _debounce(fn, delay, immediate) {
  let timer = null;

  return function() {
    const context = this;
    const args = arguments;

    return new Promise((resolve) => {
      timer && clearTimeout(timer);
      if (immediate) {
        const doNow = !timer;
        timer = setTimeout(() => {
            timer = null;
        }, delay);
        doNow && resolve(fn.apply(context, args));
      } else {
        timer = setTimeout(() => {
            resolve(fn.apply(context, args));
        }, delay);
      }
    });
  };
}

/**
 * 规定options中
 * { immediate: false } 阻止立即执行，
 * { trailing: false } 阻止停止触发后的再次触发
 * @param {*} fn 
 * @param {*} delay 
 * @param {必须指定options的两个值} options 
 */
export function _throttle(fn, delay, options={}) {
  let timer = null;
  let last = 0;

  return function() {
      const context = this;
      console.log('截流中的',context)
      const args = arguments;
      const now = +new Date();
      if (last === 0 && options.immediate === false) {    // 这个条件语句是新增的
          last = now;
      }
      const offset = now - last;
      if (offset > delay) {
          if (timer) {
              clearTimeout(timer);
              timer = null;
          }
          last = now;
          fn.apply(context, args);
      }
      else if (!timer && options.trailing !== false) {  // options.trailing !== false 是新增的
          timer = setTimeout(() => {
              last = options.immediate === false ? 0 : +new Date();
              timer = null;
              fn.apply(context, args);
          }, delay - offset);
      }
  };
}