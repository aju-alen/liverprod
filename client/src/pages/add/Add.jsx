import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import {upload} from '../../utils/upload'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequst } from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Add = () => {
const navigate = useNavigate()

  const [singleFile, setSingleFile] = useState(undefined)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

  console.log(state);

  const handleChange = (e) => {
    dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value } })
  }

  const handleFeature = (e) => {
    e.preventDefault()
    dispatch({ type: "ADD_FEATURE", payload: e.target[0].value, })
    e.target[0].value = ''
  }

  const handleUpload = async (e) => {
    setUploading(prev => !prev)
    console.log(e);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all([...files].map(async file => {
        const url = await upload(file)
        return url
      }))
      setUploading(prev => !prev)
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } })
    } catch (err) {
      console.log(err)
      setUploading(prev=>!prev)
    }
    console.log(state);
  }

  const queryClient=useQueryClient()

  const mutation = useMutation({
      mutationFn: (gig) => {
        return newRequst.post(`gigs`, gig)
      },
      onSuccess:()=>{
          queryClient.invalidateQueries(["myGigs"])
      }

    })





  const handleSubmit=(e)=>{
    e.preventDefault()
    mutation.mutate(state);
    navigate('/mygigs')

  }
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={e => setSingleFile(e.target.files[0])} />

                <label htmlFor="">Upload Images</label>
                <input type="file" multiple onChange={e => setFiles(e.target.files)} />

              </div>
              {uploading && <button disabled={true} >Uploading, please wait</button>}
              {!uploading && <button onClick={handleUpload}>Upload</button>}
            </div>

            <label htmlFor="">Description</label>
            <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16" onChange={handleChange}></textarea>
            <button onClick={handleSubmit}> Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input name="shortTitle" type="text" placeholder="e.g. One-page web design" onChange={handleChange} />

            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" id="" placeholder="Short description of your service" cols="30" rows="10" onChange={handleChange}></textarea>

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input name="deliveryTime" type="number" onChange={handleChange} />

            <label htmlFor="">Revision Number</label>
            <input name="revisionNumber" type="number" onChange={handleChange} />

            <label htmlFor="">Add Features</label>
            <form onSubmit={handleFeature} className="add">

              <input type="text" placeholder="e.g. page design" />
              <button>add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f)=>(<div className="item" key={f}>
                <button onClick={()=>(dispatch({type:"REMOVE_FEATURE",payload:f}))}>{f}
                  <span>x</span>
                </button>
              </div>))}
            </div>

            <label htmlFor="">Price</label>
            <input name="price" type="number" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
