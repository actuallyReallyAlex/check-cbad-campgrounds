export const bodyDefaults = {
  CountNearby: false,
  CustomerId: "0",
  HighlightedPlaceId: 0,
  IsADA: false,
  PlaceId: "720", // 712 is san onofre | 720 is carlsbad
  Latitude: 0,
  Longitude: 0,
  MinVehicleLength: 0,
  NearbyCountLimit: 10,
  NearbyLimit: 100,
  NearbyOnlyAvailable: false,
  Nights: "1",
  RefreshFavourites: true,
  SleepingUnitId: 0,
  Sort: "Distance",
  UnitCategoryId: 0,
  UnitTypesGroupIds: [],
};

export const endpoint = "https://calirdr.usedirect.com/rdr/rdr/search/place";

export const headers = {
  Accept: "/",
  "Accept-Encoding": "gzip, deflate, br",
  Authority: "calirdr.usedirect.com",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "application/json",
  Path: "/rdr/rdr/search/place",
  Scheme: "https",
};

// * ReserveCA requires 3 days out
export const numberOfDaysToSkip = 3;
