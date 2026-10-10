export interface BookingEvent {
  title: string;
  start: Date;
  end: Date;
  id: string;
  isBlocked?: boolean;
  uid?: string;
  firstName?: string;
  lastName?: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  needsEngineer: boolean;
}

export const emptyBookingFormData: BookingFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  notes: "",
  needsEngineer: false,
};
