import './index.scss';
import './main.scss';
import './media.scss';
import React, { useState, useRef, useEffect } from 'react';
import Moment from 'react-moment';
import { animated, useSpring } from '@react-spring/web'
import Select from 'react-select'
import axios from 'axios';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


function App() {

    const [closeAuthAnim, closeAuthAnimApi] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 }
    }))

    var form = useRef();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("London");
    const [temp, setTemp] = useState()
    const [tempAbout, setTempAbout] = useState()
    const [params, setParams] = useState([])
    const [loadErr, setLoadErr] = useState()
    const [lon, setLon] = useState(0)
    const [lat, setLat] = useState(0)

    const [isLoaded, setIsLoaded] = useState();

    const [auth, setAuth] = useState(false);

    const [citys, setCitys] = useState([
        {
            value: "New York",
            label: "New York",
        }, {
            value: "Los Angeles",
            label: "Los Angeles",
        }, {
            value: "Miami",
            label: "Miami",
        },
    ]);

    function handleSubmit(e) {
        e.preventDefault()
        closeAuthAnimApi.start({
            from: { opacity: 1 },
            to: { opacity: 0 },
            onRest: (e) => {
                form.current.setAttribute('style', "display: none")
                setAuth(true)
                setIsLoaded(false)
            }
        })
    }

    useEffect(() => {
        setAuth(false)
        if (isLoaded == false) {
            let req = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0460243223e8e48d98b61638a08e5a5d`
            console.log(req)
            let weather = axios.get(req)
            weather.then((el) => {
                console.log(el)
                console.log(el.data)
                setTemp(String(Math.floor(el.data.main.temp - 273)) + "°C")
                setTempAbout("Feels like: " + String(Math.floor(el.data.main.feels_like - 273)) + "°C")
                setParams([...params, { title: el.data.weather[0].main, desc: el.data.weather[0].description }, { title: "Wind", desc: String(el.data.wind.speed) + " m/sec" }, { title: "Cloud cover", desc: String(el.data.clouds.all) + "%" }])
                setIsLoaded(true)
                setAuth(true)
            }).catch((el) => {
                console.log(el.response.status)
                setAuth(false)
            })
        }
    }, [auth]);

    return (
        <div className="App" style={{ background: "url('/background-day.jpg')", backgroundSize: "cover" }}>
            <animated.div className='authorization' ref={form} style={{ ...closeAuthAnim }}>
                <form method='POST' className='authorization__form' onSubmit={handleSubmit}>
                    <input type="text" name="city" placeholder='Your city' value={city} onChange={(e) => { setCity(e.target.value) }} className='authorization__input' />
                    <button type="submit" className='authorization__btn'>Submit</button>
                </form>
            </animated.div>
            <div className='authorize'>
                <div className='clockAndMoreItem'>
                    <Moment format='HH:mm' interval={1000} />
                </div>
                {isLoaded ?
                    <div className='mainWhether'>

                        <div className='mainWhether__item'>
                            <h2 className='mainWhether__item-header'>{temp}</h2>
                            <p className='mainWhether__item-about'>{tempAbout}</p>
                        </div>
                        {params.map((el, i) => {
                            return (
                                <div className='mainWhether__item' key={i}>
                                    <h2 className='mainWhether__item-header'>{el.title}</h2>
                                    <p className='mainWhether__item-about'>{el.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className='mainWhether'>
                        <div>
                            <SkeletonText noOfLines={1} spacing="4" skeletonHeight={"10"} style={{ marginBottom: "10px" }} className='mainWhether__item-header'>-25*</SkeletonText>
                            <SkeletonText noOfLines={4} spacing="4" skeletonHeight={"2"} className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </SkeletonText>
                        </div>
                        <div>
                            <SkeletonText noOfLines={1} spacing="4" skeletonHeight={"10"} style={{ marginBottom: "10px" }} className='mainWhether__item-header'>-25*</SkeletonText>
                            <SkeletonText noOfLines={4} spacing="4" skeletonHeight={"2"} className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </SkeletonText>
                        </div>
                        <div>
                            <SkeletonText noOfLines={1} spacing="4" skeletonHeight={"10"} style={{ marginBottom: "10px" }} className='mainWhether__item-header'>-25*</SkeletonText>
                            <SkeletonText noOfLines={4} spacing="4" skeletonHeight={"2"} className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </SkeletonText>
                        </div>
                        <div>
                            <SkeletonText noOfLines={1} spacing="4" skeletonHeight={"10"} style={{ marginBottom: "10px" }} className='mainWhether__item-header'>-25*</SkeletonText>
                            <SkeletonText noOfLines={4} spacing="4" skeletonHeight={"2"} className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </SkeletonText>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
