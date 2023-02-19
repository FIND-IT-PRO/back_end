const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString =
  process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];
if (!connectionString) {
  throw new Error(
    "COMMUNICATION_SERVICES_CONNECTION_STRING is not set in the environment. Please refer to README.md to set this variable."
  );
}

module.exports = new EmailClient(connectionString);
