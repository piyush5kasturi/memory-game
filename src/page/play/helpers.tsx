export function CardImages(total: number) {
  return [...Array(total).keys()].map((i) => ({
    src: `/images/1 (${i}).png`,
    matched: false,
  }));
}
