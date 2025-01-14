import React from "react";
//import items from './data'
import { type } from "@testing-library/user-event/dist/type";
import Client from './Contentful'

// Client.getEntries({
//     content_type: "hotelResortRoom"
// })
//     .then(res => console.log("response::::", res.items));

//set-up Context-Api
const RoomContext = React.createContext();

// at this componement we now have access to two component 
// 1) the provider 
//2) the consumer  
class RoomProvider extends React.Component {

    constructor() {
        super()
        this.state = {
            rooms: [], sortedRooms: [], featuredRooms: [], loading: true, type: 'all', capacity: 1, price: 0, minPrice: 0,
            maxPrice: 0, minSize: 0, maxSize: 0, breakfast: false, pets: false
        };

    }
    // getData     
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "hotelResortRoom",
                order: 'sys.createdAt'
            });

            let rooms = this.formatData(response.items)
            console.log("API Response:", response.items);

            let featuredRooms = rooms.filter(room => room.featured === true);

            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize

            });


        } catch (error) {
            console.log("log me the debug if any:::", error);

        }
    }

    componentDidMount() {
        this.getData();


    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)

            let room = { ...item.fields, images, id };
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    };

    handleChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = e.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)

        console.log(`Type ${type}, Name : ${name}, Value: ${value}`);

    }

    filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state
        // all the rooms
        let tempRooms = [...rooms]
        // transform value  
        capacity = parseInt(capacity)
        price = parseInt(price)
        // filtering by type
        if (type !== 'all')
            tempRooms = tempRooms.filter(room => room.type === type)
        // filtering by capacity    
        if (capacity !== 1)
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        // filter by price 
        tempRooms = tempRooms.filter(room => room.price <= price);
        // filter By Size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        // Filter By BreakFast  
        if (breakfast)
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        //filter by pets 
        if (pets === true)
            tempRooms = tempRooms.filter(rooms => rooms.pets === true)
        // change state
        this.setState({
            sortedRooms: tempRooms
        })

    }
    render() {
        return (
            <React.Fragment>
                <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                    {this.props.children}
                </RoomContext.Provider>
            </React.Fragment>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {
                value => < Component{...props} context={value} />
            }
        </RoomConsumer>
    }
}
export { RoomProvider, RoomConsumer, RoomContext };