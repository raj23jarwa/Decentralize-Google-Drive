import './App.css';
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
  function App() {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const loadProvider = async () => {
        if (provider) {
          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          });
          window.ethereum.on("accountsChanged",()=>{
            window.location.reload();
          });
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0x328573E00D98D0dAAC9FD121f40B2c4d0c482Cef";
          const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

          console.log("contract is:",contract);

          setContract(contract);
          setProvider(provider);
        }
        else{
          console.error("metamsak is not installed");
        }
      }
      provider && loadProvider();
    },[])
    return (
      <>
      {!modalOpen && (<button className='share' onClick={() => setModalOpen(true)}> Share 
      </button>)}{" "}
      {modalOpen && (
      <Modal setModalOpen={setModalOpen} contract={contract} /> )}
      <div className="App">
       <h1 className='mainHeading'>Decentralized file Upload System </h1>
      
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>
      <p className='connectmsg'>Address:{account ? account:"Not connected"}</p>
      <FileUpload 
      account={account}
      provider={provider}
      contract={contract}
      />
      <Display
       account={account}
       contract={contract}
      />
      </div>
      </>
    );
  }

export default App;
