import { jszip2json, json2jszip } from "../parser";

describe("PPTX Compose Parser", () => {
  test("should give valid json, json2jszip returns valid zip.", async () => {
    const json = {
      "apple.xml": {
        fruits: {
          fruit: [
            {
              name: "apple",
              color: "red",
            },
          ],
        },
      },
    };
    const jszip = await json2jszip(json);
    const files = Object.keys(jszip.files);

    expect(files.length).toBe(1);
    expect(jszip.file("apple.xml").dir).toBe(false);
  });
});
