export interface Delimiter {
    line?: string;
    open?: string;
    close?: string;
}
export declare const escape: (delimiter: string) => string;
