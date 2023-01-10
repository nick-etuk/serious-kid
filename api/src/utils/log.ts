import { LOG_FENCE } from "./constants";
import { isEmpty } from "lodash";
import { dateHelperFactory } from "./date-helper";

/* eslint-disable no-console */
function log(
    severity: number,
    summary: string,
    details: any = null,
    always: boolean = false
) {
    //const dateHelper = dateHelperFactory();
    //const timestamp = dateHelper(new Date()).formatPadded;
    const date = new Date();
    const timestamp = `${date.toDateString()}  ${date.getHours()}: ${date.getMinutes()}`;

    if (severity < LOG_FENCE) return;
    if (always === false && summary === "warningList") {
        const len = Object.keys(details).length;
        if (len > 0) {
            console.log(`${timestamp}  warningList has ${len} items`);
            console.log(`${timestamp}  JSON.stringify(details, null, 2)`);
        }
        return;
    }

    const objType = typeof details;

    let objName = [""];
    if (summary) {
        objName[0] = summary;
    } else {
        if (details === Object(details)) {
            objName = Object.keys({ obj: details });
        }
    }

    if (details === Object(details)) {
        if (isEmpty(details) && !always) return;
        console.log(`${timestamp}   ${objType} ${objName}`);
        console.log(`${timestamp}   ${JSON.stringify(details, null, 2)}`);
    } else {
        console.log(
            `${timestamp}   ${
                objType === "string" ? details : typeof details + ":" + details
            }`
        );
    }
}

export { log };
