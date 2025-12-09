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
  {
    id,
    parentId,
    rootId,
    isRoot,
  }: {
    id: string;
    parentId: string;
    rootId?: string | number;
    isRoot?: (item: T) => boolean;
  },
): TTree<T>[] {
  /** map between id and array position */
  const map: Record<string | number, number> = {};

  // [深拷贝](https://baijiahao.baidu.com/s?id=1765652696079292086&wfr=spider&for=pc)
  const treeList: TTree<T>[] = deepClone(list) as TTree<T>[];

  for (const [i, element_] of treeList.entries()) {
    /** initialize the map */
    map[(element_ as unknown as Record<string, string | number>)[id]!] = i;
    /** initialize the children */
    element_.children = [];
  }

  let node: TTree<T> & Record<string, any>;
  /** return value */
  const roots: TTree<T>[] = [];

  for (const item of treeList) {
    node = item as TTree<T> & Record<string, any>;
    const parentIdValue = node[parentId];

    let isRootNode = false;

    if (isRoot) {
      isRootNode = isRoot(node);
    } else if (rootId !== undefined) {
      isRootNode = parentIdValue === rootId;
    } else {
      // Auto-detection: if parentId is not in the map, it's a root
      isRootNode = map[parentIdValue] === undefined;
    }

    if (isRootNode) {
      roots.push(node);
    } else {
      const parentIndex = map[parentIdValue];
      if (parentIndex !== undefined) {
        treeList[parentIndex]?.children?.push(node);
      }
    }
  }
  return roots;
}
