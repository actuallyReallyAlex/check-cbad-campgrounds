export interface AppError {
  error: string;
}

export interface AvailableInfo {
  date: string;
  numberAvailable: number;
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
  708: Facility;
  712: Facility;
  714: Facility;
  715: Facility;
  2100?: Facility;
}

interface Place {
  Allhighlights: string;
  Available: boolean;
  AvailableFiltered: boolean;
  AvailableUnitCount: number;
  BannerUrl: null;
  Description: string;
  Facilities: FacilityDictionary;
  HasAlerts: boolean;
  ImageUrl: string;
  IsFavorite: boolean;
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
  FutuerBookingEnds: string;
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