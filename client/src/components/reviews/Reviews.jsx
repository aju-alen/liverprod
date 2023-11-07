import React from 'react'
import './Reviews.scss'
import Review from '../review/Review'
import { newRequst } from '../../utils/newRequest'
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";


const Reviews = ({ gigId }) => {
    const queryClient=useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const resp = await newRequst.get(`reviews/${gigId}`)
            return resp.data
        }
    })

    const mutation = useMutation({
        mutationFn: (review) => {
          return newRequst.post(`reviews/${gigId}`, review)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["review"])
        }

      })

    const handleSubmit = (e)=>{
        e.preventDefault()
        const desc= e.target[0].value
        const star= e.target[1].value
        mutation.mutate({desc,star})
    }
    return (<>
        {isLoading ? "Loading" : error ? "Check consolelog " : (<div className="reviews">
            <h2>Reviews</h2>
            {isLoading ? "Loading" : error ? " There is an error check log" : data.map(review => (
                <Review review={review} key={review._id} />
            ))}
            <div className="add">
                <h3>Add review</h3>
                <form onSubmit={handleSubmit} className='addForm'>
                    <input type="text" placeholder='Write your review' />
                    <select name='' id=''>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                <button>Send</button>
                </form>
            </div>
        </div>)}
    </>
    )
}

export default Reviews