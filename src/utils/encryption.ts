import { genSalt, hash } from "bcryptjs";

export const encrypt = async (password: string): Promise<string> => {
  const salt = await genSalt(12);
  const encrypted = await hash(password, salt);

  return encrypted;
};
