import { MultiReader } from "../io/readers.ts";
import { PartialReadError } from "../io/bufio.ts";
import { assert } from "../_util/assert.ts";
import { Buffer } from "../io/buffer.ts";
import { readAll } from "../io/util.ts";
import { Deferred, deferred } from "./deferred.ts";
import {
  crypto as wasmCrypto,
  DigestAlgorithm as WasmDigestAlgorithm,
  digestAlgorithms as wasmDigestAlgorithms,
} from "../_wasm_crypto/mod.ts";
import type { ReadableState } from "./readable.ts";
import { addChunk, maybeReadMore, onEofChunk } from "./readable_internal.ts";
import type Writable from "./writable.ts";
import type { WritableState } from "./writable.ts";
import {
  afterWrite,
  AfterWriteTick,
  afterWriteTick,
  clearBuffer,
  errorBuffer,
  kOnFinished,
  needFinish,
  prefinish,
} from "./writable_internal.ts";
import { Buffer } from "../buffer.ts";
import type Duplex from "./duplex.ts";
import {
  ERR_MULTIPLE_CALLBACK,
  ERR_STREAM_PUSH_AFTER_EOF,
  ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
} from "../_errors.ts";
import * from "./duplex.ts";




