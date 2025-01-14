import React, { useContext } from "react";
import { RoomContext } from "../context";
import Title from "../components/Title";

// Get all unique values  
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

function RoomFilter({ rooms }) {
    const context = useContext(RoomContext);
    console.log(context);

    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    // Get unique types
    let types = getUnique(rooms, 'type');
    // Add 'all' to the types array
    const allTypes = ['all', ...types];
    // Map to JSX 
    const typeOptions = allTypes.map((item, index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        );
    });

    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* Select type */}
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {typeOptions}
                    </select>
                </div>
                {/* End select type */}
                {/* guests  */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* End Guest */}

                {/* {room price} */}
                <div className="form-group">
                    <label htmlFor="price">
                        Room Price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price"
                        value={price} onChange={handleChange} className="form-control">
                    </input>
                </div>
                {/* {end room price} */}

                {/* {size} */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minsize" id="size" value={minSize}
                            onChange={handleChange} className="size-input"></input>

                        <input type="number" name="maxsize" id="size" value={maxSize}
                            onChange={handleChange} className="size-input"></input>
                    </div>
                </div>
                {/* {end of size} */}
                {/* {extras} */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast}
                            onChange={handleChange}></input>
                        <label htmlFor="breakfast">Break Fast</label>
                    </div>

                    {/* {pets} */}

                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets}
                            onChange={handleChange}></input>
                        <label htmlFor="breakfast">Pets</label>
                    </div>

                </div>
                {/* { end odextras} */}


            </form>
        </section>
    );
}

export default RoomFilter;
