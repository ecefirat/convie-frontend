import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HistoryDetails from "../HistoryDetails/HistoryDetails";

import { css } from "@emotion/core";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = css`
  display: block;
  margin: 20vh auto 5vh;
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
  const [delOrder, setDelOrder] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_URL + "/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          setCustomerName(data.user.customer_name);
          setCustomerId(data.user.customer_id);
          setLoggedIn(true);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          // console.log(data);
          historyPush.push("/login");
        });
      }
    });
  }, []);

  useEffect(() => {
    const request = fetch(process.env.REACT_APP_URL + "/history", {
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
            // console.log(data);
            console.log("this is products data /error 405");
          });
        } else if (res.status === 200) {
          res.json().then((data) => {
            setHistory(data.history);
            // console.log(data);
            // console.log("history data");
          });
        }
      })
      .catch((error) => console.log(error));
    return request;
  }, [customer_id]);

  const deleteOrder = (data) => {
    fetch(process.env.REACT_APP_URL + "/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        // console.log("can't delete");
      } else if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data.order_id);
          // console.log("order details are deleted");
          setDelOrder(`Order ${data.order_id} is deleted.`);
        });
      }
    });
  };

  return (
    <div>
      {history.length > 0 ? (
        <div style={{ marginBottom: 70 }}>
          <h2 className="header">Order History</h2>
          <p>Customer Name: {customer_name}</p>
          <p>Customer Number: {customer_id}</p>
          <p style={{ color: "red" }}>{delOrder}</p>
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
        <>
          <p style={{ marginTop: "7vh" }}>
            Start shopping
            <p> to see your shopping history...</p>
          </p>
          <ClimbingBoxLoader
            color={color}
            loading={loading}
            css={override}
            size={20}
          />
        </>
      )}
    </div>
  );
}

export default History;
