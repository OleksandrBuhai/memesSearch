export interface Meme {
    id: string;
    title: string;
    images: {
      fixed_height: {
        url: string;
      };
    };
    term:string;
    source:string;
  }