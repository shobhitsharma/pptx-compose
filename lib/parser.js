"use strict";
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
exports.json2jszip = exports.jszip2json = void 0;
const path_1 = __importDefault(require("path"));
const xml2js_1 = __importDefault(require("xml2js"));
const jszip_1 = __importDefault(require("jszip"));
exports.jszip2json = (jszip, options) => __awaiter(void 0, void 0, void 0, function* () {
    const json = {};
    const jszipBinaryType = (options || {}).jszipBinary || "nodebuffer";
    yield Promise.all(Object.keys(jszip.files).map((relativePath) => __awaiter(void 0, void 0, void 0, function* () {
        const file = jszip.file(relativePath);
        const ext = path_1.default.extname(relativePath);
        let content;
        if (!file || file.dir) {
            return;
        }
        else if (ext === ".xml" || ext === ".rels") {
            const xml = yield file.async("binarystring");
            content = yield xml2js_1.default.parseStringPromise(xml);
        }
        else {
            // Handles media assets (image, audio, video, etc.)
            content = yield file.async(jszipBinaryType);
        }
        json[relativePath] = content;
    })));
    return json;
});
exports.json2jszip = (json, options) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_1.default();
    Object.keys(json).forEach((relativePath) => {
        const ext = path_1.default.extname(relativePath);
        if (ext === ".xml" || ext === ".rels") {
            const builder = new xml2js_1.default.Builder({
                renderOpts: {
                    pretty: false,
                },
            });
            const xml = builder.buildObject(json[relativePath]);
            zip.file(relativePath, xml);
        }
        else {
            zip.file(relativePath, json[relativePath]);
        }
    });
    return zip;
});
//# sourceMappingURL=parser.js.map