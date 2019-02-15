export const valueEquals = function (a, b) {
  if (a === b) return true;
  
  // 如何比较两个数组是否相等（值相等而不是引用相等）
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  
  return true;
};

export const getValueByPath = function (object, prop) {
  console.log(1);
};
