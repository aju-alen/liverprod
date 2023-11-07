import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest.js";

const Orders = () => {
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  console.log(currentUser);
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const resp = await newRequst.get(`orders`)
      return resp.data
    }
  })

  const handleContact= async(order)=>{
    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId
try{
  const res = await newRequst.get(`conversations/single/${id}`)
  navigate(`/message/${res.data.id}`)
}
catch(err){
  console.log("err",err.response.status);
  if(err.response.status === 404){
    const res = await newRequst.post(`conversations`,{
      to:currentUser.isSeller? buyerId : sellerId
    })
    navigate(`/message/${res.data.id}`)
  }
  console.log('123');
}
  }

  return (
    <div className="orders">
      {isLoading ? "Loading" : error ? "Error check log" : <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
            <th>Contact</th>
          </tr>

          {data.map((order) => (
            <tr key={order._id}>
              <td>
                <img
                  className="image"
                  src={order.img}
                  alt=""
                />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td>Maria Anders</td>
              <td>
                <img className="message" src="./img/message.png" alt="" onClick={()=>handleContact(order)} />
              </td>
              
            </tr>
          ))}

        </table>
      </div>}
    </div>
  );
};

export default Orders;
