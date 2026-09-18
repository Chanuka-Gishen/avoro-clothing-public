export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zip?: string;
  country: string;
}

export interface CreateOrderPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  paymentMethodId: string;
  notes?: string;
}
