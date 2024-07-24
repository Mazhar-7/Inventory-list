import { React, useReducer, useEffect } from "react";
import { InventoryReducer, initialState } from "../Reducer/InventoryReducer";
import axios from "axios";
import { FETCH_ACTIONS } from "../actions";

const InventoryList = () => {
  const [state, dispatch] = useReducer(InventoryReducer, initialState);
  const { items, loading, error } = state;
  console.log(items, loading, error);

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems=async ()=> {try {let response = await axios.get("https://jsonplaceholder.typicode.com/posts"); 
           if (response.status === 200) {
              dispatch({ type: FETCH_ACTIONS.SUCCESS, data: response.data });
         }}

    // const getItems = async () => {
    //   try {
    //     let response = await axios.get("http://localhost:3000/eatables");
    //     if (response.status === 200) {
    //       dispatch({ type: FETCH_ACTIONS.SUCCESS, data: response.data });
    //     } }
       catch (err) {
        console.log(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      }
    };
    getItems();
  }, []);

  return (
    <div className="flex flex-col m-8 w-2/5">
      {loading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="flex flex-col">
          {" "}
          <h2 className="text-3xl my-4"> Inventory Items</h2>
          {items.map((item) => (
            <li key={item.id} className="flex flex-col p-2 my-2 bg-gray-200 border rounded-md">
              <strong>{item.title} {item.picture} </strong> {" "} of type
              <strong>{item.type}</strong> Costs <strong>{item.price}</strong>
              <p className="my-2 text-xl">Available in stock <strong>{item.quantity}</strong></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
