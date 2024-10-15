import React, { useState } from "react";
import SearchBox from "../search_location/SearchLocation";
import { addproduct } from "../../features/product/productSlice";
import { useDispatch } from "react-redux";


const ProductForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    quantityStock: "",
    sellingPrice: "",
    description: "",
    images: "",
    maxDistance:"",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  const dispatch=useDispatch();

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  // Validation rules
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate product name
    if (formData.productName.trim() === "") {
      newErrors.productName = "Product name is required";
      valid = false;
    }

    // Validate product category
    if (formData.productCategory.trim() === "") {
      newErrors.productCategory = "Product category is required";
      valid = false;
    }

    // Validate quantity stock
    if (isNaN(formData.quantityStock) || formData.quantityStock <= 0) {
      newErrors.quantityStock = "Quantity stock must be a positive number";
      valid = false;
    }

    // Validate selling price
    if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
      newErrors.sellingPrice = "Selling price must be a positive number";
      valid = false;
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Description is required";
      valid = false;
    }

    // Validate image
    // if (!formData.image) {
    //   newErrors.image = 'Image is required';
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  // Event handler for form submission
  const handleSubmit =async (e) => {
    e.preventDefault();

    // Validate the form
    if (validateForm()) {
      // Form is valid, update the submittedData state
      setSubmittedData(formData);
      const formToSubmit={...formData,'longitude':longitude,'latitude':latitude}
      console.log(formToSubmit);  
      await dispatch(addproduct(formToSubmit));
  
      // You can send the data to an API, update state, etc.
    } else {
      // Form is not valid, do something (e.g., display error messages)
      console.log("Form validation failed");
    }
  };
  const submit =async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      // Form is valid, update the submittedData state
      console.log("Form validation failed");

  
      // You can send the data to an API, update state, etc.
    } 
  };

  // Event handler for input changes
  const handleChange = async(e) => {
    const { name, value } = e.target;
    if(name==='images')
    {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFormData({ ...formData, [name]: base64 });

    }
    // setProduct({ ...product, [name]: value });
   else setFormData({ ...formData, [name]: value });

    // Update the form data
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: [...(prevData[name] || []), ...files],
    // }));

    // // Clear the associated error when the user starts typing
    // setErrors({
    //   ...errors,
    //   [name]: undefined,
    // });
  };

 
  return (
    <div className=" bg-gray-100">
      <p className="text-3xl font-bold mb-6 text-center mt-30">Product Form</p>
      <form
        onSubmit={submit}
        className="h-screen flex items-center justify-center mx-auto"
      >
    <div className="w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-md m-4 py-3">
          <div className="col-span-1 mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font font-medium text-gray-600"
            ></label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none  bg-slate-200 "
            />
            {errors.productName && (
              <p className={`error text-red-500`}>{errors.productName}</p>
            )}
          </div>

          <div className="col-span-1 mb-4">
            <label
              htmlFor="productCategory"
              className="block text-sm font font-medium text-gray-600"
            ></label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              placeholder="Select Product Category"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none  bg-slate-200"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              {/* Add more options as needed */}
            </select>
            {errors.productCategory && (
              <p className={`error text-red-500`}>{errors.productCategory}</p>
            )}
          </div>

          <div className="col-span-1 mb-4">
            <label
              htmlFor="quantityStock"
              className="block text-sm font font-medium text-gray-600"
            ></label>
            <input
              type="number"
              id="quantityStock"
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              placeholder="Quantity Stock"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none  bg-slate-200"
            />
            {errors.quantityStock && (
              <p className={`error text-red-500`}>{errors.quantityStock}</p>
            )}
          </div>

          <div className="col-span-1 mb-4">
            <label htmlFor="sellingPrice"></label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="Selling price"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none  bg-slate-200"
            />
            {errors.sellingPrice && (
              <p className={`error text-red-500`}>{errors.sellingPrice}</p>
            )}
          </div>
          <div className="col-span-1 mb-4">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none bg-slate-200"
            />
            {errors.description && (
              <p className={`error text-red-500`}>{errors.description}</p>
            )}
          </div> 
          <div className="col-span-1 mb-7"> 
          <SearchBox latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />

          </div>
 

          <div className="col-span-1 mb-7">
            <label
              htmlFor="maxDistance"
              className="block text-sm font font-medium text-gray-600"
            ></label>
            <input
              type="number"
              id="maxDistance"
              name="maxDistance"
              value={formData.maxDistance}
              onChange={handleChange}
              placeholder="Max Distance"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none  bg-slate-200"
            />
           
          </div>
        </div>
        <div className="h-[80vh] w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-md ">
          <div className="col-span-full mb-4">
            <label
              htmlFor="Image-upload"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image Upload
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  ... (SVG path data)
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                   {formData.images.length===0&& <span>Upload a file</span>}
                   {formData.images.length!==0&& <span>Uploaded</span>}
                    <input
                      id="image-upload"
                      name="images" // Ensure that the input name is "image"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleChange}
                    />
                   
                  </label>
                  {formData.images.length===0&&  <p className="pl-1">or drag and drop</p>}
                </div>

                {formData.images.length===0&& <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>}
              </div>
            </div>
            {errors.image && (
              <p className={`error text-red-500`}>{errors.image}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-500 text-white rounded-md absolute top-10 right-20 mt-4"
          >
            Submit
          </button>
        </div>
      </form>

     
    </div>
  );
};

export default ProductForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
