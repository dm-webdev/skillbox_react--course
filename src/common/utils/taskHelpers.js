export function sortDict(dict) {
  const sortedDict = {};
  Object.values(dict).sort((a, b) => a.order - b.order).forEach((item, index) => {
    if (!item.done) {
      sortedDict[item.id] = { ...item, order: index + 1 };
    } else {
      sortedDict[item.id] = { ...item, order: -10 };
    }
  });
  return sortedDict;
}

export function sortDictAndRemove(dict, id) {
  const sortedDict = {};
  const removedList = Object.values(dict).filter(item => item.id !== id);
  removedList.sort((a, b) => a.order - b.order).forEach((item, index) => {
    if (!item.done) {
      sortedDict[item.id] = {...item, order: index + 1};
    } else {
      sortedDict[item.id] = { ...item, order: -10 };
    }
  });
  return sortedDict;
}
