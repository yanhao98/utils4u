import { describe, expect, it } from 'vitest';
import { Bench } from 'tinybench';
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

  it('性能测试：处理大量数据', async () => {
    // 生成1000个节点的测试数据
    const input = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      parentId: index === 0 ? 0 : Math.floor(index / 2),
      name: `Item ${index + 1}`,
    }));

    const bench = new Bench({ time: 100 });

    bench.add('arrayToTree - 1000个节点', () => {
      arrayToTree(input, { id: 'id', parentId: 'parentId' });
    });

    await bench.run();

    console.log('性能测试结果：');
    console.table(bench.table());

    // 确保函数能正常处理大量数据
    const result = arrayToTree(input, { id: 'id', parentId: 'parentId' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
