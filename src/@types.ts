declare module "fpoint" {
  function fscrub(
    node: HTMLElement, 
    handlers: Record<string, (event?: Event) => void>, 
    options: any
  ): () => void;
}
