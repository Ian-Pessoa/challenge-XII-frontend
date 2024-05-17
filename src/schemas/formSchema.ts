import {z} from 'zod';

export const formSchema = z.object({
  firstName: z
    .string()
    .min(3, 'Invalid name'),
  lastName: z
    .string()
    .min(3, 'Invalid last name'),
  email: z
    .string()
    .min(1, 'Invalid email')
    .email('Invalid email'),
  country: z
    .string()
    .refine((field) => field !== "select", {
      message: "Invalid country"
    }),
  city: z
    .string({ required_error: 'Invalid city' })
    .refine((field) => field !== "select", {
      message: 'Invalid city'
    }),
  referralCode: z.string(),
  ownCar: z.boolean(),
  carType: z
  .string()
  .nullable()
  .refine((value) => value !== null && value !== undefined, {
    message: 'Select a vehicle type',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;