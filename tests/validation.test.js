const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  validateField,
  validateSettings,
  FIELD_ORDER,
} = require("../src/validation/settingsValidation");

describe("validateField", () => {
  it("requires display name", () => {
    assert.equal(validateField("displayName", ""), "Display name is required");
    assert.equal(validateField("displayName", "  "), "Display name is required");
  });

  it("requires username", () => {
    assert.equal(validateField("username", ""), "Username is required");
  });

  it("requires a valid email format", () => {
    assert.equal(validateField("email", ""), "Email is required");
    assert.equal(
      validateField("email", "not-an-email"),
      "Enter a valid email address"
    );
    assert.equal(validateField("email", "user@example.com"), "");
  });

  it("restricts username to letters, numbers, and underscores", () => {
    assert.equal(
      validateField("username", "bad-user"),
      "Username may only contain letters, numbers, and underscores"
    );
    assert.equal(validateField("username", "valid_user1"), "");
  });

  it("limits bio to 500 characters", () => {
    const longBio = "a".repeat(501);
    assert.equal(
      validateField("bio", longBio),
      "Bio must be at most 500 characters"
    );
    assert.equal(validateField("bio", "short bio"), "");
    assert.equal(validateField("bio", ""), "");
  });

  it("requires theme and language selections", () => {
    assert.equal(validateField("theme", ""), "Select a theme");
    assert.equal(validateField("language", ""), "Select a language");
    assert.equal(validateField("theme", "dark"), "");
    assert.equal(validateField("language", "en"), "");
  });
});

describe("validateSettings", () => {
  const validPayload = {
    displayName: "Samreen",
    email: "sam@example.com",
    username: "samreen_dev",
    bio: "Engineer",
    theme: "system",
    language: "en",
  };

  it("accepts valid settings", () => {
    const result = validateSettings(validPayload);
    assert.equal(result.success, true);
    assert.deepEqual(result.data, validPayload);
  });

  it("returns all field errors for invalid submission", () => {
    const result = validateSettings({
      displayName: "",
      email: "bad",
      username: "x",
      bio: "a".repeat(501),
      theme: "",
      language: "",
    });

    assert.equal(result.success, false);
    for (const field of FIELD_ORDER) {
      assert.ok(result.errors[field], `expected error for ${field}`);
    }
  });

  it("trims whitespace from text fields", () => {
    const result = validateSettings({
      ...validPayload,
      displayName: "  Samreen  ",
      email: "  sam@example.com  ",
      username: "  samreen_dev  ",
      bio: "  hello  ",
    });

    assert.equal(result.success, true);
    assert.equal(result.data.displayName, "Samreen");
    assert.equal(result.data.email, "sam@example.com");
    assert.equal(result.data.username, "samreen_dev");
    assert.equal(result.data.bio, "hello");
  });
});
