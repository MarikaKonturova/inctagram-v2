export const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.toString())
}
