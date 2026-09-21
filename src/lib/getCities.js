let cities = null;

export async function getCities() {
  if (!cities) {
    cities = (await import("@/data/india-cities.json")).default;
  }

  return cities;
}