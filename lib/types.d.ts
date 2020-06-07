import JSZip from "jszip";
export declare type ComposerOptions = {
    jszipBinary: JSZip.OutputType;
    jszipGenerateType: JSZip.OutputType;
};
export declare type OutputJSON = {
    [key: string]: any;
};
export declare type OutputOptions = ComposerOptions & {
    output?: string;
};
