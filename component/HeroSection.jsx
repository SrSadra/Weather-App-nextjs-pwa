import classes from "./HeroSection.module.css"

const HeroSection = () => {
  return (
    <div className="text-center md:mt-40 mt-20">
      <div className={classes.sunimage}></div>
      <div className="text-blue-600 ">
          <h1 className="font-bold text-5xl">Weather App</h1>
          <p>You Can Check weather everywhere</p>
      </div>

    </div>
  )
}

export default HeroSection
