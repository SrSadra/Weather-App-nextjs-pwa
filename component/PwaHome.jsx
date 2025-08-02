"use client"

import React, { useEffect, useState } from 'react'

const PwaHome = () => {
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    }, []);

    if (isStandalone) {
        return null; // Don't show install button if already installed
    }
    

  return (
    <div>
      <h2>Install App</h2>
    </div>
  )
}

export default PwaHome;
