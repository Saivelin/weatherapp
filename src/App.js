import './index.scss';
import './main.scss';
import './media.scss';
import React, { useState, useRef, useEffect } from 'react';
import Moment from 'react-moment';
import { animated, useSpring } from '@react-spring/web'
import Select from 'react-select'
import axios from 'axios';

function App() {

    const [closeAuthAnim, closeAuthAnimApi] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 }
    }))

    var form = useRef();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

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
            }
        })
    }

    useEffect(() => {
        let response = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0460243223e8e48d98b61638a08e5a5d`)
        console.log(response)
    }, [auth]);

    return (
        <div className="App" style={{ background: "url('/background-day.jpg')", backgroundSize: "cover" }}>
            <animated.div className='authorization' ref={form} style={{ ...closeAuthAnim }}>
                <form method='POST' className='authorization__form' onSubmit={handleSubmit}>
                    <input type="text" name="city" placeholder='Your city' value={city} onChange={(e) => { setCity(e.target.value) }} className='authorization__input' />
                    <input type="text" name="country" placeholder='Your country' value={country} onChange={(e) => { setCountry(e.target.value) }} className='authorization__input' />
                    {/* <Select className='' options={citys} styles={{ backgroundColor: "black", }} /> */}
                    {/* <select className='authorization__select' >
                        {citys.map((el) => {
                            return <option value={el.value}>{el.label}</option>
                        })}
                    </select> */}
                    <button type="submit" className='authorization__btn'>Submit</button>
                </form>
            </animated.div>
            <div className='authorize'>
                <div className='clockAndMoreItem'>
                    <Moment format='HH:mm' interval={1000} />
                </div>
                <div className='mainWhether'>
                    <div className='mainWhether__item'>
                        <h2 className='mainWhether__item-header'>-25*</h2>
                        <p className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
                    </div>
                    <div className='mainWhether__item'>
                        <h2 className='mainWhether__item-header'>-25*</h2>
                        <p className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
                    </div>
                    <div className='mainWhether__item'>
                        <h2 className='mainWhether__item-header'>-25*</h2>
                        <p className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
                    </div>
                    <div className='mainWhether__item'>
                        <h2 className='mainWhether__item-header'>-25*</h2>
                        <p className='mainWhether__item-about'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
