export function formatDateWithSlashSeparator({
  createdAt,
}: {
  createdAt: string
}): string {
  const dateCreatedPost = new Date(createdAt)
  const day = String(dateCreatedPost.getDate())
  const month = String(dateCreatedPost.getMonth() + 1).padStart(2, "0")
  const year = dateCreatedPost.getFullYear()

  return `${day}/${month}/${year}`
}
