const sortProducts = (products) => {
  const groupKeys = [
    'productSubptcd',
    'productCode',
    'prdProdNum',
    'prdProdCode',
    'riskLvlCde',
  ];
  const getGroupKey = (item) => groupKeys.map((k) => item[k]).join('|');

  // 分组工具函数
  function groupBy(array, getKey) {
    return array.reduce((acc, item) => {
      const key = getKey(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
  }

  // 1. 拆出 ELI 与非 ELI 产品（不修改原始数组）
  const eliProducts = products.filter((p) => p.productTypeName === 'ELI');
  const otherProducts = products.filter((p) => p.productTypeName !== 'ELI');

  // 2. 分组 ELI 产品，组内排序并标记 parent
  const grouped = groupBy(eliProducts, getGroupKey);
  const sortedEliProducts = Object.values(grouped).flatMap((groupItems) => {
    return groupItems
      .slice() // 避免原地排序影响外部数据
      .sort((a, b) => a.rowIndex - b.rowIndex)
      .map((item, idx) => {
        if (idx > 0) item.parent = true;
        return item;
      });
  });

  // 3. 其他产品排序：按 groupOrder 和 parent 排序
  const groupOrder = ['UT', 'SID', 'BOND', 'DPS'];
  const sortedOtherProducts = otherProducts.slice().sort((a, b) => {
    const groupComparison =
      groupOrder.indexOf(a.productTypeName) -
      groupOrder.indexOf(b.productTypeName);
    if (groupComparison !== 0) return groupComparison;
    return (a.parent ? 1 : 0) - (b.parent ? 1 : 0);
  });

  // 4. 合并：ELI 产品排前面
  const productsResult = [...sortedEliProducts, ...sortedOtherProducts];

  return productsResult;
};
