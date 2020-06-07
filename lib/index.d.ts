/**
 * @module pptx-compose
 * @fileoverview Composes Open Office XML pptx buffer to JSON and ecoding XML
 *
 * @author Shobhit Sharma <hi@shobh.it>
 */
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
declare class Composer implements IComposer {
    private options;
    constructor(options?: ComposerOptions);
    /**
     * @method toJSON
     *
     * Parse PowerPoint file to JSON.
     *
     * @param {string} file Give a path of PowerPoint file.
     * @param {OutputOptions} options
     * @returns {Promise<OutputJSON>} json
     */
    toJSON(file: string, options?: OutputOptions): Promise<void | OutputJSON>;
    /**
     * @method toPPTX
     *
     * Convert JSON to PPTX.
     *
     * @param {OutputJSON} json created from PowerPoint XMLs
     * @param {OutputOptions} options
     * @returns {Promise<Buffer|File>}
     */
    toPPTX(json: OutputJSON, options?: OutputOptions): Promise<string | void | number[] | ArrayBuffer | Blob>;
}
export default Composer;
