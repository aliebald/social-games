export function getRandomArrayElement<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomArrayElements<T>(arr: T[], max?: number) {
  const maxNum = Math.min(arr.length, max ?? arr.length);
  const num = Math.floor(Math.random() * Math.min(arr.length, maxNum));
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
