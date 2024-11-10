export type dataType = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "pending" | "paid" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: Item[];
  total: number;
};

export type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type idListType = string[];

export type jsonDataType = dataType[];

export type statusDataArray = dataType["status"][];
