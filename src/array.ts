/**
 * https://juejin.cn/post/7020738391616520200
 * https://stackblitz.com/edit/typescript-flat-list-to-tree-demo?file=index.ts
 */

export type TTree<T> = {
  children?: TTree<T>[];
} & T;

type Recorable = Record<string, any>;

// config的type
interface IConfig {
  id: string;
  parentId: string;
}

/**
 * flat list to tree
 *
 * @param list - a flat list
 * @example `flatListToTree<IFolder>(folderArr, { id: 'folderId', parentId: 'folderParentId' });`
 */
export function flatListToTree<T extends Recorable = Recorable>(
  list: T[],
  { id, parentId }: IConfig
): TTree<T>[] | [] {
  const tree: TTree<T>[] = [];
  const hash: Record<string, TTree<T>> = {};
  list.forEach((item) => {
    hash[item[id]] = item;
  });
  list.forEach((item) => {
    const parent = hash[item[parentId]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
}
