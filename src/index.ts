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

// const sizeLimit = 1024 * 1024 * 1024 * 10 // 10GB
// src/index.min.html + https://www.w3cschool.cn/tools/index?name=html_minifier
const index_html = `
 <!DOCTYPE html><html lang=zh><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1"><meta name=description content=Github文件加速><meta name=keywords content=Github,文件加速,ghproxy><meta name=color-scheme content="dark light"><title>Cloudflare文件加速</title><link rel=icon type=image/x-icon href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAA5ySURBVHhe7Z0HVFTHGsc/jRqNimAvUWOJvWtiicZCPHpQ7Ek0eRqj6ItBFKOgiCL2hscuKPDsnryoGH2xxd5Rj73ELlGxgS0WDLaX/zgELtzLnTu7d+++8/Z3joeZWdld5tuZ+dp8m+XNX5ALy8jKf7qwCJcALMYlAItxCcBiXAKwGJcALMYlAItxajvg7t27dOLECTp27BidP3+e4uPj6fr165SQkEAvX76khw8fUvbs2Sl37tzk4eHBfhYpUoQqVqz497/atWtToUKF+DM6H04lgKSkJNq8eTNt2bKFtm3bRiP3d+SPyNO94GSqUaMGNW/enDw9Pemzzz6jnDlz8ketx3IBvH79mn799VdatmwZrVu3jsLjfPkj5uBbNpw+//xz6tGjBzVu3JiyZMnCH7EGywTw5MkTio6Oprlz59Ko2M581LGE1l9FAQEB9M0339C7777LRx2Lww9hbDPTpk2jsmXLUsHuty2bfBB6sAvl7nKVypUrRzNnzmTvzdE4VACrVq2iChUqUNFvE2n6ud581Homn+zOPgzVq1enDRs28FHH4JAt6NatW9SrVy/6x/JafEQMHKBVqlShOnXqsIMUwnv//fepRIkSlCNHDnJ3d6cXL17Q06dP6cGDB/T48WO6dOkS05jw7+DBg1IH+Wqf8zRr1iz2WmZjugCgLtaqVYuCdnvzkczpW3IWtW3bljp06EAtWrRgaqUt3Lx5k7Zv306//PILrV27lqLi/fkjmTPgwwW0cOFCateuHR8xB9MFsHPnToqvsZn3tJnRaiv5+flR586dmT5vBo8ePWLb4IIFC2jAxhZ8VBuswEGDBtGkSZOYvWEGpp8Bf/75J2+pE93lIJU+24YOHz7MVEOzJh/ky5ePevfuzbamIkc9KapzLH9EnaWJQ6lOcA5mO8DoMwPTBQBdO6DaYt5LZXzjtWwSsD3g/zgaTOqOHTvYexjbaA0fVafvmkbUtGlTtp3ZG9MFgE/0+vXrKcxzE+v7V4yiG5HudPz4cTYJVoP3cPLkSbo23418SszgoxkJ3OFFn3zyCTvk7YlDDbE//viD8ubNa7n1qQX8Tl9++WWmmtPIev+mffv2UbFixfiIbVhmCTsrsND79u1LbeaU5iMZmdJ8A+3atYupwbbicEvY2cmTJw8tX76cTk/lAypgO4KaDBvEVlwCUAFb5MSJEylhSRGmiqrRJ6YhDR8+nPfkcW1BOsybN4/ydb3Oe0ognDVr1lD79u35iHFcAhBg2LBhVD1QXXEYWCGSHd5wj8hgqQBCQkJY4AWeUaiDsIKxB5sJ/EWrV69mr3vlyhUWpBkzZgx/VB1M0VdffUVt537AR5T8/M9LtHLlSt4zhmUCgFEDN3BSWGE+QuQe/IiGDh1KgwcPZs42ewKLPCwsjKZMmUKPJqRqL7mG3KW4uDhdnxMEV69ePQo50ImPKCl4uBm1atWK98SROoShqkENgwEjS0xMjGLywcPx+SjILYI54RD3tReILSMkGey+QDH5AO8BkTg9YL/89NNPmsYa/FjPnz/nPXEMCwBLt1SpUtT0dA+qsceb2rRpI/XCcNJpsbfbdWrQoAHbImzl8uXL7Ln2fx3PRzKye/du3sqcmjVr0ogRI3hPCQJLUVFRvCeOoS3o2bNnVKZMGboTogxqj73vQyNHjuQ9MeDjP9r7Hu+pU3VeHtq/fz+9evWK9u7dyybq6NGjdO3aNbp//z7zbgI42fLnz88+GHjeTz/9lPmXsmbNSo0aNaKzvk/Z/9Oi4bLidODAAd7LHGxlEISatRxUazlzVRjZPg0JIDIykvokj+O9VFr+XIFlMhihcuXK9Fv/Z7ynTaHQZ2yyX80yFhx5Z8ANJpSE0Pf4iDbVwvPS6dOneU8f/K13627nPSVJMeXIx8eH9/QxtAUhgK5G8eLFeUsc7KkiYAKNTj7A74hMPjB64Lds2ZIiO6mvGBzyRvQaYQFg+R/v84D3lMCPbxRoQM4Cti6jBAcH85YSnAVw1okiLICIiAjeUoJ9GlqLUXAwOgulS2s73rTAKpjZehvvKVmyZAlv6SMkADidtLIF+vfvL+Ve9vb2pqx+6ia+o0HAX4Y+ffrwlhIYZaKaodAhjKhVi9++5b1U8gy9R7dv35a2XrFytne+zHvWcdVrJ9PujIIwJeICaoF+j9gm5OXlxXvaCK0ArU8/lqHs5MOYQ7Kt1bwXkCCdvIt4AFayGrCXRBASAFI61BCRsBawHM8PMG7A2ZtnUwux9ERZkEKjBuLNIugKAMvsnF/GlD3s37ICgEa1sJ66Hm0F8+fPZ4aeDHBxqAEP6b17mRuaQFcAp06d4i0lyFKTdcHqeR8dzevZJWn8+PG8Z4ySJUvS6AareS+VJQmB7F6DHroC0LIQZTUHPN/Wjhd5z3nAvYSzZ8/ynjHq16/PW0qQHqmH9ApAIqsMWueJ1WAVIH1GBtzEUcMuArhw4QJvKalWrRpvGWPr1q285XzIvjdTBaCVkidjPYLff/+dt5wPuK5lKF++PG8pgY2kh64AUly+6YELWAakqjsrIhOmhlZ+EKJoekgLwM3NjbeMYY9cGrNA3EEGLc+uXQSAdEI1ZAVQoEAB3nI+ZN+bqQLQchUh2iQDAjHOiux705ojESel7ixq+XoQnpRBJnPAUbRu3Zq3jKGlqIick7oC0NpqcC9Lhi5duvCWcwHXCvKSZNDapu0iAK0VIKsxIAmr2Urjrl+zwQWMDz5QT7zSwxZNUVcARYsW5S0ltujzU6dOdZpgDEAAH+9JFq25EElf1xWAlpV39epV3jLORx99JBVHNgvclEfWmyxa/jI4LPWQFoCIpy8zZs+eTbUiPXjPOpCSMn36dN6TwxZ/mbQAcKvRFqA7IyWw2LhkPuJ48NqI9sla9SloCUDEX6YrAGSaqe3XFy9epMTERN6TA+kgyDGtMNPxhTIqzsrJXlsmJSUtN27cUL24h7sDdhFAwYIFVX3/SHzauHEj78mDfRJpgc1XleUj5uMZU569psgerQdc2LhPnB7sHHbRgoBW3o+s/zw9cAEgiB2edRjlH6lvvstSIOQJRbwTxFILkbZoD7TiG0haFsFmAYj4O0SAa6Nfv3507tw58jvXjtyC1LPwZMBzDTjfnj33d999J+1GSQ/+dq3sB61sifQI5QWhjg7yX5C/n57onCHs+r+9gXWJDLPFixczjevlTGPx52wD49n5BRUTKq9oLqoRkCvr3u0G76XiV34+u5OQLVs2PqKN0EchV65crMyXGsiYNgO4QJB1B20LlzVWeEwkjxHqJn9acMtmqds49juHDh0iX19fUyYfn9s5c+bwnhJsPyKTD4TXopbhFNv9VqY5MDDYcJDD1JcthgSNa+zYsfRgnL4LHKsUdxXwO2aC8OWIfR14TwkueosiLABcePhwhnoa94QJE3grI/CvYPXs+iKOvK72Y9uVkaAMLmjgIp3IXYIU4gLeULNmzVhKpVmsWLGCt5SgJkaTJk14Tx9hAcC3rZVBtqXDBVb5UA38Xnh4OP1w+a2nMbrOVuYRFYk+wceC5K/Hk4xrLMh469Spk12uOamhVbQD26YRDN2QwfUcBKCvD8soN6SpowKKVmEjfOqrVq1KFwa+rR8ETQfuiMxAOYCfW9rm8mj9n8q0adPbSi32JDAwkGoOe4f33vJD5X+xG5c4M0URXgEApR2HDBnCe0rOfP+EVUPUAoJJu1XNrrQuUx8MDl9bJx9s8v6NFWiyN0FBQTTPO/VyX/9yEWxbMjL5wNAKAFBJ4WS6NCjjPp5z8B32x+ISmxoo0ooz4drQ1FDdwAsd2M3D9BnKuC88udSPvGcbIqtNBtTDg0WNO2w4I2ViyoYFAKDN4EBVo3qEG8XGxmqWHsNkjyu2lPfegsvSlSpVYnmWKWWFcY317ihjnyYt4HXF9uiMSAkA4ICL8TzCe0o6bavLygGoBaVxxRT3w17MMH6xT5Z8wx9qRq2sxtAZkBZUmoVvRQ0IJjQ0lPeUwPvYrVs33nMM9nKXmIH0CgDw50NTQWKrGtOT/VnZx/SgyGrdunXpymC5RCgpfJ0zJVJ6BQAUNVWb4BRQdEPt8EOt/z179lDtKPt4JP+XsWkFAOj3KDUDS1eL4fFfswsQ6c8E/O6iRYuYw+3MmTNCrgZpnHQF2CwAgMQk+HpO9NUubtp1T0PmuBN2jM2Vy77WRFAAmA5occnJyewus9ll7W3aglJA+gWiY2XCtJ/uxyYH6OOPPzZUk8HRHDlyhLmwGx7tyqrB4Oqq2eqrXQQAUC8Ckaay05TmeVrgUEP6B+6IOVOWND7to0aNYp/4Yz73+SjRzeDsrOq7mdhNAAB+ItRJqLlAOyHp+bQiFFIgmn25jqx72p6g6B6C56MLL1K1TVBSB3eazcKuAgCInCHbQC/98HS/x8yaZrflTXQbq4F9HuFUuI073vT/20GoRuHRSaZ+6Y/dBQBwJmA7Coj7QjcFEaUKUAYBKwLfKWOmxYp7uyhDiU98m7jvaU/Xa/wRbbBdika3ZLCLFpQZyBro2bMnJY4WK0sPvxBCequa25b4lZ52m2syt3TydLGaz8jOQMgR1RLNxHQBANSE8Pf3p5XNDvER58ZrfVVW/02mEJVRTNmC0oMb9SjhsqPKIqoy17wvaLCVUpPf0JK8Y5ly4IjJBw4RQAqoq4AUkzlvAtgf6ywgRzQsyY8F8h2dte2QLUgN6N7I+0GNtcy0EDNBkgF8WdD1rfp6Q8sEkAJeHrYDhIFtylR/0F/kDkxkV5Ew6XCfiFykMxPLBZAWlPmCTYB0P/xEZV6ZiolpgRqMRFk4DKFdIV3F9WWegkBvT/kqW+R1om7FnTt3WIAFDkBYqIgzw8GHECiy6RBzRhkF+HHg14Hrw9b8fzNxagH8P+BQLchFRlwCsBiXACzGJQCLcQnAYlwCsBiXACyF6L8tfwhz8ofykgAAAABJRU5ErkJggg=="><link href=https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css rel=stylesheet><link rel=stylesheet href="https://font.sec.miui.com/font/css?family=MiSans:400,700:MiSans"><style>:root{--color:#fff;--fontcolor:#333;--inputcolor:#f5f5f5;--inputcolor-font:#333}@media (prefers-color-scheme:dark){:root{--color:#53535338;--fontcolor:#b8b8b8;--inputcolor:#012333;--inputcolor-font:#969696d8}}body{background-color:var(--color);background-position:center;background-repeat:no-repeat;background-size:cover;background-attachment:fixed;color:var(--fontcolor);font-family:Misans,Arial,sans-serif;padding:30px;display:flex;justify-content:center;align-items:center;height:100vh;min-height:100vh;margin:0;position:relative}::-webkit-scrollbar{height:10px;margin-top:0}::-webkit-scrollbar-track{background-color:#000}::-webkit-scrollbar-thumb{background:#ff8018;border-radius:10px}.container{max-width:80%;text-align:center;min-height:65%;line-height:1.25}h1{color:var(--fontcolor);font-weight:700;margin-bottom:20%}.rounded-button{border-radius:6px;transition:background-color .3s,transform .2s;padding:10px 30px;background-color:#555c5c;color:#fff;border:none;margin-bottom:3%}.rounded-button:hover{background-color:#ff8018ee;transform:scale(1.05)}.tips>p:first-child::before{position:sticky;color:#7b7b7b;margin-bottom:1%;font-size:60%}footer{position:fixed;bottom:20px;left:0;right:0;text-align:center;padding:10px;line-height:1.25;margin-top:20px}pre{background:#012333;color:#ff8028;padding:15px 20px 15px 20px;margin:0 0;border-radius:.5rem;overflow-x:auto;position:relative}pre#formattedLinkOutput{color:#60ff4bc9}pre::before{content:" ";display:block;position:absolute;top:6px;left:6px;width:10px;height:10px;background:#c24b44;border-radius:50%;box-shadow:20px 0 0 #b8fa63,40px 0 0 #ff8006}code{font-family:Consolas,"Liberation Mono",Menlo,Courier,monospace;font-size:.9em;margin-bottom:0}@media (max-width:768px){.container{max-width:100%;font-size:.8rem}}@media (min-width:768px){.container{max-width:65%;font-size:1rem}h1{margin-bottom:10%}}.form-group{margin-bottom:3%}.form-control{background-color:var(--inputcolor);color:var(--inputcolor-font)}.form-control:focus{background-color:var(--inputcolor);color:var(--inputcolor-font);border-color:#96fa9ec9;box-shadow:0 0 0 .2rem rgba(21,255,0,.25)}.tips-content{margin-bottom:0;margin-top:20px;font-size:clamp(0.8rem,2vw,1.1rem)}.status-container{display:flex;justify-content:center;align-items:center;margin-bottom:1px;margin-top:-2%;font-size:clamp(0.8rem,2vw,1.05rem)}.code{position:relative;padding-right:0}.copy-button{position:absolute;top:10px;right:10px;background:#ff8018;color:#fff;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;transition:opacity .3s;z-index:1;font-size:.85rem;display:none}.redir-button{position:absolute;top:10px;right:65px;background:#ff8018;color:#fff;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;transition:opacity .3s;z-index:1;font-size:.85rem;display:none}pre:hover .copy-button{opacity:1}#visitor-info{margin-top:10px;text-align:center;line-height:0}#toast{position:fixed;top:10%;left:50%;transform:translate(-50%,-50%);background-color:#ff8018de;color:#fff;padding:15px 20px;border-radius:10px;font-size:90%;z-index:1000}.docker-button{width:200px;height:50px;border-radius:10px;background-color:#f6f6f6;border:2px solid #ececec;color:#333;font-size:16px;cursor:pointer;transition:all .3s ease;margin-top:20px}.docker-button:hover{background-color:#f91dd;color:#fff;transform:scale(1.05)}.close-button{position:absolute;right:20px;top:15px;font-size:24px;cursor:pointer;color:#666}.github-link{display:inline-block;position:static;color:var(--fontcolor);opacity:.7;transition:opacity .3s ease}.github-link:hover{opacity:1;color:#ff9b17}.github-link svg{width:20px;height:20px}</style><body><div class=container><h1>Cloudflare文件加速</h1><div class=form-group><input class=form-control id=githubLinkInput placeholder=输入需要加速的链接></div><button class="btn rounded-button" id=formatButton>获取加速链接</button><div class=code id=outputBlock><button class=copy-button id=copyButton>复制</button> <button class=redir-button id=redirButton>打开</button><pre id=formattedLinkOutput></pre></div><div class=tips><div class=tips-content><p>支持release、archive文件，支持git clone、wget、curl等等操作<br>支持Hugging Face</p><br></div></div></div><div id=toast style=display:none>链接已复制到剪贴板</div><footer><a href=https://github.com/Stareven233/cf-proxy target=_blank class=github-link><svg height=32 viewbox="0 0 16 16" width=32><path fill=currentColor d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a></footer><script>function formatGithubLink() {
      const githubLinkInput = document.getElementById('githubLinkInput');
      const link = githubLinkInput.value.trim();
      const prefix = window.location.href.replace(new RegExp('/+$'), '');
      let formattedLink = "";

      if(link.startsWith("https://") || link.startsWith("http://")) {
        formattedLink = prefix + "/" + link;
      } else if(
        link.startsWith("github.com/") ||
        link.startsWith("raw.githubusercontent.com/") ||
        link.startsWith("gist.githubusercontent.com/") ||
        link.startsWith("huggingface.co/") ||
        link.startsWith("cdn-lfs.hf.co/") ||
        link.startsWith("download.docker.com/")
      ) {
        formattedLink = prefix + "/https://" + link;
      } else {
        showToast('请输入有效的链接');
        return;
      }

      const formattedLinkOutput = document.getElementById('formattedLinkOutput');
      formattedLinkOutput.textContent = formattedLink;
      displayButton();
    }


    function displayButton() {
      const copyButton = document.getElementById('copyButton');
      const redirButton = document.getElementById('redirButton');
      copyButton.style.display = 'block';
      redirButton.style.display = 'block';
    }

    function redirToFormattedLink() {
      const formattedLinkOutput = document.getElementById('formattedLinkOutput');
      console.log(formattedLinkOutput.textContent);
      window.open(formattedLinkOutput.textContent);
    }

    document.getElementById('formatButton').addEventListener('click', formatGithubLink);
    document.getElementById('copyButton').addEventListener('click', function () {
      const output = document.getElementById('formattedLinkOutput');
      const range = document.createRange();
      range.selectNode(output);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      showToast('链接已复制到剪贴板');
    });
    document.getElementById('redirButton').addEventListener('click', redirToFormattedLink);

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.style.display = 'block';

      setTimeout(() => {
        toast.style.display = 'none';
      }, 2000);
    }</script>
`
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

