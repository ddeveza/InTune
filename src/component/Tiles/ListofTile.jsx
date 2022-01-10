import React from 'react'
import Tile from './Tile';
import './ListofTile.css';

const ListofTile = () => {
    
   // let arrayTiles = [`Tile1` , `Tile2`,`Tile3`];

   /*  const Tiles = ()=> {
        return arrayTiles.map(tile => {
            return <Tile/>
        })
    } */

    const Tiles = ()=> {
        
            return <Tile/>
    }

    return (
        <div className='tiles__container'>
            {/* <Tiles/> */}
            <Tile/>
            <Tile/>
            <Tile/>
            <Tile/>
        </div>
    )
}

export default ListofTile;
