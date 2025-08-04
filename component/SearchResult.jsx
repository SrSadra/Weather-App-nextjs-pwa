"use client";

import { useState } from "react";
import ResultBox from "./ResultBox";
import SearchButton from "./SearchButton";
import SearchWeather from "./SearchWeather";

const SearchResult = ({ cities }) => {
    const [selectedCity, setSelectedCity] = useState(null);

    const onInputChange = (city) => {
        console.log("city", city);

        setSelectedCity(city);
    }

    return (
        <div className="flex flex-col gap-20">
            <div className='flex flex-row gap-3'>
                <SearchWeather cities={cities} onInputChange={onInputChange} />
                <SearchButton />
            </div>
            {selectedCity && <ResultBox city={selectedCity} />}
        </div>
    )
}

export default SearchResult
