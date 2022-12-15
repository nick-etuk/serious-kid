export function wordCount(str: string | undefined): number {
  if (!str) return 0;
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
}
