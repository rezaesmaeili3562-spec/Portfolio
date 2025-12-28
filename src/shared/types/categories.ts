export type CategoryNode = {
  id: string;
  name: string;
  icon: string;
  imageUrl?: string;
  children?: CategoryNode[];
};
