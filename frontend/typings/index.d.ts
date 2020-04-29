// Usefull TypeScript types
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
declare global {
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
}

declare module "*.md";

declare module "*.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
