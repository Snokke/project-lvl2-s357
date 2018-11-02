const valueToString = (value, depth) => {
  if (value instanceof Object) {
    const result = Object.keys(value).map(key => `${'    '.repeat(depth + 2)}${key}: ${value[key]}`).join('\n');
    return `{\n${result}\n${'    '.repeat(depth + 1)}}`;
  }
  return value;
};

const mappingState = {
  changed: (item, depth) => `  + ${item.key}: ${valueToString(item.newValue, depth)}\n${'    '.repeat(depth)}  - ${item.key}: ${valueToString(item.value, depth)}`,
  unchanged: (item, depth) => `    ${item.key}: ${valueToString(item.value, depth)}`,
  deleted: (item, depth) => `  - ${item.key}: ${valueToString(item.value, depth)}`,
  new: (item, depth) => `  + ${item.key}: ${valueToString(item.value, depth)}`,
};

const render = (ast) => {
  const iter = (data, depth) => {
    const result = data.reduce((acc, item) => {
      if (item.children.length !== 0) {
        const newDepth = depth + 1;
        return `${acc}\n${'    '.repeat(newDepth)}${item.key}: ${iter(item.children, newDepth)}`;
      }
      return `${acc}\n${'    '.repeat(depth)}${mappingState[item.state](item, depth)}`;
    }, '');
    return `{${result}\n${'    '.repeat(depth)}}`;
  };

  return iter(ast, 0);
};

export default render;
