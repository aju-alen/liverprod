import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest";

const GigCard = ({ item }) => {

  const { isLoading, error, data,refetch } = useQuery({
    queryKey: ['gigUser'],
    queryFn:async  () => {
      const resp = await newRequst.get(`users/${item.userId}`)
      return resp.data
    }
  })
  return (
    <Link to={`/gig/${item._id}`} id={item._id} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading?'Loading please wait ' : error ? 'Something went wrong, check console log' :(<div className="user">
            <img src={data.img} alt="" />
            <span>{data.username}</span>
          </div>)}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(item.totalStars / item.StarNumber) && (Math.round(item.totalStars / item.StarNumber)) }</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
