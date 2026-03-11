export interface RegistrationData {
  name: string;
  phone: string;
  email: string;
  product: string;
  paymentCode: string;
  timestamp?: string;
  status: "UNPAID" | "PAID";
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
