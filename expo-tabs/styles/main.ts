import { StyleSheet } from "react-native";

function relativeLineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1.8;
  return Math.floor(fontSize * multiplier);
}

const FONT_FAMILY = "garamond";
const FONT_LARGE = 20;
const FONT_NORMAL = 16;
const FONT_SMALL = 12;

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
    backgroundColor: "ghostwhite ",
    marginTop: "3%",
    marginBottom: "3%",
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1, // push footer to end of screen
  },
  footer: {
    backgroundColor: "mistyrose",
    height: 100,
  },
  link: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_NORMAL,
    fontWeight: "normal",
    color: "skyblue",
  },
  heading: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_LARGE,
    fontWeight: "bold",
    marginTop: FONT_LARGE,
  },
  para: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_NORMAL,
    lineHeight: relativeLineHeight(FONT_NORMAL),
    fontWeight: "normal",
    color: "black",
  },
  snippetNum: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SMALL,
    fontWeight: "normal",
    color: "skyblue",
    borderStyle: "solid",
    borderColor: "skyblue",
    marginLeft: 10,
  },
});
