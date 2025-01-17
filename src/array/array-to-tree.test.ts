import { describe, expect, it } from 'vitest';

import { arrayToTree } from '.';

describe('arrayToTree', () => {
  it('应该将扁平数组转换为树形结构', () => {
    const input = [
      { id: 1, parentId: 0, name: 'Item 1' },
      { id: 2, parentId: 1, name: 'Item 2' },
      { id: 3, parentId: 1, name: 'Item 3' },
      { id: 4, parentId: 2, name: 'Item 4' },
      { id: 5, parentId: 0, name: 'Item 5' },
    ];

    const expected = [
      {
        id: 1,
        parentId: 0,
        name: 'Item 1',
        children: [
          {
            id: 2,
            parentId: 1,
            name: 'Item 2',
            children: [
              {
                id: 4,
                parentId: 2,
                name: 'Item 4',
                children: [],
              },
            ],
          },
          {
            id: 3,
            parentId: 1,
            name: 'Item 3',
            children: [],
          },
        ],
      },
      {
        id: 5,
        parentId: 0,
        name: 'Item 5',
        children: [],
      },
    ];

    const result = arrayToTree(input, { id: 'id', parentId: 'parentId' });
    expect(result).toEqual(expected);
  });

  it('应该正确处理空数组', () => {
    const result = arrayToTree([], { id: 'id', parentId: 'parentId' });
    expect(result).toEqual([]);
  });

  it('应该支持自定义根节点ID', () => {
    const input = [
      { id: 1, parentId: -1, name: 'Root' },
      { id: 2, parentId: 1, name: 'Child' },
    ];

    const expected = [
      {
        id: 1,
        parentId: -1,
        name: 'Root',
        children: [
          {
            id: 2,
            parentId: 1,
            name: 'Child',
            children: [],
          },
        ],
      },
    ];

    const result = arrayToTree(input, { id: 'id', parentId: 'parentId', rootId: -1 });
    expect(result).toEqual(expected);
  });
});
