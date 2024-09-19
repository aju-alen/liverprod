import React from "react";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";


function Gig() {
  const { id } = useParams()


  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: async () => {
      const resp = await newRequst.get(`gigs/single/${id}`)
      return resp.data.gig
    }
  })

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if(data){
        const resp = await newRequst.get(`users/${data?.userId}`)
        return resp.data
      }
    },
    enabled: !!data
  })
  return (isLoading ? "Loading, please wait" : error ? "Error occoured, please check console log" :
    (<div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">{`Liverr > Graphics & Design >`}</span>
          <h1>{data.title}</h1>
          {isLoadingUser ? "Loading" : errorUser ? "Error check console log" : (<div className="user">
            <img
              className="pp"
              src={data.cover}
              alt=""
            />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) &&
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                  <img src="/img/star.png" alt="" key={i} />
                ))}
                <span> {(Math.round(data.totalStars / data.starNumber))} </span>
              </div>
            }
          </div>)}
            {data.images.map(image => (<img key={image} src={image} alt="" />))}
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>
          {isLoadingUser ? "Loading" : errorUser ? "Error check console log" : (<div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser.img}
                alt=""
              />
              <div className="info">
                <span>{dataUser.username}</span>

                {!isNaN(data.totalStars / data.starNumber) &&
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                    <span> {(Math.round(data.totalStars / data.starNumber))} </span>
                  </div>
                }
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{data.deliveryTime} hours</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">{data.desc}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                My name is Anna, I enjoy creating AI generated art in my spare
                time. I have a lot of experience using the AI program and that
                means I know what to prompt the AI with to get a great and
                incredibly detailed result.
              </p>
            </div>
          </div>)}
          <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
            {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map(feature => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>

            ))}

          </div>
          <Link to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>)
  );
}

export default Gig;
