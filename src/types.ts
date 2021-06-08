import { Router } from "express";

export interface AppError {
  error: string;
}

export interface AppResponse {
  message?: string;
  success: boolean;
}

export interface AvailableInfo {
  date: string;
  numberAvailable: number;
}

export interface CampsiteInfo {
  availableSites: number;
  date: string;
  facilityName: string;
  siteNumber: number;
}

export type Controller = {
  router: Router;
};

export interface DayInfo {
  availableSites: number;
  date: string;
  facilities: FacilityInfo[];
}

export interface Facility {
  Available: boolean;
  AvailableFiltered: boolean;
  AvailableOccupancy: null;
  Category: string;
  Description: string;
  EnableCheckOccupancy: boolean;
  FacilityAllowWebBooking: boolean;
  FacilityId: number;
  FacilityType: number;
  FacilityTypeNew: number;
  InSeason: boolean;
  Latitude: number;
  Longitude: number;
  Name: string;
  RateMessage: null;
  Restrictions: Restrictions;
  UnitTypes: UnitTypeDictionary
}

interface FacilityDictionary {
  708?: Facility;
  712?: Facility;
  714?: Facility;
  715?: Facility;
  2100?: Facility;
}

export interface FacilityInfo {
  availableSites: {
    premium: number,
    regular: number
  };
  id: number;
  name: string;
}

export interface MockNodeFetch {
  json: () => Promise<PlaceResponse | TextbeltResponse | AppError>;
}

interface Place {
  Allhighlights: string;
  Available: boolean;
  AvailableFiltered: boolean;
  AvailableUnitCount: number;
  BannerUrl: string | null;
  Description: string;
  Facilities: FacilityDictionary;
  HasAlerts: boolean;
  ImageUrl: string;
  IsFavourite: boolean;
  Latitude: number;
  Longitude: number;
  MilesFromSelected: number;
  Name: string;
  ParkActivity: number;
  ParkCategoryId: number;
  ParkPopularity: number;
  ParkSize: string;
  PlaceId: number;
  Restrictions: Restrictions,
  Url: string;
}

export interface PlaceResponse {
  AvailablePlaces: number;
  CountNearby: boolean;
  CustomerId: null;
  EndDate: string;
  Filters: {
    IsADA: string;
    MinVehicleLength: string;
    SleepingUnitId: string;
    UnitCategoryId: string;
  },
  HighlightedPlaceId: number;
  Latitude: number;
  Longitude: number;
  Message: string;
  NearbyLimit: number;
  NearbyPlaces: Place[];
  SelectedPlace: Place;
  SelectedPlaceId: number;
  Sort: string;
  StartDate: string;
}

interface Restrictions {
  FutureBookingEnds: string;
  FutureBookingStarts: string;
  IsRestrictionValid: boolean;
  MaximumStay: number;
  MinimumStay: number;
}

export interface TextbeltResponse {
  quotaRemaining: number;
  success: boolean;
  textId: string;
}

interface Unit {
  Available: boolean;
  AvailableCount: number;
  AvailableFiltered: boolean;
  HasAda: boolean;
  MaxVehicleLength: number;
  Name: string;
  Restrictions: null | Restrictions;
  UnitCategoryId: number;
  UnitTypeGroupId: number;
  UnitTypeId: number;
}

interface UnitTypeDictionary {
  [id: string]: Unit;
}