"use client";

import { use, useState } from "react";
import ResultBox from "./ResultBox";
import SearchButton from "./SearchButton";
import SearchWeather from "./SearchWeather";

const SearchResult = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    // const actualCities = use(cities);
    const onInputChange = (city) => {
        setSelectedCity(city);
    }

    return (
        <div className="flex flex-col gap-20">
            <div className='flex flex-row gap-3'>
                <SearchWeather  onInputChange={onInputChange} />
            </div>
            {selectedCity && <ResultBox city={selectedCity} />}
        </div>
    )
}

export default SearchResult
