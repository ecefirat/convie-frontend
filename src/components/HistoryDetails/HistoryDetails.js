import React from "react";
import { useForm } from "react-hook-form";

const HistoryDetails = (props) => {
  const { register, handleSubmit } = useForm();

  const { order, deleteOrder } = props;

  return (
    <div className="col s12 m7">
      <div className="card horizontal" style={{ marginBottom: 25 }}>
        <div className="card-image"></div>
        <div className="card-stacked">
          <div className="card-content">
            <p>Order Number: {order.order_id}</p>
            <p>Amount: {order.order_amount}</p>
            <p>Address: {order.order_address}</p>
            <p>Date: {order.order_date}</p>
          </div>
          <input
            type="hidden"
            name="order_id"
            value={order.order_id}
            ref={register}></input>

          <button
            onClick={handleSubmit(deleteOrder)}
            className="btn-floating btn-small halfway-fab waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
