HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 2007013
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Tue, 27 Dec 2022 14:28:40 GMT
ETag: "c7e67cf4f74600bb722cb49a908f6269"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: cp0-H2gnVX8y_YUBXkah7Op2oOwmvYgpMZR3cgSUAI52u8XepAPLwQ==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: eHOtirwCUVYJxzfnnz_t26SbMRDft3wT
Content-Length: 820
Content-Type: application/typescript; charset=utf-8
Last-Modified: Wed, 18 May 2022 13:28:52 GMT

// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.

/**
 * Ported mostly from https://github.com/browserify/path-browserify/
 * This module is browser compatible.
 * @module
 */

import { isWindows } from "../_util/os.ts";
import * as _win32 from "./win32.ts";
import * as _posix from "./posix.ts";

const path = isWindows ? _win32 : _posix;

export const win32 = _win32;
export const posix = _posix;
export const {
  basename,
  delimiter,
  dirname,
  extname,
  format,
  fromFileUrl,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  sep,
  toFileUrl,
  toNamespacedPath,
} = path;

export * from "./common.ts";
export { SEP, SEP_PATTERN } from "./separator.ts";
export * from "./_interface.ts";
export * from "./glob.ts";

