"use client"

import React, { useEffect, useState } from 'react'
import PwaInstall from './PwaInstall';

const PwaHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstall = (event) => { // on starting screen if user has not installed the app
      event.preventDefault();
      setPrompt(event);
      
      
      setIsModalOpen(!((window.matchMedia('(display-mode: standalone)').matches)));
    }


    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("heyyy");
      
      event.preventDefault();
      setPrompt(event);


      setIsModalOpen(!((window.matchMedia('(display-mode: standalone)').matches)));
    }); // it only works on chrome/edge and there is no guarntee

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall); // to avoid memory leak
    }
  }, []);

  const handleOnInstallClick = () => {
    if (prompt) {
      prompt.prompt();
    }
  }


  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <PwaInstall show={isModalOpen} onClose={handleOnCloseModal} onInstall={handleOnInstallClick}/>
    </div>
  )
}

export default PwaHome;
