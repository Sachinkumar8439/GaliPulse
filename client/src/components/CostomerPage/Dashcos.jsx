import React, { useEffect, useState } from "react";
import rundata from "../../Controllers/data";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import ItemDATA from "../../Data/Items";
import { LuMapPinned } from "react-icons/lu";


import LoadingSpinner from "../common/loading";
import ItemsList from "../ItemsList";

export default function Dashcos() {
  const navigate = useNavigate()
  const [isloaded, setisloaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [products, setproducts] = useState(ItemDATA.products || null);
  const [user, setuser] = useState(location.state || JSON.parse(localStorage.getItem('user')));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchproducts = async () => {
    const result = await rundata.loadproducts();
    if (result.success) {
      console.log("products are ", result.products);
      setproducts(result.products);
      setTimeout(() => {
        setisloaded(true);
      }, 1000);
      return;
    }
  };

  useEffect(() => {
    console.log("it runs ");
    console.log("products are ", ItemDATA);
    console.log("useris ", user);

    // fetchproducts();
  }, []);
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div
        style={{ ...styles.sidebar, width: isSidebarOpen ? "200px" : "50px" }}
      >
        <h2 onClick={toggleSidebar} style={styles.logo}>
          {isSidebarOpen ? "<" : ">"}
        </h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>{isSidebarOpen ? "Profile" : "🏠"}</li>
          <li style={styles.menuItem}>
            {isSidebarOpen ? "Your products" : "📈"}
          </li>
          <li style={styles.menuItem}>{isSidebarOpen ? "Users" : "👤"}</li>
          <li style={styles.menuItem}>{isSidebarOpen ? "Settings" : "⚙️"}</li>
          <li style={styles.menuItem}>{isSidebarOpen ? "Products" : "⚙️"}</li>
          <li title="find nearby items" className="text-white " onClick={()=>navigate("/nearer")} style={styles.menuItem}>{isSidebarOpen ? "near by" :< LuMapPinned  />}</li>
          <li className="text-white" onClick={()=>navigate("/Additem")} style={styles.menuItem}>{isSidebarOpen ? "AddItems" : '+'}</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={styles.header}>Welcome to the Dashboard</h1>
        <ItemsList user={user}/>

        {/* Cards Section */}
        {/* <div style={styles.cardContainer}>
          {!isloaded && <LoadingSpinner />}
          {
           products && products.map((element) => (
              <div key={element.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{element.name}</h3>
                <p style={styles.cardValue}>{element.id}</p>
              </div>
              ))
            }
        </div> */}
      </div>
    </div>
  );
}

// Responsive & Dark Theme Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1E1E1E",
    color: "#EAEAEA",
    // overflowY:'auto',
  },
  sidebar: {
    // position:'absolute',
    height: "100%",
    backgroundColor: "#151515",
    color: "#fff",
    padding: "5px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease-in-out",
    alignItems: "center",
  },
  logo: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    width: "100%",
  },
  menuItem: {
    padding: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "5px",
    textAlign: "center",
    backgroundColor: "#2A2A2A",
    transition: "0.3s",
    // width:'100%',
  },
  main: {
    display: "flex",
    flex: 1,
    padding: "20px",
    backgroundColor: "#1E1E1E",
    overflowY: "auto",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    flex: "1",
    // overflowY:"auto",
  },
  card: {
    backgroundColor: "#292929",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(255,255,255,0.1)",
    textAlign: "center",
    width: "180px",
    color: "#EAEAEA",
    cursor: "pointer",
  },

  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#CCCCCC",
  },
  cardValue: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#FFD700",
  },
};
