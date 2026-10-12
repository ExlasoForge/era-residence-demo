export type ApartmentType = 'ground-floor-basement' | 'ground-floor' | 'penthouse-duplex';

export interface Apartment {
  id: string;
  order: number;
  number: string;
  block: string;
  floor: string;
  typeCode: ApartmentType;
  typeTitle: string;
  completion: string;
  beds: number;
  area: string;
  terrace: string;
  image: string;
  orientation?: string;
  compassAngle?: number;
  description?: string;
  features?: string[];
  status?: 'Available' | 'Reserved';
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

export interface PinItem {
  id: string;
  title: string;
  description: string;
  top: string;
  left: string;
  image: string;
}
