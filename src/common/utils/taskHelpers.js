export function sortDict(dict) {
  const sortedDict = {};
  Object.values(dict).sort((a, b) => a.order - b.order).forEach((item, index) => {
    sortedDict[item.id] = { ...item, order: index + 1 };
  });
  return sortedDict;
}

export function sortDictAndRemove(dict, id) {
  console.log(id)
  const sortedDict = {};
  const removedList = Object.values(dict).filter(item => item.id !== id);
  console.log(removedList)
  removedList.sort((a, b) => a.order - b.order).forEach((item, index) => {
    sortedDict[item.id] = { ...item, order: index + 1 }
  });
  return sortedDict;
}
