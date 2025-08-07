"use client"

import { getCities } from '@/app/actions/weather';
import { Autocomplete, Box, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { use } from 'react'
// import Image from 'next/image';

const SearchWeather = ( { onInputChange}) => {
    // const actualCities = use(cities);
    const { data, isLoading } = useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
    });

    return (
            <div>
            <Autocomplete
                sx={{ width: { xs: 200, sm: 400 } }}
                onChange={(event, newValue) => {
                    onInputChange({name: newValue.city , code : newValue.code} );
                }}
                loading={isLoading}
                // size="medium"
                    options={ data || []}
                    autoHighlight //This prop automatically highlights the first matching option in the dropdown as the user types.
                    getOptionLabel={(option) => option.city} //This function tells the component what string to display as the label for each option.
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                {...optionProps}
                            >
                                {/* <img
                                    className='mx-1 rounded-md'
                                    loading="lazy"
                                    width="25"
                                    height="15"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt="Country logo"
                                /> */}
                                {option.city}, {option.country}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a country"
                            slotProps={{
                                htmlInput: { //htmlInput is the slot name for the actual underlying <input> element inside <TextField. if you skip this it can not work normally
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                    'data-testid': 'search-weather-input'
                                },
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: {
                                        "xs": '1rem', 
                                        "sm": "1.9rem"
                                    }
                                    
                                },
                            }}
                        />
                    )}

                />
            </div>
    )
}

export default SearchWeather
