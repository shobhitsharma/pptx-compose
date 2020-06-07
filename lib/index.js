"use strict";
/**
 * @module pptx-compose
 * @fileoverview Composes Open Office XML pptx buffer to JSON and ecoding XML
 *
 * @author Shobhit Sharma <hi@shobh.it>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const jszip_1 = __importDefault(require("jszip"));
const fs_1 = require("fs");
const parser_1 = require("./parser");
class Composer {
    constructor(options) {
        this.options = {
            jszipBinary: "nodebuffer",
            jszipGenerateType: "nodebuffer",
        };
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
    toJSON(file, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({}, this.options, options);
            const fileBuffer = yield fs_1.promises.readFile(path_1.default.resolve(__dirname, file));
            const zip = yield jszip_1.default().loadAsync(fileBuffer);
            const jsonOutput = yield parser_1.jszip2json(zip, options);
            if (options.output) {
                return yield fs_1.promises.writeFile(options.output, JSON.stringify(jsonOutput, null, 2));
            }
            return jsonOutput;
        });
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
    toPPTX(json, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({}, this.options, options);
            const zip = yield parser_1.json2jszip(json, options);
            const contentBuffer = yield zip.generateAsync({
                type: this.options.jszipGenerateType || "nodebuffer",
            });
            if (options.output) {
                return yield fs_1.promises.writeFile(options.output, contentBuffer);
            }
            return contentBuffer;
        });
    }
}
exports.default = Composer;
//# sourceMappingURL=index.js.map