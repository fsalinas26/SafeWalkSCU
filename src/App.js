import config from "./config.json";
import React from "react";
import axios from "axios";
import "./styles.css";
import "./api";
import { 
  Image,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { get_walkers, request_walker,addRequest, wait } from "./api";


class Profile{
  component; 
  constructor(firstName,lastName,age,phoneNum,enRoute,photoLnk)
  {   
      this.component = 
      <Box marginBottom="3px"><Flex borderRadius="5px" textColor={"white"} backgroundColor={"#292929"} boxShadow={"5px 5px 5px black"}
        direction="row"
      >
        <Flex pr={4} pl={4} direction="column" justifyContent="center">
          <Image
            borderRadius="full"
            boxSize="100px"
            display="inline"
            src={photoLnk}
            alt={firstName}
          />
          <Text
            fontSize="xl"
            fontWeight="thin"
            textAlign="center"
            mt={1}
            display="inline"
          >
            {firstName}
          </Text>
        </Flex>
        <Flex direction="column" ml={5}>
          <Text fontSize="m" fontWeight="thin" mt={1} display="block">
            Age: {age}
          </Text>
          <Text fontSize="m" fontWeight="thin" mt={1} display="block">
            Time End
          </Text>
          <Text fontSize="m" fontWeight="thin" mt={1} display="block">
            {enRoute}
          </Text>
        </Flex>
      </Flex>
    </Box>
  }
}

function getComponent(firstName,lastName,age,phoneNum,enRoute,photoLnk)
{
  const component = new Profile(firstName,lastName,age,phoneNum,enRoute,photoLnk);
  return component.component;
}

var center = { lat: 37.3496, lng: -121.939 };


if (navigator.geolocation) { // if the browser supports geolocation
   navigator.geolocation.getCurrentPosition(position => { // get the current position
    center.lat = position.coords.latitude 
    center.lng = position.coords.longitude
  })
} else {
    alert("Geolocation is not supported by this browser.")
}
var component; 

function App() {
  get_walkers().then(function (data) {
    component = data.walkers;
  });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: config.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ null);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }
  async function calculateRoute() {
    // originRef.current.value = center;
    // destiantionRef.current.value = {lat:37.3541,lng:-121.9552};
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    const santa_clara_coords = {lat:37.3541,lng:-121.9552};
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,// originRef.current.value,
      destination: santa_clara_coords,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  } 
  
  /* function boxes() {
    console.log(document.getElementById("newbox"));
    console.log("BEFORE " + document.getElementById("newbox").innerHTML);
    document.getElementById("newbox").innerHTML +=
      "<div> hello we added this </div>";
    console.log("AFTER " + document.getElementById("newbox").innerHTML);
  }*/

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box id="mapViewPort" position="absolute" top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            styles: [
              {
                elementType: "geometry",
                stylers: [
                  {
                    color: "#1d2c4d",
                  },
                ],
              },
              {
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#8ec3b9",
                  },
                ],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1a3646",
                  },
                ],
              },
              {
                featureType: "administrative.country",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#4b6878",
                  },
                ],
              },
              {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#64779e",
                  },
                ],
              },
              {
                featureType: "administrative.province",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#4b6878",
                  },
                ],
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#334e87",
                  },
                ],
              },
              {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#023e58",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#283d6a",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#6f9ba5",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1d2c4d",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#023e58",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#3C7680",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#304a7d",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#98a5be",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1d2c4d",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#2c6675",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#255763",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#b0d5ce",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#023e58",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#98a5be",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1d2c4d",
                  },
                ],
              },
              {
                featureType: "transit.line",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#283d6a",
                  },
                ],
              },
              {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#3a4762",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#0e1626",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#4e6d70",
                  },
                ],
              },
            ],
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Flex
        position="fixed"
        left={0}
        top={0}
        alignItems="left"
        h="100vh"
        w="30vhw"
      >
        <IconButton
          id="centerMapButton"
          position="fixed"
          bottom="3"
          right="0"
          margin="10px"
          aria-label="center back"
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            
            if(1){
              //this is a demo for the UNI of San Fran
              //API does not cover santa clara
              var d50 = 5.0/2000.0;
              console.log(d50)
              center.lat = 37.774330236;
              center.lng = -122.451164862;
              var dx = [0,-10,0,10];
              var dy = [-10,0,10,0];
              var pts = [];
              console.log(center)
              for(var i = 0; i < 4; i++){
                var tmp = center;
                console.log(dx[i]*d50)
                tmp.lat+=dx[i]*d50;
                tmp.lng+=dy[i]*d50;
                console.log(tmp)
                pts.push(tmp);
              }
              console.log(pts)
              wait(pts);
            }
            
            map.panTo(center);
            map.setZoom(15);
          }}
        />
      
        <Box
          id="walkerContainer"
          p={5}
          borderRadius="lg"
          borderBottomRightRadius={0}
          borderBottomLeftRadius={0}
          m={10}
          bgColor={"#292929"}
          opacity="0.9"
          shadow="base"
          minW="container.md"
          zIndex="1"
          margin="10px"
          marginBottom={0}
          minWidth="fit-content"
          onLoad={() => {
          }}
        >
          <Box id="newRequest">
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="left"
              marginBottom="3%"
              textColor={"whiteAlpha.800"}
            >
              Find A Walker
            </Text>
            <VStack alignItems="left" textColor={"white"}>
              <Box flexGrow={1}>
                <Input
                  type="text"
                  id="nameID"
                  placeholder="Name"
                  ref={destiantionRef}
                />
              </Box>
              
              <Box flexGrow={1} maxHeight={"100px"}>
                <Textarea
                  type="text"
                  id="reasonText"
                  placeholder="Request Information: Please state your location, what you wear, and your phone number if needed."
                  ref={destiantionRef}
                />
              </Box>

              <Button
                border={"2px solid black"}
                backgroundColor={"black"}
                borderRadius={3}
                type="submit"
                onClick={() => {
                  addRequest(
                    document.getElementById("nameID").value,
                    document.getElementById("reasonText").value,
                    center
                  ).then((res) => {
                    console.log(res);
                  });
                }}
              >
                Submit Request
              </Button>
              <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            </VStack>
          </Box>
          <br></br>
          <Box
            id = "walkerLister"
            border="1px solid black"
            borderRadius={4}
            maxH="60vh"
            overflow="auto" 
          >
            {component.map((walker) => getComponent(walker.fName,walker.lName,walker.age,walker.phoneNum,
              (walker.enRoute?"Idle":"Helping"),walker.photoLnk))}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
