import { Box, Divider, Skeleton } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
    return (
        <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", backgroundColor: "gray", borderRadius: "20px" }}>
            <div className="flex-row flex gap-4 items-center justify-center w-full my-4 mx-5">
                <Skeleton variant='circular' width="40" height="40" />
                <Skeleton variant="text" width="70%" height="80%"/>
            </div>
            <div className="w-full">
                <Divider variant="middle" sx={{ borderColor: 'black', borderBottomWidth: 3 }} />
                <div className="my-4 mx-5">
                    <Skeleton variant='rounded' width="100%" height="40" />
                </div>
            </div>
        </Box>
  )
}

export default LoadingPage
