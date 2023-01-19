HTTP/1.1 200 OK
Date: Thu, 19 Jan 2023 19:58:56 GMT
Transfer-Encoding: chunked
Connection: keep-alive
CF-Ray: 78c225e60c32af88-NRT
Access-Control-Allow-Origin: *
Age: 351
Cache-Control: public, max-age=31536000, immutable
Vary: Origin
CF-Cache-Status: HIT
X-Content-Source: workers-kv
Report-To: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=rxrPgLaSImX%2FqLghg5cgamritosHeDHgw%2FRGfEJ42j0x6UMNDLZjxAOzudtKsz7d7o6hRbCTSnwKcwtJ%2FygvxKhnUd%2FffDwhVljIp62uuwX8t86mPccCwm0FNWVdi4RY0pOKyB8%3D"}],"group":"cf-nel","max_age":604800}
NEL: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
Server: cloudflare
Alt-Svc: h3=":443"
Alt-Svc: h3-29=":443"
Content-Type: text/javascript; charset=utf-8
Last-Modified: Thu, 19 Jan 2023 19:53:05 GMT

/* esm.sh - esbuild bundle(twind@0.16.17/sheets) esnext production */
var i="__twind",d=t=>{let e=self[i];return e||(e=document.head.appendChild(document.createElement("style")),e.id=i,t&&(e.nonce=t),e.appendChild(document.createTextNode(""))),e},a=({nonce:t,target:e=d(t)}={})=>{let n=e.childNodes.length;return{target:e,insert:(r,o)=>e.insertBefore(document.createTextNode(r),e.childNodes[n+o])}},l=()=>{let t=[],e=[],n=(r,o)=>e[o]=r(e[o]);return{init:r=>n(r,t.push(r)-1),reset:(r=[])=>([r,e]=[e,r],t.forEach(n),r)}},g=()=>{let t=l(),e;return t.init((n=[])=>e=n),Object.defineProperties({get target(){return[...e]},insert:(n,r)=>e.splice(r,0,n)},Object.getOwnPropertyDescriptors(t))},s=t=>({id:i,textContent:(Array.isArray(t)?t:t.target).join("")}),u=(t,e)=>{let{id:n,textContent:r}=s(t);return e={...e,id:n},`<style${Object.keys(e).reduce((o,c)=>`${o} ${c}=${JSON.stringify(e[c])}`,"")}>${r}</style>`};export{a as domSheet,u as getStyleTag,s as getStyleTagProperties,g as virtualSheet};

