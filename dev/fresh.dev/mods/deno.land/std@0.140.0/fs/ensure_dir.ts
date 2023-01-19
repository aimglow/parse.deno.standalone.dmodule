HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 903411
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Mon, 09 Jan 2023 09:02:01 GMT
ETag: "0b49825de91174189a129b821e585165"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: IPuHa6sysh_3RrqYydmmWPQf2ofMrTqaLiGMzugajwEzDlakuMQ9Ow==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: 3e5QYmMYofqhF6Oyyo1rLEes8xX.6Ynh
Content-Length: 1425
Content-Type: application/typescript; charset=utf-8
Last-Modified: Wed, 18 May 2022 13:28:50 GMT

// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { getFileInfoType } from "./_util.ts";

/**
 * Ensures that the directory exists.
 * If the directory structure does not exist, it is created. Like mkdir -p.
 * Requires the `--allow-read` and `--allow-write` flag.
 */
export async function ensureDir(dir: string) {
  try {
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      // if dir not exists. then create it.
      await Deno.mkdir(dir, { recursive: true });
      return;
    }
    throw err;
  }
}

/**
 * Ensures that the directory exists.
 * If the directory structure does not exist, it is created. Like mkdir -p.
 * Requires the `--allow-read` and `--allow-write` flag.
 */
export function ensureDirSync(dir: string): void {
  try {
    const fileInfo = Deno.lstatSync(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      // if dir not exists. then create it.
      Deno.mkdirSync(dir, { recursive: true });
      return;
    }
    throw err;
  }
}

