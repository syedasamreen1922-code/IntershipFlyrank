const { z } = require("zod");

const settingsSchema = z.object({
  displayName: z
    .string({ required_error: "Display name is required" })
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be at most 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Enter a valid email address"),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username may only contain letters, numbers, and underscores"
    ),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Select a theme",
    invalid_type_error: "Select a valid theme",
  }),
  language: z.enum(["en", "es", "fr", "de"], {
    required_error: "Select a language",
    invalid_type_error: "Select a valid language",
  }),
});

function validateSettings(data) {
  const result = settingsSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}

module.exports = { settingsSchema, validateSettings };
