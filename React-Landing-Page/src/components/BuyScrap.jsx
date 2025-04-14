import React, { useEffect, useState } from "react";
import "./BuyScrap.css";

const BuyScrap = () => {
  const [items, setItems] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", address: "", phone: "" });
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [orderPopup, setOrderPopup] = useState(null); // Order confirmation state

  useEffect(() => {
    fetch("available.csv")
      .then((res) => res.text())
      .then((data) => {
        const lines = data.trim().split("\n").slice(1);
        const parsed = lines.map((line) => {
          const [Name, Quantity, Price, Image] = line.split(",");
          return { Name, Quantity: Number(Quantity), Price: Number(Price), Image };
        });
        setItems(parsed);
        setQuantities(Object.fromEntries(parsed.map((item) => [item.Name, 0])));
      });
  }, []);

  const handleQuantityChange = (name, value) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.min(value, items.find((i) => i.Name === name).Quantity),
    }));
  };

  const handleIncrement = (name) => {
    const max = items.find((i) => i.Name === name).Quantity;
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.min(prev[name] + 5, max),
    }));
  };

  const isInCart = (name) => cart.some((item) => item.Name === name);

  const handleToggleCart = (item) => {
    const inCart = isInCart(item.Name);
    if (inCart) {
      setCart((prev) => prev.filter((i) => i.Name !== item.Name));
    } else {
      const quantity = quantities[item.Name];
      if (quantity > 0) {
        setCart((prev) => [...prev, { ...item, buyQuantity: quantity }]);
      }
    }
  };

  const generateOrderId = () => "OD" + Math.floor(100000 + Math.random() * 900000);
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 3) + 2; // 2 to 4 days
    today.setDate(today.getDate() + daysToAdd);
    return today.toDateString();
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !userInfo.address || !userInfo.name || !userInfo.phone) {
      alert("Please fill all info fields and add at least one item to cart.");
      return;
    }

    const orderId = generateOrderId();
    const deliveryDate = getEstimatedDeliveryDate();

    setOrderPopup({
      orderId,
      address: userInfo.address,
      deliveryDate,
    });

    // Clear cart and form
    setCart([]);
    setQuantities((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k]) => [k, 0]))
    );
    setUserInfo({ name: "", address: "", phone: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Buy Scrap</h1>

      {/* 🛒 Cart Summary */}
      {cart.length > 0 && (
        <div style={{ margin: "40px auto", maxWidth: "600px", textAlign: "center" }}>
          <h2>🛒 Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.Name}>
                {item.Name} - {item.buyQuantity} Kg @ ₹{item.Price}/Kg = ₹
                {item.buyQuantity * item.Price}
              </li>
            ))}
          </ul>
          <h3>
            Total: ₹{cart.reduce((sum, item) => sum + item.buyQuantity * item.Price, 0)}
          </h3>
        </div>
      )}

      {/* Item Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item) => {
          const inCart = isInCart(item.Name);
          return (
            <div
              key={item.Name}
              style={{
                width: "300px",
                height: "420px",
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img className="card-img"
                src={`./items/${item.Image}.jpg`}
                alt={item.Name}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  alignSelf: "center",
                  borderRadius: "10px",
                }}
              />
              <div style={{ fontWeight: "bold" }}>
                {item.Name}: ₹{item.Price}/Kg
              </div>
              <div>Available: {item.Quantity}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="number"
                  min={0}
                  max={item.Quantity}
                  value={quantities[item.Name] || 0}
                  onChange={(e) =>
                    handleQuantityChange(item.Name, parseInt(e.target.value) || 0)
                  }
                  style={{ width: "60px", textAlign: "center" }}
                />
                <button
                  onClick={() => handleIncrement(item.Name)}
                  style={{
                    backgroundColor: "#FFDEBF",
                    border: "none",
                    color: "#CC2400",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  +5
                </button>
              </div>
              <button
                onClick={() => handleToggleCart(item)}
                style={{
                  fontWeight: "bold",
                  padding: "5px",
                  marginTop: "10px",
                  backgroundColor: inCart ? "#d9534f" : "#27A844",
                  color: inCart ? "#FFF3F3" : "#F0FFF0",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      {/* User Info */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Enter Your Info</h2>
        <input
          type="text"
          placeholder="Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          style={{ margin: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Address"
          value={userInfo.address}
          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
          style={{ margin: "10px", padding: "5px" }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          style={{ margin: "10px", padding: "5px" }}
        />
        <br />
        <button
          onClick={handlePlaceOrder}
          style={{
            padding: "10px 20px",
            fontWeight: "bold",
            backgroundColor: "#27A844",
            color: "#F0FFF0",
            borderRadius: "8px",
            border: "none",
            marginTop: "10px",
          }}
        >
          Place Order
        </button>
      </div>

      {/* ✅ Order Popup */}
      {orderPopup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#f5fff3",
            border: "2px solid #36b37e",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            textAlign: "center",
            zIndex: 1000,
            width: "90%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ color: "#36b37e", marginBottom: "10px" }}>✅ Order Placed!</h2>
          <p><strong>Order ID:</strong> {orderPopup.orderId}</p>
          <p><strong>Address:</strong> {orderPopup.address}</p>
          <p><strong>Estimated Delivery:</strong> {orderPopup.deliveryDate}</p>
          <p style={{ marginTop: "10px", color: "gray" }}>Thank you for recycling with us!</p>
          <button
            onClick={() => {
              setOrderPopup(null);
              setTimeout(() => {
                window.location.href = "/";
              }, 1000); 
            }}
            style={{
              marginTop: "20px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyScrap;
