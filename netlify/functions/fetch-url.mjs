const allowedHosts = new Set(["myinstants.com", "www.myinstants.com"]);
const allowedMethods = new Set(["GET", "HEAD"]);

export default async function handler(request) {
    const requestUrl = new URL(request.url);
    const target = requestUrl.searchParams.get("url");

    if (!target) {
        return new Response("A target URL is required.", { status: 400 });
    }

    if (!allowedMethods.has(request.method)) {
        return new Response("Method not allowed.", { status: 405 });
    }

    let parsedTarget;
    try {
        parsedTarget = new URL(target);
    } catch {
        return new Response("Invalid target URL.", { status: 400 });
    }

    if (parsedTarget.protocol !== "https:" || !allowedHosts.has(parsedTarget.hostname)) {
        return new Response("Target host is not allowed.", { status: 403 });
    }

    const upstreamResponse = await fetch(parsedTarget.toString(), {
        method: request.method,
        headers: {
            accept: "text/html,application/octet-stream,*/*",
            "user-agent": "RandomSoundboard/1.0"
        }
    });

    const responseHeaders = new Headers();
    upstreamResponse.headers.forEach((value, name) => {
        if (!["content-length", "content-type", "content-encoding", "content-disposition", "cache-control", "etag", "last-modified", "accept-ranges"].includes(name)) {
            return;
        }
        responseHeaders.set(name, value);
    });

    return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders
    });
}
