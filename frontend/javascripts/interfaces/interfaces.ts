interface state {
  [index: string]: string | number;
  a: any;
  b: any;
}

interface divTags {
  id: string;
  class?: string;
  tag?: string;
}

export { state, divTags };
