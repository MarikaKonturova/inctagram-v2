export const formattedDate = (dateCreatedAt: string) => {
    const inputDate = dateCreatedAt
    const date = new Date(inputDate)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
