export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type StoreSettings = {
  storeName: string;
  storeEmail: string;
  phone: string;
  address: string;
  logoUrl: string;
  socials: SocialLink[];
  taxRate: number;
  bankAccount: string;
  shippingPolicy: string;
  paymentGateway: string;
};
