const ACTIVITY = {
    tutor: "TUTOR",
    multi: "MULTI",
    input: "INPUT",
};

const SEVERITY = {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3,
};

const LOG_FENCE = SEVERITY.info;

const SOURCE = {
    offline: 0,
    json: 1,
    http: 2,
};

const DATA_SOURCE = SOURCE.http;

const API_URL = "http://192.168.1.221:3000";

const STEP_MAX_WORDS = 300;
const STAGE_MAX_STEPS = 5;
const DIFFICULTY = {
    easy: 1,
    medium: 2,
    hard: 3,
};

const DISPLAYABLE = ["P", "T", "HE"];

const WORD_BOUNDARIES = [" ", ".", ",", ";", ":", "!", "?", "\n"];

export {
    ACTIVITY,
    SEVERITY,
    LOG_FENCE,
    SOURCE,
    DATA_SOURCE,
    API_URL,
    STEP_MAX_WORDS,
    STAGE_MAX_STEPS,
    DIFFICULTY,
    DISPLAYABLE,
    WORD_BOUNDARIES,
};
