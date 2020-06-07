/**
 * @module pptx-compose
 * @fileoverview Composes Open Office XML pptx buffer to JSON and ecoding XML
 *
 * @author Shobhit Sharma <hi@shobh.it>
 */

import path from "path";
import JSZip from "jszip";
import { promises as fs, existsSync, mkdirSync } from "fs";
import { jszip2json, json2jszip } from "./parser";

import type { ComposerOptions, OutputJSON, OutputOptions } from "./types";

export interface IComposer {
  /**
   * Converts PPTX file input to JSON output
   */
  toJSON: (file: string, options?: OutputOptions) => {};

  /**
   * Converts JSON input to PPTX output
   */
  toPPTX: (json: Object, options?: OutputOptions) => {};
}

class Composer implements IComposer {
  private options: ComposerOptions = {
    jszipBinary: "nodebuffer",
    jszipGenerateType: "nodebuffer",
  };

  constructor(options?: ComposerOptions) {
    if (options) {
      this.options = options;
    }
  }

  /**
   * @method toJSON
   *
   * Parse PowerPoint file to JSON.
   *
   * @param {string} file Give a path of PowerPoint file.
   * @param {OutputOptions} options
   * @returns {Promise<OutputJSON>} json
   */
  public async toJSON(file: string, options?: OutputOptions) {
    options = Object.assign({}, this.options, options);

    const fileBuffer = await fs.readFile(path.resolve(__dirname, file));
    const zip = await JSZip().loadAsync(fileBuffer);
    const jsonOutput = await jszip2json(zip, options);

    if (options.output) {
      return await fs.writeFile(options.output, JSON.stringify(jsonOutput, null, 2));
    }

    return jsonOutput;
  }

  /**
   * @method toPPTX
   *
   * Convert JSON to PPTX.
   *
   * @param {OutputJSON} json created from PowerPoint XMLs
   * @param {OutputOptions} options
   * @returns {Promise<Buffer|File>}
   */
  public async toPPTX(json: OutputJSON, options?: OutputOptions) {
    options = Object.assign({}, this.options, options);

    const zip = await json2jszip(json, options);
    const contentBuffer = await zip.generateAsync({
      type: this.options.jszipGenerateType || "nodebuffer",
    });

    if (options.output) {
      return await fs.writeFile(options.output, contentBuffer as string);
    }

    return contentBuffer;
  }
}

export default Composer;
