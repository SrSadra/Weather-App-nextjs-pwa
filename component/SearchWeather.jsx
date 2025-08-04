"use client"

import { Autocomplete, Box, TextField, useTheme } from '@mui/material'
import React, { use, useEffect, useState } from 'react'

const SearchWeather = ({cities , onInputChange}) => {
    const actualCities = use(cities);

    return (
            <div>
            <Autocomplete
                sx={{ width: { xs: 200, sm: 400 } }}
                onChange={(event, newValue) => {
                    onInputChange({name: newValue.name , code : newValue.country} );
                }}
                size="medium"
                    options={ actualCities }
                    autoHighlight //This prop automatically highlights the first matching option in the dropdown as the user types.
                    getOptionLabel={(option) => option.name} //This function tells the component what string to display as the label for each option.
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                {...optionProps}
                            >
                                <img
                                    className='mx-1 rounded-md'
                                    loading="lazy"
                                    width="25"
                                    srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
                                    alt=""
                                />
                                {option.name}, {option.country}
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
