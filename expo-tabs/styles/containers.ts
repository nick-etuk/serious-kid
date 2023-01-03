import { StyleSheet } from "react-native";

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
        //alignItems: "flex-start",
        //backgroundColor: "ivory", //"white", //"ivory",
        marginTop: "5%",
        //justifyContent: "flex-start",
        //borderStyle: "solid",
        //borderColor: "black",
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
        //flexDirection: "column",
        alignSelf: "center",
        //backgroundColor: "honeydew",
        height: "100%",
        //justifyContent: "flex-start",
        //minWidth: "70%",
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
