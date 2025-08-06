"use server";

export async function getCities() {
const url = "https://country-facts.p.rapidapi.com/countries";

try {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.API_CITY_KEY2,
      "x-rapidapi-host": "country-facts.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error("can not fetch countries");
  }

  const data = await response.json();
  
  const tmp = data.result;
  const result = tmp.map((country) => {
    return {
      country: country.name.common,
      city: country.capital[0],
      code : country.cca2
    }
  })
  return result;
} catch (error) {
  throw new Error(error);
}
}


export async function getCityWeather(city) {

  const query = new URLSearchParams();
  query.append("key", process.env.API_WEATHER_KEY);
  query.append("q", city);
  query.append("aqi", "no");
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?${query.toString()}`
  );
  console.log("res", res);
  
  if (!res.ok) {
       throw new Error("Can not fetch weather");
  }
  const data = await res.json();
  console.log(data);
  return data;
} 