declare module 'desktop-screenshot' {
  interface Options {
    width?: number
    height?: number
    quality?: number
  }
  type CallbackFn = (error: unknown, complete: unknown) => void

  export default function Screenshot(
    filename: string,
    options?: Options | CallbackFn,
    callback?: CallbackFn
  ): void
}
