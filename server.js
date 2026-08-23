const express = require("express");
const path = require("path");
const { validateSettings } = require("./src/validation/settingsValidation");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/js/validation",
  express.static(path.join(__dirname, "src/validation"))
);

const defaultSettings = {
  displayName: "Samreen",
  email: "samreen@example.com",
  username: "samreen_dev",
  bio: "",
  theme: "system",
  language: "en",
};

app.get("/api/settings", (_req, res) => {
  res.json(defaultSettings);
});

app.post("/api/settings", (req, res) => {
  const result = validateSettings(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.errors,
    });
  }

  res.json({
    message: "Settings saved successfully",
    data: result.data,
  });
});

function startServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => {
    console.log(`Settings app running at http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, defaultSettings };
