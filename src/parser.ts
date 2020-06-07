import path from "path";
import xml2js from "xml2js";
import JSZip from "jszip";

import type { OutputJSON, OutputOptions } from "./types";

export const jszip2json = async (jszip: JSZip, options?: OutputOptions) => {
  const json: OutputJSON = {};
  const jszipBinaryType = (options || {}).jszipBinary || "nodebuffer";

  await Promise.all(
    Object.keys(jszip.files).map(async (relativePath) => {
      const file = jszip.file(relativePath);
      const ext = path.extname(relativePath);

      let content;
      if (!file || file.dir) {
        return;
      } else if (ext === ".xml" || ext === ".rels") {
        const xml = await file.async("binarystring");
        content = await xml2js.parseStringPromise(xml);
      } else {
        // Handles media assets (image, audio, video, etc.)
        content = await file.async(jszipBinaryType);
      }

      json[relativePath] = content;
    })
  );

  return json;
};

export const json2jszip = async (json: OutputJSON, options?: OutputOptions) => {
  const zip = new JSZip();

  Object.keys(json).forEach((relativePath) => {
    const ext = path.extname(relativePath);
    if (ext === ".xml" || ext === ".rels") {
      const builder = new xml2js.Builder({
        renderOpts: {
          pretty: false,
        },
      });
      const xml = builder.buildObject(json[relativePath]);
      zip.file(relativePath, xml);
    } else {
      zip.file(relativePath, json[relativePath]);
    }
  });

  return zip;
};
