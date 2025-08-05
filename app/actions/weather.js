"use server";

export async function getCities() {
    // const res = await fetch('https://api.api-ninjas.com/v1/city?name=a', {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Api-Key": process.env.API_CITY_KEY,
    //   },
    // });
    // if (!res.ok) {
    //     throw new Error("Can not fetch cities");
    // }
    // const cities = await res.json();
    // console.log(cities);
    const cities = [
      {
        name: "Jakarta",
        latitude: -6.2146,
        longitude: 106.845,
        country: "ID",
        population: 34540000,
        region: "Java",
        is_capital: true,
      },
    ];
    return cities;
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