import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { jszip2json } from "../parser";
import PPTXComposer from "..";

import type { OutputJSON } from "../types";

const samplePPTX = path.join(__dirname, "./fixtures/sample.pptx");
const sampleMedia = path.join(__dirname, "./fixtures/sample.jpg");
const sampleZip = path.join(__dirname, "./fixtures/sample.zip");

describe("PPTX Compose", () => {
  test("should give valid pptx object, toJSON returns valid json.", async () => {
    const composer = new PPTXComposer();
    const json = (await composer.toJSON(samplePPTX)) as OutputJSON;

    expect("ppt/presentation.xml" in json).toBe(true);
  });

  test("should give valid pptx object, call toJSON and then call toPPTX return valid pptx.", async () => {
    const composer = new PPTXComposer();
    const json = (await composer.toJSON(samplePPTX)) as OutputJSON;
    const pptx = await composer.toPPTX(json);

    expect(pptx).toEqual(expect.anything());
  });

  test("should give valid pptx object, call toJSON and add jpeg, then call toPPTX return valid pptx.", async () => {
    const composer = new PPTXComposer();
    const json = (await composer.toJSON(samplePPTX)) as OutputJSON;

    const image = fs.readFileSync(sampleMedia);
    json["ppt/media/image6.jpeg"] = image;

    const pptx = await composer.toPPTX(json);

    expect(pptx).toEqual(expect.anything());
  });

  test("should give valid zip object, jszip2json returns valid json.", async () => {
    const buff = fs.readFileSync(sampleZip);
    const zip = await JSZip().loadAsync(buff);

    const composer = new PPTXComposer();
    const json = await jszip2json(zip);

    expect(Object.keys(json).length).toBe(3);
  });
});
