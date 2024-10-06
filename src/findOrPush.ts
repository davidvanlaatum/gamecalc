export function findOrPush<T>(a: Array<T>, predicate: (item: T) => boolean, newItem: () => T): T {
  let item = a.find(predicate);
  if (!item) {
    item = newItem();
    a.push(item);
  }
  return item;
}
