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
export const FOOTER_COLOUR = "ivory";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "azure",
    marginBottom: "50",
    borderBottom: 1,
  },
  body: {
    backgroundColor: "ivory",
    marginTop: "5%",
  },
  image: {
    backgroundColor: "white ",
    marginTop: "3%",
    marginBottom: "3%",
    alignSelf: "center",
    height: 200,
    width: 200,
  },
  contentContainer: {
    flex: 1, // push footer to end of screen
  },
  footer: {
    backgroundColor: FOOTER_COLOUR,
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
  },
  link: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_NORMAL,
    fontWeight: "normal",
    color: FONT_COLOUR,
  },
  heading: {
    color: FONT_COLOUR,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_LARGE,
    fontWeight: "bold",
    marginTop: FONT_LARGE,
  },
  para: {
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
});