interface Env {
  MAX_FILE_SIZE: number;
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

async function proxy(request: Request, url: string, sizeLimit: number): Promise<Response> {
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

function new_response(body?:BodyInit|null, status?:number, headers?: HeadersInit, cf?: any, webSocket?: WebSocket | null, encodeBody?: "automatic" | "manual") {
	return new Response(body, {
		status: status || 200,
		headers,
		cf,
		webSocket,
		encodeBody
	})
}

export default {
	async fetch(request: Request, env: Env, ctx): Promise<Response> {
		let rawPath = new URL(request.url).pathname.slice(1)
		// if (rawPath === '') {
		// 	return new Response('External Server Error', { status: 500 })
		// }
		// else if (!rawPath.startsWith('proxy')) {
		// 	return new Response('Invalid input', { status: 403 })
		// } else {
		// 	rawPath = rawPath.replace(/^proxy\/?/, '')
		// }
		if (rawPath === '') {
			// const response = await fetch(index_url)
			// const html = await response.text()
			return new_response(index_html, 200, { 'Content-Type': 'text/html' })
		} else if (!rawPath.startsWith('http')) {
			return new_response('Invalid input', 403)
		}

		const matches = checkURL(rawPath)
		if (matches) {
			if (config.whiteList.length > 0 && !checkList(matches[0], config.whiteList)) {
				return new_response('Not in whitelist, access restricted.', 403)
			}
			if (config.blackList.length > 0 && checkList(matches[0], config.blackList)) {
				return new_response('Access restricted by blacklist.', 403)
			}
		} else {
			return new_response('Invalid input', 403)
		}

		if (exps[1].test(rawPath)) {
			rawPath = rawPath.replace('/blob/', '/raw/')
		}

		return proxy(request, rawPath, env.MAX_FILE_SIZE)
	}
} satisfies ExportedHandler<Env>

// loadConfig()
// setInterval(loadConfig, 10 * 60 * 1000)
