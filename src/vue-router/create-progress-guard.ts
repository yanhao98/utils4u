import { type Router } from 'vue-router';

import NProgress from 'nprogress';

/**
 * ```<link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/nprogress/nprogress.css">```
 */
export function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });

  return NProgress;
}
