export function getRandomArrayElement<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomArrayElements<T>(arr: T[]) {
  const num = Math.floor(Math.random() * arr.length);
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
