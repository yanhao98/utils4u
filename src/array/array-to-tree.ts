type TTree<T> = {
  children?: TTree<T>[];
} & T;

const deepClone = globalThis.structuredClone ?? ((value: any) => JSON.parse(JSON.stringify(value)));

/**
 * flat list to tree
 *
 * @param list - a flat list
 * @param params - `{ id, parentId }`: id name and parentId name
 * @example `arrayToTree<IFolder>(folderArr, { id: 'folderId', parentId: 'folderParentId' });`
 * @returns `TTree`
 */
export function arrayToTree<T>(
  list: T[],
  { id, parentId, rootId = 0 }: { id: string; parentId: string; rootId?: string | number | ((item: T) => boolean) },
): TTree<T>[] {
  /** map between id and array position */
  const map: Record<string | number, number> = {};

  // [深拷贝](https://baijiahao.baidu.com/s?id=1765652696079292086&wfr=spider&for=pc)
  const treeList: TTree<T>[] = deepClone(list) as TTree<T>[];
  // const treeList: TTree<T>[] = cloneDeep(list) as TTree<T>[];
  // console.debug('list :>> ', JSON.stringify(list, null, 2), list);
  // console.debug(`list :>> `, list);
  // console.debug(`treeList :>> `, treeList);
  for (const [i, element_] of treeList.entries()) {
    /** initialize the map */
    map[(element_ as unknown as Record<string, string | number>)[id]] = i;
    /** initialize the children */
    element_.children = [];
  }

  const isRoot =
    typeof rootId === 'function'
      ? (item: T) => (rootId as (item: T) => boolean)(item)
      : (item: T) => (item as unknown as Record<string, any>)[parentId] === rootId;

  let node: TTree<T> & { [parentId: string]: number };
  /** return value */
  const roots: TTree<T>[] = [];

  for (const item of treeList) {
    node = item as TTree<T> & { [parentId: string]: number };
    if (isRoot(node)) {
      roots.push(node);
    } else {
      if (treeList[map[node[parentId]]] !== undefined) {
        treeList[map[node[parentId]]].children?.push(node);
      }
    }
  }
  return roots;
}
