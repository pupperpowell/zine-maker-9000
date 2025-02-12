// lib/zine.ts

export type Zine = { // TODO: make sure these match schema
    title: string;
    author: string;
    createdAt: Date;
    pages: string[]; // TODO: no, should be an array of Page type
    pageSize: { width: number; height: number }; // inches?
  };
  
  // Function to create a new zine
  export const createZine = (title: string, author: string, pageSize = { width: 8.5, height: 11 }): Zine => ({
    title,
    author,
    createdAt: new Date(),
    pages: [],
    pageSize,
  });
  
  // Function to add a page
  export const addPage = (zine: Zine, content: string): Zine => ({
    ...zine,
    pages: [...zine.pages, content],
  });
  
  // Function to remove a page
  export const removePage = (zine: Zine, index: number): Zine => ({
    ...zine,
    pages: zine.pages.filter((_, i) => i !== index),
  });
  