HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 588958
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Fri, 13 Jan 2023 00:22:58 GMT
ETag: "c63f54032d828d73a2ca054bae0f0b92"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: GAV5HNWD0JQGc7DgUT3p855P78IXrf6uE8qMG-msORoZedjYFMDhwA==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: 8nrERqlWozCeXwWcmKMx.taYdOnuFMXW
Content-Length: 206
Content-Type: application/typescript; charset=utf-8
Last-Modified: Sun, 02 May 2021 11:22:29 GMT

export {
  deflate,
  inflate,
  gzip,
  gunzip,
  zlib,
  unzlib,
} from "./pkg/denoflate.js";

import init from "./pkg/denoflate.js";
import { wasm } from "./pkg/denoflate_bg.wasm.js";

await init(wasm);

