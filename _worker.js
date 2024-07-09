const API_HOST = "res.cloudinary.com/xinclub/f_webp,q_auto:best/img/"

async function handleRequest(event) {
    const url = new URL(event.request.url)
    const pathname = url.pathname
    const search = url.search
    const pathWithParams = pathname + search
    if (pathname.startsWith("/static/")) {
        return retrieveStatic(event, pathWithParams)
    } else {
        return forwardRequest(event, pathWithParams)
    }
}

async function retrieveStatic(event, pathname) {
    let response = await caches.default.match(event.request)
    if (!response) {
        response = await fetch(`https://${API_HOST}${pathname}`)
        event.waitUntil(caches.default.put(event.request, response.clone()))
    }
    return response
}

async function forwardRequest(event, pathWithSearch) {
    const request = new Request(event.request)
    request.headers.delete("cookie")
    return await fetch(`https://${API_HOST}${pathWithSearch}`, request)
}

addEventListener("fetch", (event) => {
    event.passThroughOnException()
    event.respondWith(handleRequest(event))
})
