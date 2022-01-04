import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
// import Aos from 'aos';

import { useEffect } from 'react';
import {  useWeb3React } from '@web3-react/core'
// import Header from "./components/Header/Header";
import Web3 from "web3";
import { injected } from "./components/wallet/connectors";
import Header from "./components/Header";
import '../src/assets/css/bootstrap.min.css'
import './App.css'
const web3Init = () => {

  if ( window.ethereum){
    window.web3 = new Web3(window.ethereum);
    let web3 = window.web3;
    return web3 
  }else {  
    alert("Metamask not installed ")

  }
}

function App() {

    const { activate, account,setError, error,library  } = useWeb3React()
    
    var acc = localStorage.getItem("account")
    useEffect(() => {
      
      const connectOnLoad = async() =>{
          try {
            await activate(injected)
          } catch (ex) {
            console.log(ex)
          }
      }
      if(acc !==null)
        connectOnLoad();

    }, [acc,activate])
   
    useEffect(() => {
    
        
        const initApp = async ()=>{
        
      
        if ( true){
            const web3 = web3Init()
            console.log("web3",web3)
            
            const networkId = await web3.eth.net.getId();
            const accounts1 = await web3.eth.getAccounts();
            localStorage.setItem("account", accounts1);

            if(networkId) {
              console.log(networkId)

            } else {
              // console.log("You should connect to a test netwok")
              // window.alert('Smart contract not deployed to detected network.')
              setError('Smart contract not deployed to detected network.')
            }
        }else {
          setError("Metamask not installed ")
          
        }
          
      }
      if (account){
        initApp();
      }else {
        console.log("no account")
      }
      
    }, [error,setError,account])


 
    
    
  return (
     
      <BrowserRouter>
        
        <Header  library={library}  />
        <div className="container">
        <Routes> 
            <Route path="" element={<Home   />} />
            <Route path="/profile" element={ account !==undefined ?<Profile  account={account} /> :<Home />} />
         
        </Routes>
        </div>
    </BrowserRouter> 
  );
}

export default App;
