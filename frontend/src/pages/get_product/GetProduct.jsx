// import React, { useState, useEffect } from 'react';
// import { getproduct } from '../../features/product/productSlice';
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from '../../components/Spinner';
// import SearchBox from '../search_location/SearchLocation';
// import OutlinedInput from "@material-ui/core/OutlinedInput";






// const GetProducts = () => {
//     const dispatch = useDispatch();

//     const { products, isLoading } = useSelector(
//         (state) => state.product
//     );



//     const [latitude, setLatitude] = useState('');
//     const [longitude, setLongitude] = useState('');
//     const [maxDistance, setMaxDistance] = useState(null);
//     const [productsList, setProductslist] = useState([]);
//     const [searchText, setSearchText] = useState('');



//     useEffect(() => {

//         setProductslist(products);

//     }, [products]);



//     //set max distance
//     const handleDistanceChange = (event) => {
//         setMaxDistance(event.target.value);

//     };


//     //send get request 
//     const getProducts = async (e) => {
//         e.preventDefault();
//         if (longitude.length !== 0 || latitude.length !== 0 || searchText.length !== 0) {
//             const coordinates = [longitude, latitude, maxDistance, searchText];
//             await dispatch(getproduct(coordinates));
//         }

//     };



//     return (

//         <div className='items-center justify-center flex my-20'>
//             {isLoading && <Spinner />}

//             <div className='w-screen mx-2'>
//                 <p className=''>Latitude: {latitude}</p>
//                 <p className=''>Longitude: {longitude}</p>
//                 <section className='my-2'>

//                     <SearchBox latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
//                 </section>
//                 <div className='mx-2 my-2 top-0 right-0'>
//                     <input className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[20%] px-4 py-2.5 mb-[10px] outline-none '
//                         type="Number"
//                         value={maxDistance}
//                         onChange={handleDistanceChange}
//                         placeholder="Dist(m)" />
//                     <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl w-fit bg p-[10px] rounded-full nun-font-600 mx-2'
//                         onClick={getProducts}>Get Products</button>
//                 </div>
//                 <div className='mx-2 my-2 top-0 right-0'>
//                     <OutlinedInput
//                         className="w-[50%]"
//                         placeholder='Enter item '
//                         value={searchText}
//                         onChange={(event) => {
//                             setSearchText(event.target.value);
//                         }}
//                     />
//                     <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl w-fit bg p-[10px] rounded-full nun-font-600 mx-2'
//                         onClick={getProducts}>Search</button>
//                     <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl w-fit bg p-[10px] rounded-full nun-font-600 mx-2'
//                         onClick={() => { setSearchText('') }}>clear</button>
//                 </div>
//             </div>
//             <div className='w-[50%]'>
//                 {productsList.length === 0 ? <div>no items</div> : <ul>{
//                     productsList.map((item, index) => (
//                         <li key={index}>
//                             {item.name}
//                         </li>
//                     ))

//                 }</ul>}
//             </div>


//         </div>
//     );
// };

// export default GetProducts;
