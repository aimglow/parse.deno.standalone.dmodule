HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 37931
X-Cache: Hit from cloudfront
Cache-Control: public, max-age=31536000, immutable
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Date: Thu, 19 Jan 2023 09:26:36 GMT
ETag: "480093ffd3df585b6998a9f3cbf11a2f"
Server: deno/gcp-asia-northeast1
Vary: Accept-Encoding
Vary: Origin
Via: http/1.1 edgeproxy-h
x-amz-cf-id: XC6EXcrFVMNRRovmyYwlNmWWisceHlPkF70hEgfbgGrKxy9TKQnB-Q==
x-amz-cf-pop: NRT57-C1
x-amz-replication-status: COMPLETED
x-amz-version-id: aYjgr2j10HMf7gJOdhAOAYgyPA1WUQaZ
Content-Length: 1562
Content-Type: application/typescript; charset=utf-8
Last-Modified: Tue, 11 Oct 2022 11:20:49 GMT

import { virtualSheet } from "twind/sheets";
import { Plugin } from "../server.ts";

import { Options, setup, STYLE_ELEMENT_ID } from "./twind/shared.ts";
export type { Options };

export default function twind(options: Options): Plugin {
  const sheet = virtualSheet();
  setup(options, sheet);
  const main = `data:application/javascript,import hydrate from "${
    new URL("./twind/main.ts", import.meta.url).href
  }";
import options from "${options.selfURL}";
export default function(state) { hydrate(options, state); }`;
  return {
    name: "twind",
    entrypoints: { "main": main },
    render(ctx) {
      sheet.reset(undefined);
      const res = ctx.render();
      const cssTexts = [...sheet.target];
      const snapshot = sheet.reset();
      const scripts = [];
      let cssText: string;
      if (res.requiresHydration) {
        const precedences = snapshot[1] as number[];
        cssText = cssTexts.map((cssText, i) =>
          `${cssText}/*${precedences[i].toString(36)}*/`
        ).join("\n");
        const mappings: (string | [string, string])[] = [];
        for (
          const [key, value] of (snapshot[3] as Map<string, string>).entries()
        ) {
          if (key === value) {
            mappings.push(key);
          } else {
            mappings.push([key, value]);
          }
        }
        scripts.push({ entrypoint: "main", state: mappings });
      } else {
        cssText = cssTexts.join("\n");
      }
      return {
        scripts,
        styles: [{ cssText, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}

