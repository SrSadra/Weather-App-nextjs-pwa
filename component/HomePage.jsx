

import React, { Suspense } from 'react'
import HeroSection from './HeroSection'
import SearchWeather from './SearchWeather'
import { getCities } from '@/app/actions/weather'
import SearchButton from './SearchButton'
import ResultBox from './ResultBox'
import SearchResult from './SearchResult'

const HomePage = () => {
  const cities = getCities();


  return (
    <div className='flex items-center h-screen flex-col gap-20'>
      <HeroSection />
      <Suspense fallback={<p>Loading ...</p>}>
          <SearchResult cities={cities}/>
      </Suspense>
    </div>
  )
}

export default HomePage
