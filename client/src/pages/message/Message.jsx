import React from "react";
import { Link, useParams } from "react-router-dom";
import { newRequst } from "../../utils/newRequest";
import { useQueryClient,useQuery,useMutation } from "@tanstack/react-query";
import "./Message.scss";

const Message = () => {

  const {id} = useParams()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient=useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn:async  () => {
      const resp = await newRequst.get(`messages/${id}`)
      return resp.data
    }
  })

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequst.post(`messages`,message)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(["messages"])
    }

  })

  const handleSubmit=(event)=>{
    event.preventDefault()
    mutation.mutate({
      conversationId:id,
      desc:event.target[0].value
    })
  }
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link>  John Doe 
        </span>
       {isLoading?"Loading" : error ? "Check Console" : (<div className="messages">
         {data.map(message=>
          (<div className={(message.userId === currentUser._id)? "owner item" : 'item'} key={message._id}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
             {message.desc}
            </p>
          </div>))}
        </div>)}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
