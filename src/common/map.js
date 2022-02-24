import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './style.css';

const Map = (props) => {
  const { empId, userData } = props;
  const [showInfo, setShowInfo] = useState(false);
  let name, department, designation = '';
  let centerLocation = {};
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBnsC7KzPrUv1d7K35_KVmHGUasIF6k2Rs",
  });
  const userImg = userData.map(val => val.emp_photo_path);
  const image = userData && userImg[0];
  userData.forEach(val => {
    name = val.emp_name;
    department = val.emp_department;
    designation = val.emp_designation;
    centerLocation = val.emp_location;
  })

  let iconMarker = window.google && window.google.maps && new window.google.maps.MarkerImage(
    image,
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new window.google.maps.Size(50, 50)
  );

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "500px",
            height: "500px",
            position: "inherit !important",
          }}
          center={centerLocation}
          zoom={16}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker
            key={empId}
            position={centerLocation}
            icon={iconMarker}
            onMouseOver={()=>setShowInfo(true)}
            onMouseOut={()=>setShowInfo(false)}
          >
            {
              showInfo && <InfoWindow
              position={centerLocation}
              >
                <div>
                  <b className="infoWindowPara"> {name} </b>
                  <p className="infoWindowPara"> {department} </p>
                  <p className="infoWindowPara"> {designation} </p>
                </div>
              </InfoWindow>
            }
          </Marker>
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
