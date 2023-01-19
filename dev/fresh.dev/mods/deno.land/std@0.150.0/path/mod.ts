HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 551114
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Fri, 13 Jan 2023 10:53:36 GMT
ETag: "ce6cf45cd21add08a1c5981759220928"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: k_Is_PnSVLobwDskJrzUrPjbvS_TQN_M1gg_-ySl1VJ30n9t865r1Q==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: 2htbMULj7NG64uZcjUAfepkZDGYu_Aso
Content-Length: 877
Content-Type: application/typescript; charset=utf-8
Last-Modified: Thu, 28 Jul 2022 16:20:44 GMT

// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/

/**
 * Utilities for working with OS-specific file paths.
 *
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

