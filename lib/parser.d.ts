import JSZip from "jszip";
import type { OutputJSON, OutputOptions } from "./types";
export declare const jszip2json: (jszip: JSZip, options?: OutputOptions | undefined) => Promise<OutputJSON>;
export declare const json2jszip: (json: OutputJSON, options?: OutputOptions | undefined) => Promise<JSZip>;
