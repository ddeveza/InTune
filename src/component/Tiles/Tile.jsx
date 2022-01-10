import React from 'react'
import './Tile.css'

const Tile = () => {
    return (
        <div className='tile'>
            <div className="first__column">
                {/* iconcircle */}
                <p>Total Devices: 5</p>
                <p>Dormant Devices: 5</p>
                <p>Last Log in: 6-Jan-2021</p>
            </div>
            <div className="second_column">
                <p>Total Devices: 5</p>
                <p>Dormant Devices: 5</p>
                <p>Last Log in: 6-Jan-2021</p>

            </div>
        </div>
    )
}

export default Tile
