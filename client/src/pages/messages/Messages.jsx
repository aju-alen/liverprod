import React from "react";
import { Link } from "react-router-dom";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest";
import moment from 'moment'
import "./Messages.scss";

const Messages = () => {
  const currentUser = localStorage.getItem("currentUser")
  const queryClient=useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn:async  () => {
      const resp = await newRequst.get(`conversations`)
      return resp.data
    }
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequst.put(`conversations/${id}`)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(["conversations"])
    }

  })

  const handleRead=(id)=>{
    mutation.mutate(id)
  }

  return (
    <div className="messages">
     {isLoading ? 'Loading' : error?"Check console" : (<div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map(convo=>(

            <tr className={(currentUser.isSeller && !convo.readBySeller) || (!currentUser.isBuyer && !convo.readByBuyer) && "active"} key={convo.id}>
              <td>{currentUser.isSeller? convo.buyerId :convo.sellerId }</td>
              <td>
                <Link to={`/message/${convo.id}`} className="link">
                  {convo.lastMessage ? convo.lastMessage.substring(0, 100):'Start new chat'}...
                </Link>
              </td>
              <td>{moment(convo.updatedAt).fromNow()}</td>
              <td>
                {(currentUser.isSeller && !convo.readBySeller) || (!currentUser.isSeller && !convo.readByBuyer) && (<button onClick={()=>handleRead(convo.id)}>Mark as Read</button>)}
              </td>
            </tr>
          ))}
         
        </table>
      </div>)}
    </div>
  );
};

export default Messages;
