import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import { useParams } from 'react-router-dom';
import StyledHero from '../components/StyledHero';

class SingleRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slug: props.params.slug, // Use params from props
            defaultBcg,
        };
    }

    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context; // Correct usage of context
        const room = getRoom(this.state.slug);
        console.log('room::', room);

        if (!room) {
            return (
                <Hero>
                    <Banner title="No room found">
                        <Link to="/rooms" className="btn-primary">
                            Back to Rooms
                        </Link>
                    </Banner>
                </Hero>
            );
        }

        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room
        const [mainImg, ...defaultImg] = images;
        console.log(defaultImg);


        return (
            <>
                < StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${room.name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            Back to Rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className='single-room'>
                    <div className='single-room-images'>
                        {defaultImg.map((item, index) => {
                            return <img key={index} src={item} alt={name} />
                        })}

                    </div>
                    <div className='single-room-info'>
                        <article className='desc'>
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className='info'>
                            <h6>info</h6>
                            <p> price :${price}</p>
                            <p> size :${size} SQFT</p>
                            <h6>max capacity : {
                                capacity > 1 ? `${capacity} people` : `${capacity} person`
                            }</h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className='room-extras'>
                    <h6>extras</h6>
                    <ul className='extras'>
                        {extras.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                </section>
            </>
        );
    }
}

// Higher-order component to inject params into SingleRoom
export default function WrappedSingleRoom(props) {
    const params = useParams();
    return <SingleRoom {...props} params={params} />;
}
