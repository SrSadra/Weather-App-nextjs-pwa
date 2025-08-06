"use client";

import { use, useState } from "react";
import ResultBox from "./ResultBox";
import SearchButton from "./SearchButton";
import SearchWeather from "./SearchWeather";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/app/actions/weather";

const SearchResult = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    // const actualCities = use(cities);
    const onInputChange = (city) => {
        console.log("city", city);

        setSelectedCity(city);
    }

    return (
        <div className="flex flex-col gap-20">
            <div className='flex flex-row gap-3'>
                <SearchWeather  onInputChange={onInputChange} />
                <SearchButton />
            </div>
            {selectedCity && <ResultBox city={selectedCity} />}
        </div>
    )
}

export default SearchResult
