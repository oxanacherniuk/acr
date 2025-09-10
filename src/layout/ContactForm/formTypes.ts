export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
}

export interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}