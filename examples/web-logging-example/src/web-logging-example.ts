import { AWSFirehoseAppender, getLoggingManager, Level } from "@wireio/shared"

declare global {
  const FIREHOSE_CREDS_URL: string
}

const logManager = getLoggingManager()
logManager.addAppenders(new AWSFirehoseAppender(FIREHOSE_CREDS_URL))
logManager.globalMetadata = {
  env: "local",
  app: "web-logging-example",
  data: {
    globalMetaValue: "web-logging-example"
  }
}

const log = logManager.getLogger("web-logging-example")
log.info("Logger initialized")
document.getElementById("btn")!.addEventListener("click", () => {
  const count = 5;
  for (let i = 0; i < count; i++) {
    log.info("log message", { i, ts: new Date().toISOString(), ua: navigator.userAgent });
    log.error(`error ${i}`, Error(`sample error ${i}`));

    // WITH METADATA SPECIFIC TO THIS SPECIFIC LOG RECORD
    log.log(Level.info, {data: { wireDataId: "123"}}, `log with metadata: ${i}`, { i });
  }
  log.info(`enqueued ${count} logs`);
});

export {}