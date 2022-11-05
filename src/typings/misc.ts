import { Ref } from 'vue';

export type Constructor<T> = new (...args: any[]) => T;

type NonMethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type WithoutMethods<T> = Pick<T, NonMethodKeys<T>>;

export type WithoutReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined // JSON doesn't support undefined, but we put it here to allow for optional fields
  | JSONValue[]
  | JSONObject;

export type JSONObject = { [key: string]: JSONValue };

export type ValueOrRef<T> = T | Ref<T>;
