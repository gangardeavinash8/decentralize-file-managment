const her=require("hardhat");

async function main(){
  const Upload= await her.ethers.getContractFactory("Upload")
  const upload =await Upload.deploy();

  await upload.deployed();

  console.log("contract deployed to :" , upload.address);
}

main().catch((error)=>{
  console.error(error);
  process.exitCode=1;
})