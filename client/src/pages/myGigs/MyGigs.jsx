import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  console.log(currentUser);

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: async () => {
      const resp = await newRequst.get(`gigs?userId=${currentUser._id}`)
      return resp.data
    }
  })
  console.log(data);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequst.delete(`gigs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"])
    }

  })
  const handleDelete = (id) => {
    mutation.mutate(id)
   }
  return (
    <div className="myGigs">
      {isLoading?"Loading" : error ? "Check console" :( <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
         { data.map(gig=>(<tr key={gig._id}>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>{gig.title}</td>
            <td>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
              <img className="delete" src="./img/delete.png" alt="" onClick={()=>handleDelete(gig._id)} />
            </td>
          </tr>)) }

        </table>
      </div>)}
    </div>
  );
}

export default MyGigs;
