import React from 'react'
import Card from '../petCard/Card'
import './featuredPets.css'

export default function FeaturedPets(props) {

    const {featuredData} = props;

  return (
    <>
        <div className="featuredSection">
            <div className="Container">
                <div className="featuredHeader">
                    <h3>Featured Pets </h3>
                </div>
                <div className="petFeaturedLink">
                    <a href="/">See All Featured Pets</a>
                </div>
                
                <div className="content">
                    {featuredData.map((item) => {
                        return (
                            <Card
                                key={item._id}
                                data={item}
                            />
                        )
                    })}
                </div>
            </div>
        </div>

    </>
  )
}
