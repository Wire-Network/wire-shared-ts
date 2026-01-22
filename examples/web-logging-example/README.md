# Web Logging Example

> NOTE: THE DATA GENERATED WITH THE DEFAULT CONFIGURATION
> IS ONLY ACCESSIBLE BY WIRE NETWORK, INC

A browser-based example demonstrating how to use the `@wireio/shared` logging framework with the AWS Firehose appender for centralized log aggregation.

## Overview

This example shows:
- Setting up the logging manager in a browser environment
- Configuring the `AWSFirehoseAppender` for streaming logs to AWS Kinesis Data Firehose
- Sending structured log messages with metadata

## Prerequisites

- Node.js >= 22
- pnpm
- An AWS Firehose credential endpoint (configured in `AWSFirehoseCredentialManager`)

## Setup

```bash
# From the repository root
pnpm install

# Build the shared packages first
pnpm build

# Navigate to this example
cd examples/web-logging-example

# Build the example
pnpm build

# Or run the dev server
pnpm build:dev
```

## Running

Start the development server:

```bash
pnpm build:dev
```

Open your browser to `http://localhost:9090`. Click the "Send 5 test logs" button to send sample log messages to AWS Firehose.

## How It Works

### Entry Point

The example initializes the logging system in `src/web-logging-example.ts`:

```typescript
import { AWSFirehoseAppender, getLoggingManager } from "@wireio/shared"

// Get the singleton logging manager
const logManager = getLoggingManager()

// Add the Firehose appender (console appender is included by default)
logManager.addAppenders(new AWSFirehoseAppender())

// Create a logger for this module
const log = logManager.getLogger("web-logging-example")

// Log messages
log.info("Logger initialized")
log.info("User action", { i: 1, ts: new Date().toISOString() })
log.error("Something failed", new Error("sample error"))
```

### Credential Flow

The `AWSFirehoseAppender` uses `AWSFirehoseCredentialManager` to obtain temporary AWS credentials:

1. When logs are first enqueued, the credential manager fetches temporary credentials from the configured endpoint
2. Credentials include the Firehose stream name, region, and temporary AWS access keys
3. The manager automatically refreshes credentials 3 minutes before expiration
4. If credentials expire mid-session, the appender triggers a forced refresh

### Log Record Structure

Each log sent to Firehose includes:

```json
{
  "category": "web-logging-example",
  "level": "info",
  "message": "log message",
  "timestamp": 1705936800000,
  "app": "web",
  "env": "WEB",
  "url": "http://localhost:9090/",
  "args": [{ "i": 1, "ts": "2024-01-22T12:00:00.000Z" }]
}
```

For errors:
```json
{
  "category": "web-logging-example",
  "level": "error",
  "message": "error 0",
  "errorMessage": "sample error 0",
  "errorStack": "Error: sample error 0\n    at ...",
  "timestamp": 1705936800000,
  "app": "web",
  "env": "WEB",
  "url": "http://localhost:9090/"
}
```

## Project Structure

```
web-logging-example/
├── public/
│   └── index.html      # HTML page with button UI
├── src/
│   ├── index.ts        # Entry point (imports web-logging-example)
│   └── web-logging-example.ts  # Logging setup and demo logic
├── package.json
├── tsconfig.json
└── webpack.config.js   # Webpack bundler configuration
```

## Configuration

### Webpack

The example uses Webpack with `ts-loader` for TypeScript compilation. The bundle is output to `dist/bundle.js` and served from the `public/` directory.

### TypeScript

The `tsconfig.json` extends the repository's base configuration and includes project references to `@wireio/shared` and `@wireio/shared-web`.

## Customization

### Using a Different Credential Endpoint

The default credential endpoint is configured in `AWSFirehoseCredentialManager`. To use a different endpoint, you would need to modify or extend the credential manager:

```typescript
// In AWSFirehoseCredentialManager.ts
const API_BASE = "https://your-credential-endpoint.com"
```

### Adding Additional Appenders

```typescript
import { ConsoleAppender, AWSFirehoseAppender, getLoggingManager } from "@wireio/shared"

const logManager = getLoggingManager()

// Configure multiple appenders
logManager.setAppenders(
  new ConsoleAppender({ prettyPrint: true }),
  new AWSFirehoseAppender()
)
```

### Adjusting Log Levels

```typescript
import { Level, getLoggingManager } from "@wireio/shared"

const logManager = getLoggingManager()

// Set minimum log level
logManager.setRootLevel(Level.debug)

// Enable trace logging for specific categories
logManager.addThresholdOverrides(
  [/^my-module/, "trace"]
)
```
