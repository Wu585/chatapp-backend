import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
  secret: 'PNjykbJ23EFB7tWLM1cFpoAJc6okfeTmKt6qqDH0X2RWRawR4EgLWKV7BgnFYt8y',
};

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
