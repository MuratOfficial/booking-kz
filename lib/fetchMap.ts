interface Thoroughfare {
  ThoroughfareName: string;
}

interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

interface AddressDetails {
  Country: Country;
}

interface AddressComponent {
  kind: string;
  name: string;
}

interface Address {
  country_code: string;
  formatted: string;
  Components: AddressComponent[];
}

interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

interface GeoObject {
  metaDataProperty: {
    GeocoderMetaData: GeocoderMetaData;
  };
  name: string;
  description: string;
  boundedBy: {
    Envelope: {
      lowerCorner: string;
      upperCorner: string;
    };
  };
  uri: string;
  Point: {
    pos: string;
  };
}

interface FeatureMember {
  GeoObject: GeoObject;
}

interface GeoObjectCollection {
  metaDataProperty: {
    GeocoderResponseMetaData: {
      request: string;
      results: string;
      found: string;
    };
  };
  featureMember: FeatureMember[];
}

interface ResponseData {
  response: {
    GeoObjectCollection: GeoObjectCollection;
  };
}

export async function fetchMap(
  text: string
): Promise<{ pos1: number; pos2: number } | null> {
  try {
    const encodedText = encodeURIComponent(text);
    const apiKey = process.env.YANDEX_API;
    if (!apiKey) {
      throw new Error("Yandex API key is missing in environment variables.");
    }

    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodedText}&lang=ru_RU&results=1&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Yandex Geocoding API: ${response.statusText}`
      );
    }

    const data: ResponseData = await response.json();

    // Extract pos from the response
    const posString =
      data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point
        ?.pos;

    if (!posString) {
      return null;
    }

    const [pos1, pos2] = posString.split(" ").map(Number).reverse();

    return { pos1, pos2 };
  } catch (error) {
    console.error("Error fetching data from Yandex Geocoding API:", error);
    return null;
  }
}

// Example usage:
// async function exampleUsage() {
//   const location = "Астана, ул.Сарайшык";
//
//   if (positions) {
//     console.log("Position 1:", positions.pos1);
//     console.log("Position 2:", positions.pos2);
//   } else {
//     console.log("Failed to fetch position.");
//   }
// }

// exampleUsage();
