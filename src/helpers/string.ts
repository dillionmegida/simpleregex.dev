export function truncateStr (str: string, count: number = 50) {
  if (str.length <= count) return str

  const truncatedStr = str.substring(0, count - 1)
  return truncatedStr + '...'
}