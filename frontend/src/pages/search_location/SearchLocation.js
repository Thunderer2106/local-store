import React, { useEffect, useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";


const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

export default function SearchBox(props) {
    const { latitude, setLatitude, longitude, setLongitude } = props;
    const [selectPosition, setSelectPosition] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);

     // Get the user's current location
     const getCurrentLocation=() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("got location")
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              setSearchText("Set to Current Location")
            },
            (error) => {
              console.error('Error getting current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser');
        }
    };


    //clear search
    const clearText=()=>{
        setSearchText('');
        setLatitude('');
        setLongitude('');
    }



    return (
        <div className='flex flex-col' >
            <div className='flex items-center '>
                <div>
                    <input
                        className="w-[100%] border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"

                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>
                

                <div
                    className=" "
                >

                
                    <button
                    className="text-white focus:ring-4 focus:outline-none focus:ring-pink-200 bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mx-2"
                    
                    
                        onClick={() => {
                            const params = {
                                q: searchText,
                                format: "json",
                                addressdetails: 1,
                            };
                            const queryString = new URLSearchParams(params).toString();
                            const requestOptions = {
                                method: "GET",
                                redirect: "follow",
                            };
                            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    console.log(JSON.parse(result));
                                    setListPlace(JSON.parse(result));
                                })
                                .catch((err) => console.log("err: ", err));
                        }}
                    >
                        Search
                    </button>
                </div>


                <div
                    className="justify-center items-center mx-2"
                >

                    <button className="inline-flex items-center px-6 py-1 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"  onClick={clearText}>Clear</button>

                </div>
                <button className="text-[12px] flex items-center justify-center h-12 py-3 px-3 font-medium   text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none" variant="contained" onClick={getCurrentLocation}>Current Location</button>

            </div>
            <div className={` ${listPlace.length==0?'hidden':''} h-64 overflow-y-auto`}>
                <List component="nav" aria-label="main mailbox folders">
                    {listPlace.map((item) => {
                        return (
                            <div key={item?.place_id}>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                        setLatitude(item.lat);
                                        setLongitude(item.lon);
                                        setSearchText(item.display_name);
                                        console.log(selectPosition);
                                        setListPlace([])
                                    }}
                                >
                                    <ListItemIcon>
                                        <img
                                            src='/images/pin.png'
                                            alt="Placeholder"

                                            style={{ width: 38, height: 38 }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </div>
        </div>
    );
}
