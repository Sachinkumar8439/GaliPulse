import React, { useState } from "react";
import helper from "../helpers/helper";
import apiRequest from "../API/api";
import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./common/loading";
import ItemDATA from "../Data/Items";




const ItemForm = () => {
  const navigate = useNavigate();
  const [tags,settags] = useState(ItemDATA.products || null)
  const [isloading,setisloading] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    name: "",
    location: {
      latitude:null,
      longitude:null,
    },
    price:'',
    description: "",
    tag:"",
  });

  const [submittedData, setSubmittedData] = useState(null);

  

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setisloading(true);
    const location = await helper.getCurrentLocation();
    // console.log("location is ", location);
    const submitingdata = itemDetails;
    if(!location)
    {
      alert('location not found');
      
    }
    else
    {
      submitingdata.location = location.location;
      console.log('subkmiting fata', submitingdata);
      const response = await apiRequest('post','/add-item',submitingdata);
      console.log("response is ",response);
      localStorage.setItem('user',JSON.stringify(response.data));

    }
    setisloading(false);
    
  
    // console.log('data is ', itemDetails);
   
  };

  return (
    <div className="bg-gray-900 text-black min-h-screen flex items-center justify-center p-4">
      <div onClick={() =>{navigate("/Dashboard")}}><TiArrowLeftThick/></div>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemDetails.name}
              onChange={(e)=> setItemDetails({...itemDetails,name:e.target.value})}
              className="w-full p-2 bg-richblue-25 rounded   focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Category
            </label>
           <input value={setItemDetails.tag} onChange={(e)=> setItemDetails({...itemDetails,tag:e.target.value})} list="tags" type="text" id="tag" />
           <datalist id="tags"> 
            {tags.map((tag,index)=>(<option value={tag.name} key={tag.id}> </option>))}
           </datalist>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              description
            </label>
            <textarea
              rows={5}
              // cols={}
              id="name"
              name="name"
              value={itemDetails.description}
              onChange={(e)=> setItemDetails({...itemDetails,description:e.target.value})}
              className="w-full p-2 bg-richblue-25 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price in rupee
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={itemDetails.price}
              onChange={(e)=> setItemDetails({...itemDetails,price:e.target.value})}
              className="w-full p-2 bg-richblue-25 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isloading? <LoadingSpinner/>:  <button
            type="submit"
            className="bg-yellow-50 w-full  text-black text-center px-[129px] py-[8px] rounded   hover:scale-95"
          >
            Submit
            
          </button>} 
         
        </form>
      </div>
    </div>
  );
};

export default ItemForm;