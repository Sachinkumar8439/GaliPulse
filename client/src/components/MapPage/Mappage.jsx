import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import blackmarker from './blackmarker.png';
import selectedmarker from './selectedmarker.png';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = new L.Icon({
  iconUrl: blackmarker,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const selecticon = new L.Icon({
  iconUrl: selectedmarker,
  iconSize: [40, 40],
  iconAnchor: [20 , 37],
  popupAnchor: [0, -32],
});

// const boundonmap = (locations,map) =>{
//    if (locations.length > 0) {
//       const bounds = L.latLngBounds(locations.map((user) => user.position));
//       map.fitBounds(bounds, { padding: [50, 50] });
//     }
// }

// const FitBounds = ({ locations }) => {
//   const map = useMap();
  
//   useEffect(() => {
//       boundonmap(locations,map)
//   }, [locations ,map]);

//   return null;
// };


export default function Mappage({handleconnect , users,userposition , handleviewmore}) {
  const mapRef = useRef();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarRendered, setIsSidebarRendered] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markerRefs = useRef([]);
  const mainRef = useRef();
  const [mapsize,setmapsize] = useState({width:100,height:70})
 
   const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth", 
      });
    }
  };

  const boundonmap = () =>{
    // console.log("aaa",mapRef.current)
    if(!mapRef.current) return;
    console.log('i cloked');
    const map = mapRef.current;
   if (users.length > 0) {
      const bounds = L.latLngBounds(users.map((user) => user.position));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
}
  const handleMarkerClick = (user,e) => {
    const marker = e.target;
    marker.openPopup();
    console.log(marker);
    const map = marker._map;
    map.setView(user.position, 16, { animate: true });
    // setSelectedUser(user);
    // setIsSidebarRendered(true);
    // setIsSidebarVisible(true)
    // return;
  };
  
  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarRendered(false), 100);
  };
 
  const handlelocate =(user,marker)=>{
    scrollToTop();
    console.log(user,marker)
    const map = marker._map;
    map.setView(user.position, 15, { animate: true });
    const popup = marker.getPopup();
    console.log(popup)
    const popupContent = popup.getElement();
    console.log(popupContent)
    // marker.openPopup();
    popupContent.style.borderRadius = '10px';
    popupContent.style.boxShadow = '2px 2px 10px 8px green';

    setTimeout(() => {
    popupContent.style.borderRadius = '0px';
    popupContent.style.boxShadow = 'none';
    }, 10000);

    console.log("handlelocated buttn clicked");
    console.log("data is ",user)
  }
 
  useEffect(() => {
    if (mapLoaded) {
      markerRefs.current.forEach((marker) => {
        if (marker) {
          marker.openPopup();
        }
      });
    }
  }, [mapLoaded]);

//  useEffect(()=>{
//   if(mapRef.current)
//   {
//     boundonmap()

