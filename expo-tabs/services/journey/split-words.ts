import { WORD_BOUNDARIES } from "utils/constants";

export function splitWords(text: string): string[] {
    let plainText = text.toLowerCase();
    for (const char of WORD_BOUNDARIES) {
        // plainText = plainText.replaceAll(char, " ");
        //plainText = plainText.replace(new RegExp(char, "g"), " ");
        plainText = plainText.replace(char, " "); //todo: fix this.  proper replaceAll
    }

    const words = plainText.split(" ");
    const distinctWords = [...new Set(words)];
    return distinctWords;
}
