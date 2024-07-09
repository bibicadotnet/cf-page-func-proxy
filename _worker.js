const API_HOST = "res.cloudinary.com/xinclub/f_webp,q_auto:best/img/"

async function handleRequest(event) {
    const url = new URL(event.request.url)
    const pathname = url.pathname
    const search = url.search
    const pathWithParams = pathname + search
}
