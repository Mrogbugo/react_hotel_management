
import React from "react";
import RoomList from './RoomList';
import RoomFilter from './RoomFilter'
import { withRoomConsumer } from "../context";
import Loading from './Loading';


function RoomsContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading)
        return <Loading />;
    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

export default withRoomConsumer(RoomsContainer)







// import React from "react";
// import RoomList from './RoomList';
// import RoomFilter from './RoomFilter'
// import { RoomConsumer } from "../context";
// import Loading from './Loading'

// function RoomsContainer() {
//     <RoomConsumer>
//         {
//             (value) => {

//                 console.log("Value::", value);

//                 const { loading, sortedRooms, rooms } = value
//                 if (loading) return <loading />;
//                 return (
//                     <div>
//                         Hello From Rooms Conatiner
//                         <RoomFilter rooms={rooms} />
//                         <RoomList rooms={sortedRooms} />
//                     </div>
//                 );
//             }
//         }
//     </RoomConsumer>

// }

// export default RoomsContainer;