//   }
//  },[])


  return (
    <div ref={mainRef} className="map-page" style={{ width: `100%`, height: `100%`, overflowX: 'hidden', position: 'relative',}}>
      <div 
      style={{width:`${mapsize.width}%`,height:`${mapsize.height}vh`,transition: "height 0.3s ease",overflowX:'hidden',overflowY:'hidden' }}
      >
      <MapContainer
        center={users[0].position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => {setMapLoaded(true);
          console.log("map loaded")
        }}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          
        {/* <FitBounds locations={users} /> */}
        {users.map((user, index) => (
          <Marker
          key={user.id}
          position={user.position}
          icon={selectedUser?.id === user.id ? selecticon : customIcon}
          ref={(el) => (markerRefs.current[index] = el)}
          eventHandlers={{
            click: (e) => handleMarkerClick(user,e),
          }}
          >
            <Popup closeOnClick={false} autoClose={false}>
              <div onClick={() => console.log('Popup clicked for', user.name)}
              style={{ fontFamily: 'Arial', padding: '1px', fontSize: '0.6rem', }}>
              <strong style={{ color: '#2a9d8f', fontSize: '100%' }}>{user.title}</strong>
                <br />
                <span style={{ color: '#264653' }}>{user.rate}</span>
                <br />
                <span style={{ fontWeight: 'bold' }}>{user.name}</span>{' '}
                <span style={{ color: '#e76f51' }}>op</span>
              </div>
            </Popup>
          </Marker>
        ))}
         <Marker
          key={10001}
          position={userposition}
          icon={customIcon}
          >
            <Popup closeOnClick={false} autoClose={false}>
              <div onClick={() => console.log('Popup clicked for sachin ')}
              style={{ fontFamily: 'Arial', padding: '1px', fontSize: '0.6rem', }}>
              <strong style={{ color: '#2a9d8f', fontSize: '100%' }}>this is me </strong>
                <br />
                <span style={{ color: '#264653' }}>hahaha</span>
                <br />
                <span style={{ fontWeight: 'bold' }}>sachin kumar</span>{' '}
                <span style={{ color: '#e76f51' }}>op hoon me to</span>
              </div>
            </Popup>
          </Marker>
      </MapContainer>
      </div>
      <div>
        <div style={{display:'flex',position:'relative',
        padding:'10px',
        gap:'10px',
        alignItems:'center',
        overflow:'hidden',
        }}>
          <input list="product" style={{outline:'1px solid black',padding:'5px 10px',flex:'1',borderRadius:'5px',}} type="text" placeholder='search by name' />
          <div style={{display:'flex',width:'30%'}}>
          <button onClick={boundonmap()} style={{width:'',textAlign:'center',outline:'1px solid black',padding:'3px',borderRadius:'5px'}}>search</button>
          <button style={{width:'',textAlign:'center',outline:'1px solid black',padding:'3px',borderRadius:'5px'}}>recenter</button>
          </div>
        <datalist style={{height:'50vh'}} id="product">
       {users.map((user,index)=>(<option value={user.name} key={index} />))}
      </datalist>
        </div>
        <ul>
          {users.map((user,index)=>
          (
          <li style={{listStyle:'none',padding:'10px',outline:'1px solid green',display:'flex'}} key={index}>
            <div style={{flex:'1'}}>

            <img src={blackmarker} alt="" width='20px' />
            <h3>{user.title}</h3>
            <h5>{user.rate}</h5>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <button onClick={(e)=>{e.preventDefault();handlelocate(user,markerRefs.current[index])}} style={{backgroundColor:'lightgreen',width:'',textAlign:'center',outline:'1px solid black',padding:'5px',borderRadius:'5px'}}>locate Map</button>
              <button onClick={(e)=>{e.preventDefault();handleviewmore(user)}} style={{width:'',textAlign:'center',outline:'1px solid black',padding:'5px',borderRadius:'5px'}}>view more</button>
            </div>
          </li>
        ))}
        </ul>
      </div>

      {isSidebarRendered && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: '#fff',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            zIndex: '10000',
            // transition: 'right 0.3s ease-in-out',
            width: '250px',
          }}
        >
          <button
            style={{
              float: 'right',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={(e)=>{
              e.preventDefault();
              // closeSidebar()
            }}
          >
            X
          </button>
          <h4>Seller information</h4>
          <p><strong>Name:</strong> {selectedUser?.name}</p>
          <p><strong>Title:</strong> {selectedUser?.title}</p>
          <p><strong>Rate:</strong> {selectedUser?.rate}</p>
          <p><strong>Position:</strong> {selectedUser?.position?.join(', ')}</p>
          <div style={{ display: 'flex', gap: '10px', margin: '2px', justifyContent: 'space-around' }}>
            <button
            onClick={e=>{
              e.preventDefault();
              handleconnect(selectedUser)
            }}
             style={{width:'10rem', padding: '5px 8px', outline: '1px solid green', background:'green',color:'white',borderRadius:'5px' }}>
              connect
            </button>
            <button onClick={e=>{
              e.preventDefault();
              handleviewmore(selectedUser)
            }} style={{width:'10rem', padding: '5px 8px', outline: '1px solid green',borderRadius:'5px' }}>
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
