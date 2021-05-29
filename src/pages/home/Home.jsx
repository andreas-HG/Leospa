import React from 'react'
import About from '../../components/pages/home/about/About'
import Booking from '../../components/pages/home/booking/Booking'
import Hero from '../../components/pages/home/hero/Hero'
import Team from '../../components/pages/home/team/Team'
import Testimonials from '../../components/pages/home/testimonials/Testimonials'
import Treatments from '../../components/pages/home/treatments/Treatments'

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Treatments />
            <Testimonials />
            <Team />
            <Booking />
        </main>
    )
}

export default Home
