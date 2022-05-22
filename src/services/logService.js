import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";

function init() {
    // Sentry.init({
    //     dsn: "https://7a621a3fcb484be7aafcb19b6d96ea6b@o1256569.ingest.sentry.io/6425912",
    //     integrations: [new BrowserTracing()],
    //
    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
}

function log(error){
    console.error(error);
    //Sentry.captureException(error);
}

export default {
    init,
    log
}