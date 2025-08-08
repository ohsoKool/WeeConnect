import { z } from "zod";

export const registerZodSchema = z.object({
  userName: z.string(),
  mobile: z.string().length(10, "Mobile number must be exactly 10 digits"),
  //length works only on string and not on number
  email: z.string().email("Enter valid email format"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain atleast one lower case, one upper case and a digit"
    )
    .min(5, "Password must be minimum 5 characters and maximum 20 characters")
    .max(20, "Password must be minimum 5 characters and maximum 20 characters"),
  avatar: z.any(), // accept anything for avatar
});
export const loginZodSchema = z.object({
  email: z.string().email("Enter valid email format"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain atleast one lower case, one upper case and a digit"
    )
    .min(5, "Password must be minimum 5 characters ")
    .max(20, "Password must be maximum 20 characters"),
});
