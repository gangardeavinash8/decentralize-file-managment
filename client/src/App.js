import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./components/FileUpload.css";
import logo from "./assets/logo.png";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []); //open metamask
        const signer = provider.getSigner(); //write data on blockchain
        const address = await signer.getAddress(); //set address
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        // console.log(contract)
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          flexFlow: "column nowrap",
        }}
      >
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        <div className="overlay"></div>
        <h1>
          <img src={logo} />
          Chitragupta
        </h1>
        <div className="card">
          <p>
            <strong>Account Id: </strong>
            {account ? account : "Not connected"}
          </p>

          {mode ? (
            <Display
              contract={contract}
              account={account}
              data={data}
              setData={setData}
            />
          ) : (
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
        <button className="mode-selector" onClick={() => setMode(!mode)}>
          {mode ? "Upload" : "Retrieve"} Files
        </button>
      </div>
      {data &&
      <div id="documents">
        <div className="card white">
          {data}
        </div>
      </div>}
    </>
  );
}

export default App;
