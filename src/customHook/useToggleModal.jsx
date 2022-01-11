import {useState } from 'react'

export const useToggleModal = (initialVal) => {

    const [toggle, setToggle] = useState(initialVal)
    const handleToggle = ()=>{
        setToggle(prev => !prev)
    }



    return [toggle, handleToggle];
}

