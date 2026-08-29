"use client";

import { FormEvent, useState } from "react";

type Settings = {
  displayName: string;
  email: string;
  username: string;
  bio: string;
  theme: string;
  language: string;
};

type Errors = Partial<Record<keyof Settings, string>>;

const initialSettings: Settings = {
  displayName: "Samreen",
  email: "samreen@example.com",
  username: "samreen_dev",
  bio: "",
  theme: "system",
  language: "en",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  function validateField(
    field: keyof Settings,
    value: string
  ): string {
    if (field === "displayName") {
      if (!value.trim()) return "Display name is required";
      return "";
    }

    if (field === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Enter a valid email address";
      }
      return "";
    }

    if (field === "username") {
      const username = value.trim();

      if (!username) return "Username is required";
      if (username.length < 3) {
        return "Username must be at least 3 characters";
      }
      if (username.length > 20) {
        return "Username must be at most 20 characters";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username may only contain letters, numbers, and underscores";
      }

      return "";
    }

    if (field === "bio") {
      if (value.length > 500) {
        return "Bio must be at most 500 characters";
      }
      return "";
    }

    if (field === "theme") {
      if (!["system", "light", "dark"].includes(value)) {
        return "Select a theme";
      }
      return "";
    }

    if (field === "language") {
      if (!["en", "ur", "es", "fr"].includes(value)) {
        return "Select a language";
      }
      return "";
    }

    return "";
  }

  function handleChange(field: keyof Settings, value: string) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: Errors = {};

    for (const field of Object.keys(settings) as (keyof Settings)[]) {
      const error = validateField(field, settings[field]);

      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }

    setMessage("Settings saved successfully.");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your account and application preferences.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div>
          <h2 className="text-xl font-semibold">
            Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the information associated with your account.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium"
            >
              Display Name
            </label>

            <input
              id="displayName"
              type="text"
              value={settings.displayName}
              onChange={(event) =>
                handleChange("displayName", event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.displayName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.displayName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={settings.email}
              onChange={(event) =>
                handleChange("email", event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={settings.username}
              onChange={(event) =>
                handleChange("username", event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium"
            >
              Bio
            </label>

            <textarea
              id="bio"
              rows={4}
              value={settings.bio}
              onChange={(event) =>
                handleChange("bio", event.target.value)
              }
              placeholder="Tell us a little about yourself"
              className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {settings.bio.length}/500
            </p>

            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">
                {errors.bio}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold">
            Preferences
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose how the application looks and behaves.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="theme"
                className="block text-sm font-medium"
              >
                Theme
              </label>

              <select
                id="theme"
                value={settings.theme}
                onChange={(event) =>
                  handleChange("theme", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>

              {errors.theme && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.theme}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium"
              >
                Language
              </label>

              <select
                id="language"
                value={settings.language}
                onChange={(event) =>
                  handleChange("language", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>

              {errors.language && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.language}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {message && (
              <p className="text-sm font-medium text-green-600">
                {message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}