import React from 'react'
import { newRequst } from '../../utils/newRequest'
import { useQuery } from "@tanstack/react-query";

import './Review.scss'

const Review = ({review}) => {
  const { isLoading, error, data } = useQuery({
    
    queryKey: [review.userId],
    queryFn: async () => {
        const resp = await newRequst.get(`users/${review.userId}`)
        return resp.data
    }
    
})

  return (
    <div className="review">
      {isLoading? 'Loading':error?"check log for error": <div className="user">
        <img
          className="pp"
          src={data.img || 'Noimg'}
          alt=""
        />
        <div className="info">
          <span>{data.username}</span>
          <div className="country">
            <img
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
              alt=""
            />
            <span>{data.country}</span>
          </div>
        </div>
      </div>}
      {!isNaN(review.star) &&
        <div className="stars">
        {Array(review.star).fill().map((stars,i)=>(
          <img src="/img/star.png" alt="" key={i}/>
        ))
        }
          <span> {review.star} </span>
        </div>
        }
      <p>
       {review.desc}
      </p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  )
}

export default Review