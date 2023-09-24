import React from "react";
import { useEffect } from "react";
import "./Modal.css";

function Modal({ setModalOpen, contract }) {
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  async function sharing() {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    console.log("access shared");
  }

  async function CancelSharing() {
    const address = document.querySelector(".address").value;
    await contract.disallow(address);
    console.log("access cancel");
  }
  return (
    <>
      <div className="close" onClick={() => setModalOpen(false)}></div>
      <div className="modalBackground">
        <div className="close" onClick={() => setModalOpen(false)}></div>
        <div className="modalContainer">
          <div className="title">
            <h2>Share with</h2>
          </div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="enter Address"
            />
          </div>
          <form action="" id="myForm">
            <select name="" id="selectNumber">
              <option className="address" value="">
                people with access
              </option>
            </select>
          </form>
          <div className="footer">
            <button onClick={sharing}>share</button>
            <button onClick={CancelSharing}>cancel sharing</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
