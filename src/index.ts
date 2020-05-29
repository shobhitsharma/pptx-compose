/**
 * @module pptx-compose
 * @fileoverview Composes Open Office XML pptx buffer to JSON and ecoding XML
 *
 * @author Shobhit Sharma <hi@shobh.it>
 */

import fs from "fs";
import os from "os";
import path from "path";
import async from "async";
import JSZip from "jszip";
import xml2js from "xml2js";
import {uuid} from "./utils";

type Options = {};

class Composer {
  private options: Options;

  constructor(options?: Options) {
    this.options = options || {};
  }

  /**
   * @method execute
   *
   * @param {Array} files
   * @param {Function} callback
   */
  public execute(files: string[], callback: Function) {
    async.map(files, this.parse, (err, results: any) => {
      if (err) {
        return callback(err);
      }
      this.bufferize(results, {}, callback);
    });
  }

  /**
   * @method parse
   *
   * @param {string} file
   * @param {Function} callback
   */
  public parse(file: string, callback: Function) {
    fs.readFile(file, (err, data) => {
      if (err) {
        return callback(err);
      }

      const content: {[key: string]: any} = {};

      JSZip()
        .loadAsync(data)
        .then((zip) => {
          const zipper = (key: string, cb: async.ErrorCallback<Error>) => {
            const ext = key.substr(key.lastIndexOf("."));
            if (ext === ".xml" || ext === ".rels") {
              zip
                .file(key)
                .async("binarystring")
                .then((xml) => {
                  xml2js.parseString(xml, (err: Error, json) => {
                    if (err) {
                      return cb(err);
                    }
                    content[key] = json;
                    cb(null);
                  });
                });
            } else {
              content[key] = zip.file(key).async("binarystring");
              cb(null);
            }
          };

          async.each(Object.keys(zip.files), zipper, (err) => {
            if (err) {
              return callback(err);
            }
            callback(null, content);
          });
        });
    });
  }

  /**
   * @method bufferize
   *
   * Converts parsed data into buffer or file
   *
   * @param {Array} xmls
   * @param {Function} callback
   */
  public bufferize(contents: {[key: string]: any}, options: {file?: boolean}, callback: Function) {
    const zip = new JSZip();
    const output = path.join(os.tmpdir(), uuid() + ".pptx");

    Object.keys(contents).forEach(() => {
      for (let key in contents) {
        if (contents.hasOwnProperty(key)) {
          const ext = key.substr(key.lastIndexOf("."));
          if (ext === ".xml" || ext === ".rels") {
            const builder = new xml2js.Builder({
              renderOpts: {
                pretty: false,
              },
            });
            const xml2 = builder.buildObject(contents[key]);
            zip.file(key, xml2);
          } else {
            zip.file(key, contents[key]);
          }
        }
      }
    });

    zip
      .generateAsync({
        type: "nodebuffer",
      })
      .then((content) => {
        if (options.file) {
          return fs.writeFile(output, content, (err) => {
            if (err) {
              return callback(err);
            }
            callback(null, output);
          });
        }
        callback(null, content);
      });
  }

  /**
   * @method toJSON
   *
   * Converts pptx contents to JSON
   *
   * @param {Array} file
   * @param {options} options
   * @param {Function} callback
   */
  public toJSON(file: string, options: {output?: string}, callback: Function) {
    const output_dir = path.join(__dirname, "output");
    const output = options.output || path.join(output_dir, uuid() + ".json");

    if (!fs.existsSync(output_dir)) {
      fs.mkdirSync(output_dir);
    }

    this.parse(file, (err: Error, json: Object) => {
      if (err) {
        return callback(err);
      }
      fs.writeFile(
        output,
        JSON.stringify(json, null, 2),
        {
          encoding: "utf8",
          flag: "wx",
        },
        (err) => {
          if (err) {
            return callback(err);
          }
          callback(null, output);
        }
      );
    });
  }
}

export default Composer;
