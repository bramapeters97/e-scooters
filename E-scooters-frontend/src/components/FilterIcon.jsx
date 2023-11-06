import FilterImage from '../resources/filtericon.svg';
import React from 'react'


const FilterIcon = ({toggleElem, setToggleElem}) => {
    return (
        <div className="relative h-[4.5rem] w-full">
          <div className="absolute h-10 w-10 top-6 bg-gray-50 p-2 rounded-md right-2">
            <img 
                src={FilterImage} 
                alt='Filter Icon'
                color="white"
                onClick= {() => setToggleElem(!toggleElem) }
              />
          </div>
        </div>

    )
}

export default FilterIcon