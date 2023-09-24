import React from "react";

import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload({ account, contract, provider, setModalOpen }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `2cef82ce5ef1fd6ed933`,
            pinata_secret_api_key: `c6c699cb5141f8a2186aa541a988ce173f80e551bc628a2d73cd7c2043aaee7b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const FileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, FileHash);
        alert("Successfully Image Uploaded");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //array of files
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          {" "}
          <strong>Choose image</strong>
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
          className="choose-file"
        />
        {fileName && <strong className="textArea">{fileName}</strong>}
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
        <button
          type="submit"
          className="upload"
          onClick={() => setModalOpen(true)}
        >
          Share
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
