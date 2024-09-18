import { z } from 'zod';


const userSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address'),
});
type DataType = z.infer<typeof userSchema>

export const validateUser = (data: DataType) => userSchema.safeParse(data);
