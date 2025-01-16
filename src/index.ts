/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const sizeLimit = 1024 * 1024 * 1024 * 10 // 10GB
const index_url = 'https://raw.githubusercontent.com/Stareven233/cf-proxy/refs/heads/main/src/index.html'
const exps = [
	/^(?:https?:\/\/)?github\.com\/([^/]+)\/([^/]+)\/(?:releases|archive)\/.*$/i,
	/^(?:https?:\/\/)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/.*$/i,
	/^(?:https?:\/\/)?github\.com\/([^/]+)\/([^/]+)\/(?:info|git-).*$/i,
	/^(?:https?:\/\/)?raw\.github(?:usercontent|)?\.com\/([^/]+)\/([^/]+)\/.+?\/.+$/i,
	/^(?:https?:\/\/)?gist\.github(?:usercontent|)?\.com\/([^/]+)\/.+?\/.+$/i,
	/^(?:https?:\/\/)?api\.github\.com\/repos\/([^/]+)\/([^/]+)\/.*$/i,
	/^(?:https?:\/\/)?huggingface\.co(?:\/spaces)?\/([^/]+)\/(.+)$/i,
	/^(?:https?:\/\/)?cdn-lfs\.hf\.co(?:\/spaces)?\/([^/]+)\/([^/]+)(?:\/(.*))?$/i,
	/^(?:https?:\/\/)?download\.docker\.com\/([^/]+)\/.*\.(tgz|zip)$/i,
]

interface Config {
	whiteList: string[]
	blackList: string[]
}

let config: Config = {
	whiteList: [],
	blackList: []
}

// async function loadConfig() {
// 	const response = await fetch('https://example.com/config.json')
// 	config = await response.json()
// }

function checkURL(u: string): string[] | null {
	for (const exp of exps) {
		const matches = exp.exec(u)
		if (matches) {
			return matches.slice(1)
		}
	}
	return null
}

function checkList(matches: string, list: string[]): boolean {
	for (const item of list) {
		if (matches.startsWith(item)) {
			return true
		}
	}
	return false
}

async function proxy(request: Request, url: string): Promise<Response> {
	const response = await fetch(url, {
		method: request.method,
		headers: request.headers,
		body: request.body
	})

	if (response.headers.get('content-length') && parseInt(response.headers.get('content-length')!, 10) > sizeLimit) {
		return new Response('File too large.', { status: 413 })
	}

	const headers = new Headers(response.headers)
	headers.delete('Content-Security-Policy')
	headers.delete('Referrer-Policy')
	headers.delete('Strict-Transport-Security')

	return new Response(response.body, {
		status: response.status,
		headers: headers
	})
}

export default {
	async fetch(request: Request): Promise<Response> {
		let rawPath = new URL(request.url).pathname.slice(1)
		if (rawPath === '') {
			return new Response('External Server Error', { status: 500 })
		}
		else if (!rawPath.startsWith('proxy')) {
			return new Response('Invalid input', { status: 403 })
		} else {
			rawPath = rawPath.replace(/^proxy\/?/, '')
		}
		if (rawPath === '') {
			// TODO 修改index_url地址, 增加/proxy后缀
			return fetch(index_url)
		} else if (!rawPath.startsWith('http')) {
			return new Response('Invalid input', { status: 403 })
		}

		const matches = checkURL(rawPath)
		if (matches) {
			if (config.whiteList.length > 0 && !checkList(matches[0], config.whiteList)) {
				return new Response('Not in whitelist, access restricted.', { status: 403 })
			}
			if (config.blackList.length > 0 && checkList(matches[0], config.blackList)) {
				return new Response('Access restricted by blacklist.', { status: 403 })
			}
		} else {
			return new Response('Invalid input', { status: 403 })
		}

		if (exps[1].test(rawPath)) {
			rawPath = rawPath.replace('/blob/', '/raw/')
		}

		return proxy(request, rawPath)
	}
}

// loadConfig()
// setInterval(loadConfig, 10 * 60 * 1000)
