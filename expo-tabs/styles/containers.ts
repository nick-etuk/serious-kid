import { StyleSheet } from "react-native";

function relativeLineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1.8;
  return Math.floor(fontSize * multiplier);
}

const FONT_FAMILY = "opensans";
const FONT_LARGE = 20;
const FONT_NORMAL = 18;
const FONT_SMALL = 12;
const FONT_COLOUR = "rgb(37, 40, 42)"; // or rgb(36, 41, 47) (lighter) or rgb(45, 55, 72) (even lighter)
export const FOOTER_COLOUR = "mistyrose";

export const containerStyles = StyleSheet.create({
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
    //borderBottom: 1,
  },
  body: {
    backgroundColor: "white", //"ivory",
    marginTop: "5%",
  },
  panelContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  leftPanel: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  centrePanel: {
    flex: 4,
    alignSelf: "center",
    backgroundColor: "white",
  },
  rightPanel: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
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
});
