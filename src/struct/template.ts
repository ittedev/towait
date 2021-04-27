export interface Template {
  compile(): void,
  render (context?: object): string
}
