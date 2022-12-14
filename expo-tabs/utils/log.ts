import { LOG_FENCE } from "./constants";
import { isEmpty } from "lodash";

/* eslint-disable no-console */
function log(
  severity: number,
  summary: string,
  details: object | string | number = {},
  always = false
) {
  if (severity < LOG_FENCE) return;
  if (always === false && summary === "warningList") {
    const len = Object.keys(details).length;
    if (len > 0) {
      console.log(`warningList has ${len} items`);
      console.log(JSON.stringify(details, null, 2));
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
    console.log(objType + ": " + objName);
    console.log(JSON.stringify(details, null, 2));
  } else {
    if (["string", "number"].includes(objType)) {
      if (summary) {
        console.log(summary + (details || details == 0 ? ": " : "") + details);
      } else {
        console.log(details);
      }
    } else {
      typeof details + ": " + details;
    }
    //console.log(objType === ['string'] ? details : typeof details + ':' + details);
  }
}

export { log };
