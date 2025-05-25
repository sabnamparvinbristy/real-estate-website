import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext'

function HomePage(){

    const {currentUser} =useContext(AuthContext)

    console.log(currentUser)
    return(
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>
                        Turning Your Dream 
                        Address Into Reality
                        </h1>
                        <p>
                            Start your journey with us to find the perfect place you can truly call home. Whether you're 
                            buying, renting, or investing, we bring you verified listings, 
                            expert guidance, and a seamless experience — all designed to make your dream address a reality.
                        </p>
                        <SearchBar/>

                        <div className="boxes">
                            <div className="box">
                                <h1>16+</h1>
                                <h2>Years Of Experience</h2>
                            </div>

                            <div className="box">
                                <h1>200</h1>
                                <h2>Award Gained</h2>
                            </div>

                            <div className="box">
                                <h1>2000+</h1>
                                <h2>Property Ready</h2>
                            </div>
                        </div>
                </div>
                
            </div>
            <div className="imgContainer">

                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage