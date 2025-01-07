import { type RouteLocationNormalized, type Router, START_LOCATION } from 'vue-router';

declare type StackItem = RouteLocationNormalized & { locationHref: string };

export function createStackGuard(router: Router) {
  const stack: StackItem[] = [];
  // Object.assign(window, { stack });
  let strPos = -1;
  let curPos = -1;

  /* window.addEventListener('beforeunload', function (event) {
    console.debug('🚥', '[onbeforeunload]', 'event :>> ', event);
    const confirmationMessage = '\\o/';

    (event || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome etc.
  }); */

  /* _routerHistory.listen((to, from, info) => {
    console.debug('🚥 [histListen]', 'from :>> ', from);
    console.debug('🚥 [histListen]', 'to :>> ', to);
    console.debug('🚥 [histListen]', 'info :>> ', info);
    // lastNavigationInfo.lastInfo = info;
  }); */

  // #############################
  // 重写 router.history 方法
  // #############################
  /* (() => {
    const _routerHistory = router.options.history;
    const routerHistoryPush = _routerHistory.push;
    _routerHistory.push = function (...args) {
      console.debug('🚥', 'push: args :>> ', args);
      return routerHistoryPush.call(this, ...args);
    };
    const routerHistoryReplace = _routerHistory.replace;
    _routerHistory.replace = function (...args) {
      console.debug('🚥', 'replace: args :>> ', args);
      return routerHistoryReplace.call(this, ...args);
    };
    const routerHistoryGo = _routerHistory.go;
    _routerHistory.go = function (...args) {
      console.debug('🚥', 'go: args :>> ', args);
      return routerHistoryGo.call(this, ...args);
    };
  })(); */

  // #############################
  // 重写 window.history 方法
  // #############################
  /* (() => {
    const browserHistoryBack = window.history.back;
    window.history.back = function (...args) {
      console.debug('🌐', 'history.back: args :>> ', args);
      return browserHistoryBack.call(this, ...args);
    };
    const browserHistoryForward = window.history.forward;
    window.history.forward = function (...args) {
      console.debug('🌐', 'history.forward: args :>> ', args);
      return browserHistoryForward.call(this, ...args);
    };
    const browserHistoryGo = window.history.go;
    window.history.go = function (...args) {
      console.debug('🌐', 'history.go: args :>> ', args);
      return browserHistoryGo.call(this, ...args);
    };
    const browserHistoryPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      console.debug('🌐', 'history.pushState: args :>> ', args);
      return browserHistoryPushState.call(this, ...args);
    };
    const browserHistoryReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      console.debug('🌐', 'history.replaceState: args :>> ', args);
      return browserHistoryReplaceState.call(this, ...args);
    };
  })(); */

  router.afterEach(async (to, from, failure) => {
    if (failure) return;

    if (from === START_LOCATION) {
      strPos = history.state.position;
      curPos = strPos - 1;
    }
    const newPos = history.state.position;
    // const delta = newPos - curPos;
    // console.debug('strPos :>> ', strPos);
    // console.debug('newPos :>> ', newPos);
    // console.debug('delta :>> ', delta);
    const stackIdx = newPos - strPos;
    let diractionEmoji = '';
    if (newPos > curPos) {
      diractionEmoji = '==→';
    } else if (newPos < curPos) {
      diractionEmoji = '←==';
    } else {
      diractionEmoji = '=↺=';
    }
    Object.assign(to, { locationHref: globalThis.location.href });
    stack[stackIdx] = to as StackItem;

    curPos = newPos;

    console.debug(
      diractionEmoji,
      'stack :>>',
      stack.map((item, index) => (stackIdx === index ? `${item.fullPath}📍` : item.fullPath)),
      // stack
    );
    console.debug(`%c${'-'.repeat(80)}`, 'color: #409EFF;');
  });

  return stack;
}
