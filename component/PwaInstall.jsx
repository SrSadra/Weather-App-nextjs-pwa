import React from 'react'

const PwaInstall = ({ show, onClose, onInstall }) => {
    const blurBackground = show ? "backdrop-blur" : ""

    if (!show) {
        return null;
    }

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
          <div className='bg-white '>
              <h2>Install App</h2>
              <p>You Can install our app for better experiance</p>
              <div>
                  <button onClick={onInstall}>Install</button>
                  <button onClick={onClose}>Close</button>
              </div>
          </div>
          <div className={`inset-0 bg-gray-700 opacity-70 -z-10 ${blurBackground}`}></div>
    </div>
  )
}

export default PwaInstall
