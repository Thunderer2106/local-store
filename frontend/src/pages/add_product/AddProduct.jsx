import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { addproduct } from "../../features/product/productSlice";
import SearchBox from "../search_location/SearchLocation";

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    // maxDistance: null,
};

const AddProduct = () => {
    const dispatch = useDispatch(); 
    // const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);

    const { isLoading } = useSelector(
        (state) => state.auth
    )

    const [postImage, setPostImage] = useState("")

    const { name, category, price, quantity, description,  } = product;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setPostImage(base64)

    };



    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("quantity", Number(quantity));
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", postImage);
        formData.append("longitude", longitude);
        formData.append('latitude', latitude);
        formData.append('maxDistance', Number(maxDistance));

        console.log(...formData);

        await dispatch(addproduct(formData));

    };

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [maxDistance,setMax]=useState();

    // useEffect(() => {
    //     // Get the user's current location
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log("got location")
    //           setLatitude(position.coords.latitude);
    //           setLongitude(position.coords.longitude);
    //         },
    //         (error) => {
    //           console.error('Error getting current location:', error);
    //         }
    //       );
    //     } else {
    //       console.error('Geolocation is not supported by this browser');
    //     }
    //   }, []);

    return (
        <div>
            <div className='items-center justify-center flex h-screen'>
                <div className='w-screen'>
                    <section className='text-center mb-4'>
                        <p className='text-[24px] nun-font-700'>Add New Product</p>
                    </section>
                    <section className='text-center'>
                        <form onSubmit={saveProduct}>

                            <div className=''>
                                <input
                                    type='text'
                                    className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[10px] outline-none'
                                    id='name'
                                    name='name'
                                    value={product?.name}
                                    placeholder='Enter product name'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className=''>
                                <input
                                    type='category'
                                    className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[10px] outline-none'
                                    id='category'
                                    name='category'
                                    value={product?.category}
                                    placeholder='Enter product category'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className=''>
                                <input
                                    type='price'
                                    className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[10px] outline-none'
                                    id='price'
                                    name='price'
                                    value={product?.price}
                                    placeholder='Enter product price'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className=''>
                                <input
                                    type='quantity'
                                    className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[10px] outline-none'
                                    id='quantity'
                                    name='quantity'
                                    value={product?.quantity}
                                    placeholder='Enter quantity'
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className=''>
                                <textarea
                                    className="border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[10px] outline-none"
                                    placeholder="Enter description"
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </div>


                            <div className="mb-10">
                                <input
                                    lable="image"
                                    type="file"
                                    name="image"
                                    onChange={(e) => handleImageChange(e)}
                                />


                            </div>
                            <div className="mx-[200px] ">
                                <SearchBox latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
                                <p className=''>Latitude: {latitude}</p>
                                <p className=''>Longitude: {longitude}</p>
                            </div>
                            <div className=''>
                                <input className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[20%] px-4 py-2.5 mb-[10px] outline-none '
                                    type="Number"
                                    value={maxDistance}
                                    onChange={(e)=>setMax(e.target.value)}
                                    placeholder="Max Range(m)" />
                            </div>

                            <div className='m-2'>
                                <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl w-fit bg p-[10px] rounded-full nun-font-600 '>
                                    Add product
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            {isLoading && <Spinner />}
        </div>
    );
};

export default AddProduct;

//convrt image to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}