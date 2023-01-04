import { StyleSheet } from "react-native";

export function relativeLineHeight(fontSize: number) {
    const multiplier = fontSize > 20 ? 1.5 : 1.8;
    return Math.floor(fontSize * multiplier);
}

const FONT_FAMILY = "opensans";
export const FONT_LARGE = 20;
export const FONT_NORMAL = 18;
const FONT_SMALL = 12;
const FONT_COLOUR = "rgb(37, 40, 42)"; // or rgb(36, 41, 47) (lighter) or rgb(45, 55, 72) (even lighter)

export const textStyles = StyleSheet.create({
    link: {
        fontFamily: FONT_FAMILY,
        fontSize: FONT_NORMAL,
        fontWeight: "normal",
        color: "green",
    },
    heading1: {
        color: "blue",
        fontFamily: FONT_FAMILY,
        fontSize: FONT_LARGE,
        fontWeight: "bold",
        marginTop: FONT_LARGE,
    },
    heading2: {
        color: FONT_COLOUR,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_LARGE,
        fontWeight: "bold",
        marginTop: FONT_LARGE,
    },
    normal: {
        color: FONT_COLOUR,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_NORMAL,
        lineHeight: relativeLineHeight(FONT_NORMAL),
        fontWeight: "normal",
    },
    snippetNum: {
        color: FONT_COLOUR,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SMALL,
        fontWeight: "normal",
        borderStyle: "solid",
        borderColor: FONT_COLOUR,
        marginLeft: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: FONT_COLOUR,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_NORMAL,
    },
});
