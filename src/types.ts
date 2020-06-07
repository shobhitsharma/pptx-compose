import JSZip from "jszip";

export type ComposerOptions = {
  jszipBinary: JSZip.OutputType;
  jszipGenerateType: JSZip.OutputType;
};

export type OutputJSON = {
  [key: string]: any;
};

export type OutputOptions = ComposerOptions & {
  output?: string;
};
