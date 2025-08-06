"use server";


import HeroSection from './HeroSection'
import { getCities } from '@/app/actions/weather'
import SearchResult from './SearchResult'
import { getQueryClient } from '@/app/get-query-client'
import { hydrate, HydrationBoundary } from '@tanstack/react-query'

const HomePage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cities"],
    queryFn: getCities
  })


  return (
    <div className='flex items-center h-screen flex-col gap-20'>
      <HeroSection />
      <HydrationBoundary state={hydrate(queryClient)}>
          <SearchResult />
      </HydrationBoundary>
    </div>
  )
}

export default HomePage
