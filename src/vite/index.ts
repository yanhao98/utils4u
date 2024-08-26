/**
 * Used to parse the .env.development proxy configuration
 */
import { loadEnv, type ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createViteProxy(list: ProxyList | string | undefined) {
  if (list === undefined) {
    list = loadEnv('development', process.cwd(), ['VITE_DEV_PROXY']).VITE_DEV_PROXY ?? [];
  }

  if (typeof list === 'string') {
    try {
      list = JSON.parse(list.replace(/'/g, '"'));
    } catch {
      list = [];
    }
  }

  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list as ProxyList) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
