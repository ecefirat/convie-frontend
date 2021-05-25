import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HistoryDetails from "../HistoryDetails/HistoryDetails";

import { css } from "@emotion/core";
// import { jsx } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 35vh auto 5vh;
  border-color: red;
`;

function History() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffb300");

  let historyPush = useHistory();

  const [customer_name, setCustomerName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [customer_id, setCustomerId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setCustomerName(data.user.customer_name);
          setCustomerId(data.user.customer_id);
          setLoggedIn(true);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
          historyPush.push("/login");
        });
      }
    });
  }, []);

  useEffect(() => {
    const request = fetch("http://localhost:5000/history", {
      method: "POST",
      body: JSON.stringify({ customer_id: customer_id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 405) {
          res.json().then((data) => {
            console.log(data);
            console.log("this is products data /error 405");
          });
        } else if (res.status === 200) {
          res.json().then((data) => {
            setHistory(data.history);
            console.log(data);
            console.log("history data");
          });
        }
      })
      .catch((error) => console.log(error));
    return request;
  }, [customer_id]);

  const deleteOrder = (data) => {
    console.log(data);
    console.log("deleteorder");
    fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("can't delete");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data.order_id);
          console.log("order details are deleted");
          document.getElementById(
            "deleteOrder"
          ).innerHTML = `Order ${data.order_id} is deleted.`;
        });
      }
    });
  };

  return (
    <div style={{ marginBottom: 70 }}>
      {history.length > 0 ? (
        <div>
          <h2 className="header">Order History</h2>
          <p>Customer Name: {customer_name}</p>
          <p>Customer Number: {customer_id}</p>
          <p id="deleteOrder" style={{ color: "red" }}></p>
          {history.map((order) => {
            return (
              <HistoryDetails
                key={order.order_id}
                order={order}
                deleteOrder={deleteOrder}
              />
            );
          })}
        </div>
      ) : (
        <ClimbingBoxLoader
          color={color}
          loading={loading}
          css={override}
          size={20}
        />
      )}
    </div>
  );
}

export default History;
