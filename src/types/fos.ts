

export interface FOS extends FOSCreateData {
  id: number;
  submission_time: Date;
  status: string;
}

export interface FOSUpdateData {
  status?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface FOSResponse {
  success: boolean;
  data?: FOS | FOS[];
  message?: string;
  error?: string;
}

export interface FOSSearchParams {
  email?: string;
  phone?: string;
  page?: number;
  limit?: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
}

export interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
}

export  interface FOSCreateData {
  name: string;
  email: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  page_url: string;
  referrer?: string;
  user_agent?: string;
}
