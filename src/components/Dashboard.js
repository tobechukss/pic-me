import Navbar from "./Navigation"
import Hero from "./Hero"
import Carousel from "./Carousel"
const Dashboard = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <Navbar/>
         
            <Hero/>
            <Carousel/>

        </div>
    )
}

export default Dashboard