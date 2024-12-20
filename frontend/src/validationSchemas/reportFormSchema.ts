import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const nameAndSurnameSchema = z
  .string()
  .min(1, { message: "Name and surname are required." })
  .refine((value) => value.trim().split(" ").length >= 2, {
    message: "Please provide both name and surname.",
  })
  .refine(
    (value) =>
      value
        .trim()
        .split(" ")
        .every((part) => /^[A-Za-z]+$/.test(part)),
    { message: "Only letters are allowed in name and surname." },
  );

export const ReportFormSchema = z.object({
  age: z
    .number()
    .min(1, { message: "Enter your real age" })
    .max(150, { message: "Enter your real age" }),
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      // Max 5MB
      message: "File size should not exceed 5MB.",
    })
    .optional(),
  name: nameAndSurnameSchema,
});
