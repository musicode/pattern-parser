export declare const PATTERN_EMAIL: RegExp;
export declare const PATTERN_URL: RegExp;
export declare const PATTERN_TEL: RegExp;
export declare function isEmail(str: string): boolean;
export declare function isUrl(str: string): boolean;
export declare function isTel(str: string): boolean;
declare class Token {
    text: string;
    link: string;
    type: string;
    constructor(text: string, link?: string, type?: string);
}
export declare function parse(str: string, pattern: RegExp, title?: string): Array<Token>;
export declare function parseAll(text: string): Array<Token>;
export {};
