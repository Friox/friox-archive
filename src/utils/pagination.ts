export const calculatePaginatedPosts = <T>(data: T[], page: number, pageSize: number): T[] => {
  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  return data.slice(startRange, endRange)
}