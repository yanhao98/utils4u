import {
  START_LOCATION,
  type NavigationFailure,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
  type Router,
} from 'vue-router';

export function createLogGuard(router: Router) {
  function getLocatonMessageParams(location: RouteLocationNormalizedGeneric) {
    return [`${location === START_LOCATION ? 'START_LOCATION' : location.path}`];
  }

  function log({
    to,
    from,
    failure,
    isAfter,
  }: {
    to: RouteLocationNormalizedLoadedGeneric;
    from: RouteLocationNormalizedLoadedGeneric;
    failure?: NavigationFailure | void;
    isAfter: boolean;
  }) {
    console.debug(
      isAfter ? '↗️' : '🚗',
      '====================',
      isAfter ? `[ afterEach]` : `[beforeEach]`,
      '[',
      ...getLocatonMessageParams(from),
      '->',
      ...getLocatonMessageParams(to),
      ']',
      '====================',
      isAfter ? '🚗' : '↙️',
      ...(failure ? ['🚨 failure:', failure] : []),
    );
  }

  router.beforeEach(async (to, from) => {
    log({ to, from, isAfter: false });
  });

  router.afterEach(async (to, from, failure) => {
    log({ to, from, failure, isAfter: true });
  });
}
