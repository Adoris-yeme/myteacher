export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'tutor' | 'admin' | 'sub_admin';
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'users' | 'tutors' | 'bookings' | 'payments' | 'analytics' | 'settings';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
}

export interface Tutor extends User {
  subjects: Subject[];
  hourlyRate: number;
  experience: number;
  education: Education[];
  certifications: Certification[];
  availability: Availability[];
  rating: number;
  reviewCount: number;
  isApproved: boolean;
  location: Location;
  bio: string;
  languages: string[];
  teachingMethods: string[];
}

export interface Subject {
  id: string;
  name: string;
  category: string;
  level: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verificationUrl?: string;
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  subject: Subject;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  location: 'home' | 'online' | 'library';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';
  price: number;
  commission: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  commission: number;
  tutorAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}