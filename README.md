# utils4u

utils4u

## TypeScript 类型

定义了一些常用的全局类型。

使用方式 1：`shims.d.ts`

```typescript
/// <reference types="utils4u/ts-type-helpers" />
```

使用方式 2：`tsconfig.app.json`

```json
{
  "compilerOptions": {
    "types": ["utils4u/ts-type-helpers"]
  }
}
```

## createViteProxy

`.env.development.local`

```sh
VITE_PROXY=[["/api-1","http://127.0.0.1:8001"],["/api-2","http://127.0.0.1:8002"]]
```

`vite.config.ts`

```typescript
import { type ConfigEnv, loadEnv, type UserConfig } from "vite";
import { createViteProxy } from "utils4u";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    server: {
      // Load proxy configuration from .env
      proxy: createViteProxy(env.VITE_PROXY),
    },
  };
};
```
