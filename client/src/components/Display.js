import React from "react";

import { useState } from "react";
import "./Display.css";

function Display({ contract, account, data, setData }) {
  const [othersAdd, setOthersAdd] = useState(false);
  const getData = async (e) => {
    e.preventDefault();
    let dataArray;
    const otheraddress = document.querySelector(".address").ariaValueMax;
    try {
      if (otheraddress) {
        dataArray = await contract.display(otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("you don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_Array = str.split(",");
      // console.log(str);
      console.log(str_Array);
      const images = str_Array.map((item, i) => {
        return (
          <>
            <a
              href={`https://gateway.pinata.cloud/ipfs${item.substring(
                33
              )}`.toString()}
            >
              <div className="document">{`Document: ${i}`}</div>
            </a>
          </>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <div>
      <form>
        <button
          className="center button else"
          onClick={(e) => {
            e.preventDefault();
            setOthersAdd(!othersAdd);
          }}
        >
          {othersAdd
            ? "Using your own account?"
            : "Using Someone Else's Account?"}
        </button>
        <input
          type="text"
          placeholder="Enter Address"
          className="address"
          style={othersAdd ? { display: "block" } : { display: "none" }}
        />
        <button className="center button" onClick={getData}>
          Get Data
        </button>
      </form>
    </div>
  );
}

export default Display;
