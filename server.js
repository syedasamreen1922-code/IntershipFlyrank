const express = require("express");
const path = require("path");
const { validateSettings } = require("./src/validation/settingsSchema");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/settings", (_req, res) => {
  res.json({
    displayName: "Samreen",
    email: "samreen@example.com",
    username: "samreen_dev",
    bio: "",
    notifications: true,
    theme: "system",
    language: "en",
  });
});

app.post("/api/settings", (req, res) => {
  const payload = {
    ...req.body,
    notifications: Boolean(req.body.notifications),
  };

  const result = validateSettings(payload);

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

app.listen(PORT, () => {
  console.log(`Settings app running at http://localhost:${PORT}`);
});
