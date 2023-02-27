import './index.css';
import React from 'react';
import Moment from 'react-moment';

function App() {
    return (
        <div className="App" style={{ background: "url('/background-day.jpg')", backgroundSize: "cover" }}>
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
    );
}

export default App;
