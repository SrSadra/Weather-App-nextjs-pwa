"use client";

import { getCityWeather } from "@/app/actions/weather";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import LoadingPage from "./LoadingPage";
// import AirIcon from '@mui/icons-material/Air';

const ResultBox = ({city}) => {
    const [isPending, startTransition] = useTransition();
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        startTransition(async () => {
            const weatherData = await getCityWeather(city.name);
            setWeather(weatherData);
        })
    }, [city]);

    if (!weather && city && !isPending) {
        return <p>No Weather found for such city...</p>;
    }

    if (!city) {
        return null;
    }


  return (
      <div>
          {weather ? (
              <Box sx={{justifyContent: "center", alignItems: "center" , display: "flex" , flexDirection: "column", backgroundColor: "gray" , borderRadius: "20px"}}>
                  <div className="flex-row flex gap-4 items-center justify-center w-full my-4 mx-5">
                      <Avatar sx={{alignItems: "center"}} alt="country flg" src={`https://flagcdn.com/w20/${city.code.toLowerCase()}.png`} />
                      <Typography variant="h2">{weather.location.name}</Typography>
                      <div className="my-5 ml-7 p-2 bg-gray-400">Local Time: {(weather.location.localtime).split(" ")[1]}</div>
                  </div>
                  <div className="w-full">
                      <Divider variant="middle" sx={{ borderColor: 'black', borderBottomWidth: 3 }} />
                      <div className="my-4 mx-5">
                      <div className="flex justify-between">
                          <Typography variant="h4">Weather: {weather.current.condition.text}</Typography>
                          <div className="flex flex-row items-center">
                              <Typography variant="h6">{weather.current.temp_c}°C</Typography>
                              <Image src={`https:${weather.current.condition.icon}`} width={40} height={20}/>
                          </div>
                      </div>
                      <div className="flex flex-row justify-start">
                          {/* <AirIcon /> */}
                          <Typography>Wind: {weather.current.wind_mph} mph</Typography>
                      </div>
                      </div>
                  </div>
              </Box>
          ) : isPending && <LoadingPage />}
    </div>
  )
}

export default ResultBox
