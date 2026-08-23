const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../server");

let server;
let baseUrl;

before(async () => {
  server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("POST /api/settings", () => {
  it("rejects invalid submissions with field errors", async () => {
    const response = await fetch(`${baseUrl}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: "",
        email: "invalid",
        username: "x",
        bio: "a".repeat(501),
        theme: "",
        language: "",
      }),
    });

    const body = await response.json();
    assert.equal(response.status, 400);
    assert.equal(body.message, "Validation failed");
    assert.ok(body.errors.displayName);
    assert.ok(body.errors.email);
    assert.ok(body.errors.username);
    assert.ok(body.errors.bio);
  });

  it("accepts valid submissions and returns success state", async () => {
    const payload = {
      displayName: "Samreen",
      email: "sam@example.com",
      username: "samreen_dev",
      bio: "Building things.",
      theme: "dark",
      language: "en",
    };

    const response = await fetch(`${baseUrl}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.message, "Settings saved successfully");
    assert.deepEqual(body.data, payload);
  });
});

describe("GET /api/settings", () => {
  it("returns default settings for the form", async () => {
    const response = await fetch(`${baseUrl}/api/settings`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(body.displayName);
    assert.ok(body.email);
    assert.ok(body.username);
    assert.ok(body.theme);
    assert.ok(body.language);
  });
});
