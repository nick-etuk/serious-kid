const SEVERITY = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
};

const LOG_FENCE = SEVERITY.debug;

const SOURCE = {
  offline: 0,
  json: 1,
  http: 2,
};

const DATA_SOURCE = SOURCE.http;

const API_URL = "http://localhost:3000";

export { SEVERITY, LOG_FENCE, SOURCE, DATA_SOURCE, API_URL };
