HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 2164684
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Sun, 25 Dec 2022 18:40:48 GMT
ETag: "10968aa75569cdcb5dda4ba9779697cb"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: CdVZF0TMnToVDgsJHKKYuRZXBBUPPl6ybw2ujb5G0jwfkadAt8jjaQ==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: 1qtpjqu0kYE6ez_DRRjXgM8EhDgPui4f
Content-Length: 2787
Content-Type: application/typescript; charset=utf-8
Last-Modified: Sat, 30 Jul 2022 14:25:26 GMT

import {
  esbuild,
  ImportMap,
  resolveImportMap,
  resolveModuleSpecifier,
  toFileUrl,
} from "./deps.ts";
import { load as nativeLoad } from "./src/native_loader.ts";
import { load as portableLoad } from "./src/portable_loader.ts";
import { ModuleEntry } from "./src/deno.ts";

export interface DenoPluginOptions {
  /**
   * Specify the URL to an import map to use when resolving import specifiers.
   * The URL must be fetchable with `fetch`.
   */
  importMapURL?: URL;
  /**
   * Specify which loader to use. By default this will use the `native` loader,
   * unless `Deno.run` is not available.
   *
   * - `native`:     Shells out to the Deno execuatble under the hood to load
   *                 files. Requires --allow-read and --allow-run.
   * - `portable`:   Do module downloading and caching with only Web APIs.
   *                 Requires --allow-net.
   */
  loader?: "native" | "portable";
}

/** The default loader to use. */
export const DEFAULT_LOADER: "native" | "portable" =
  typeof Deno.run === "function" ? "native" : "portable";

export function denoPlugin(options: DenoPluginOptions = {}): esbuild.Plugin {
  const loader = options.loader ?? DEFAULT_LOADER;
  return {
    name: "deno",
    setup(build) {
      const infoCache = new Map<string, ModuleEntry>();
      let importMap: ImportMap | null = null;

      build.onStart(async function onStart() {
        if (options.importMapURL !== undefined) {
          const resp = await fetch(options.importMapURL.href);
          const txt = await resp.text();
          importMap = resolveImportMap(JSON.parse(txt), options.importMapURL);
        } else {
          importMap = null;
        }
      });

      build.onResolve({ filter: /.*/ }, function onResolve(
        args: esbuild.OnResolveArgs,
      ): esbuild.OnResolveResult | null | undefined {
        const resolveDir = args.resolveDir
          ? `${toFileUrl(args.resolveDir).href}/`
          : "";
        const referrer = args.importer || resolveDir;
        let resolved: URL;
        if (importMap !== null) {
          const res = resolveModuleSpecifier(
            args.path,
            importMap,
            new URL(referrer) || undefined,
          );
          resolved = new URL(res);
        } else {
          resolved = new URL(args.path, referrer);
        }
        return { path: resolved.href, namespace: "deno" };
      });

      build.onLoad({ filter: /.*/ }, function onLoad(
        args: esbuild.OnLoadArgs,
      ): Promise<esbuild.OnLoadResult | null> {
        const url = new URL(args.path);
        switch (loader) {
          case "native":
            return nativeLoad(infoCache, url, options);
          case "portable":
            return portableLoad(url, options);
        }
      });
    },
  };
}

