export interface Post {
  // _type:string,
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: srting;
  };
  mainImage: string;
  publishedAt: string;
  comment: [Comment];
  slug: { current: string };
  body: [object];
}

export interface Comment {
  validate: boolean;
  comment: string;
  name: string;
  email: string;
  view: {
    _ref: string;
    _type: string;
  };
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
