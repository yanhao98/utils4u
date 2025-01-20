/**
 * @vitest-environment jsdom
 */
/**
 * https://cn.vitest.dev/guide/browser/
 */
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

import { createStackGuard } from '.';

describe('createStackGuard', () => {
  const debugSpy = vi.spyOn(globalThis.window.console, 'debug');

  debugSpy.mockImplementation((...args) => {
    if (process.env.TERM_PROGRAM !== 'vscode') return;
    console.log(...args);
  });

  it('simple test', async () => {
    function backPromise(): Promise<void> {
      router.back();
      return new Promise((resolve) => {
        async function popStateListener() {
          await flushPromises();
          globalThis.removeEventListener('popstate', popStateListener);
          resolve();
        }
        globalThis.addEventListener('popstate', popStateListener);
      });
    }

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/:pathMatch(.*)*',
          component: { template: '<div/>' },
        },
      ],
    });

    // createLogGuard(router);
    const stack = createStackGuard(router);
    /* const wrapper =  */ mount({ template: `<router-view />` }, { global: { plugins: [router] } });
    await router.push(''); // failure
    await router.isReady();

    await router.push('/A');
    await router.push('/B');
    await backPromise();
    await router.replace('/C');
    await router.push('/D');

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(stack.map((item) => item.path)).toEqual(['/', '/C', '/D']);
  });
});
