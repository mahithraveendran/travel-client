export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface ITrip {
  activities: string[];
  budget: number;
  createdAt: string;
  description: string | null;
  destination: string;
  endDate: string;
  id: string;
  image: string | null;
  photos: string[];
  startDate: string;
  type: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    email: string;
    userProfile: {
      image: string;
    };
  };
}

export interface ITravelRequestHistory {
  createdAt: string;
  id: string;
  status: string;
  trip: ITrip;
  tripId: string;
  updatedAt: string;
  userId: string;
}

// trip status
export interface ITripStatus {
  PENDING: string;
  APPROVED: string;
  REJECTED: string;
}

export enum TravelType {
  BACKPACKING = "BACKPACKING",
  LUXURY = "LUXURY",
  ROAD_TRIP = "ROAD_TRIP",
  VOLUNTEER = "VOLUNTEER",
  EDUCATIONAL = "EDUCATIONAL",
  ADVENTURE = "ADVENTURE",
  FOODIE = "FOODIE",
  SLOW_TRAVEL = "SLOW_TRAVEL",
  LEISURE = "LEISURE",
  BUSINESS = "BUSINESS",
  OTHER = "OTHER",
}

// create a type for user
export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
}

// create a user status enum
export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVATE = "DEACTIVATE",
}

// create a user role enum
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
