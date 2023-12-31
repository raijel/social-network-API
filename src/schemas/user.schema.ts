import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .max(20, { message: "Username must be less than 20 characters" })
    .min(6, { message: "Username must be at least 6 character" })
    .refine((value) => !/\s/.test(value) && /^[a-zA-Z0-9]+$/.test(value), {
      message: "Only numbers & letters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 character",
    })
    .refine(
      (password) => {
        return (
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*]/.test(password) &&
          !/\s/.test(password)
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one number, one symbol and no spaces",
      }
    ),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .max(15, { message: "Username must be less than 15 characters" })
    .refine((value) => !/\s/.test(value), { message: "No spaces allowed" }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 character",
    })
    .refine(
      (password) => {
        return (
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*]/.test(password) &&
          !/\s/.test(password)
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one number, one symbol and no spaces.",
      }
    ),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 character",
    })
    .refine(
      (password) => {
        return (
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*]/.test(password) &&
          !/\s/.test(password)
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one number, one symbol and no spaces.",
      }
    ),
});
