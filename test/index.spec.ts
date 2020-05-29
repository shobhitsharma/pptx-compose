import path from "path";
import assert from "assert";
import buffer from "buffer";
import Composer from "../src/index";

const compose = new Composer();
const sample_pptx = path.join(__dirname, "./fixtures/sample.pptx");

jest.useFakeTimers();

describe("Composer Library", () => {
  it(".parse() should a PPTX file", () => {
    const done = jest.fn();
    compose.parse(sample_pptx, done);
  });

  it(".execute() should multiple PPTX files", () => {
    const done = jest.fn();
    compose.execute([sample_pptx], done);
  });

  it(".bufferize() should a PPTX file", () => {
    const done = jest.fn();
    compose.parse(sample_pptx, (err: Error, content: any) => {
      if (err) {
        return done(err);
      }
      compose.bufferize(content, {}, (err: Error, response: Buffer) => {
        if (err) {
          return done(err);
        }
        return new Promise((resolve) => {
          assert.ok(buffer.Buffer.isBuffer(response), "`response` is not typeof Buffer");
          resolve();
        }).then(done);
      });
    });
  });

  it(".toJSON() should convert PPTX file to JSON", () => {
    const done = jest.fn();
    compose.toJSON(sample_pptx, {}, done);
  });
});
