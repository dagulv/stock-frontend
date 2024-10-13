import { PUBLIC_BASE_URL as baseUrl } from '$env/static/public';

function newFetcher(url = "") {
    return { ...fetcher, url }
}

const fetcher = {
    url: "",
    fetch: fetch,
    /**
     * @param {{ (input: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response>; (input: string | URL | Request, init?: RequestInit | undefined): Promise<Response>; (input: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response>; (input: string | URL | Request, init?: RequestInit | undefined): Promise<Response>; }} fetch
     */
    use(fetch) {
        return { ...this, fetch }
    },
    get(path, params) {
        return request.call(this, "GET", path, params)
    },
    post(path, body) {
        return request.call(this, "POST", path, body)
    },
    put(path, body) {
        return request.call(this, "PUT", path, body)
    },
    delete(path) {
        return request.call(this, "DELETE", path)
    }
}

/**
 * @this {fetcher}
 */
async function request(method = "GET", path = "", body = null) {
    const headers = {
        "Content-Type": "application/json"
    }

    if (method === "GET" && typeof body === "object") {
        const params = new URLSearchParams();

        for (const key in body) {
            if (typeof body[key] !== "boolean" && !body[key]) continue;

            params.set(key, body[key])
        }

        path += "?" + params.toString();
        body = null;
    }

    const accessToken = localStorage.getItem("access-token");

    if (accessToken) {
        headers["Authorization"] = "Bearer " + accessToken;
    }

    const opts = {
        method: method,
        credentials: "include",
        headers: headers
    };

    if (body) {
        opts.body = JSON.stringify(body);
    }

    let resp = await this.fetch(this.url + "/" + path, opts);

    let result;

    if (resp.status === 401) {
        resp = await this.fetch(baseUrl + "/auth/access-token", {
            credentials: "include"
        });

        if (resp.status < 200 || resp.status > 299) {
            // return error(resp.status);
            return;
        }

        result = await resp.json();
        console.log(result.accessToken);
        localStorage.setItem("access-token", result.accessToken);

        opts.headers["Authorization"] = "Bearer " + result.accessToken;

        resp = await this.fetch(this.url + "/" + path, opts);
    }

    if (resp.status < 200 || resp.status > 299) {
        // return error(resp.status, result.message);
        return;
    }

    return await resp.json();
}

export const api = newFetcher(baseUrl)