import React, { useEffect, useRef, useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'

import Modal from './Modal'
import ConnectWalletIconswallet from "../assets/img/icons/wallet.png"
import { useWeb3React } from "@web3-react/core"
import { injected, walletconnect } from './wallet/connectors'
import Jazzicon from "@metamask/jazzicon";

import NavbarLogo from '../assets/img/logo/logo.png'
import ConnectWalletIconsw1 from "../assets/img/icons/w1.png"
import ConnectWalletIconsw2 from "../assets/img/icons/w2.png"
import getErrorMessage from '../utils/Errors'
import useOnClickOutside from '../hooks/useOnClickOutside'
import './Header.css'

function Header() {

    const {error, active, account,chainId,activate, deactivate } = useWeb3React()
    
    // var acc = localStorage.getItem("account")
    
    
    const navigate = useNavigate()

    
    
    async function connectMetaMask() {
      try {
        
        await activate(injected)

      } catch (ex) {
        console.log(ex)
      }
      console.log(account)
      // localStorage.setItem("account", account);

    }

    async function connectWalletConnect() {
        
        try {
          await activate(walletconnect)

        } catch (ex) {
          console.log(ex)
        }
            //we use web3.eth to get the accounts to store it in local storage
       
      }
  
    async function disconnect() {
      try {
        deactivate()
      } catch (ex) {
        console.log(ex)
      }
      
      localStorage.removeItem("account");

    }
    const [modalOpen, setModalOpen] = useState(false)

    
    useEffect(() => {
        if(active && account !== undefined){
            navigate("/profile")
            setModalOpen(false)
        }   
        
    },[navigate,active,account])

    // icon 
    const ref = useRef(null)
    useEffect(() => {
      if (account && ref.current) {
        ref.current.innerHTML = "";
        ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
      }
    }, [account]);
    
    const gotoProfile = () => {
      navigate("/profile")
    }

    useEffect(() => {
      if(error){
        setModalOpen(false)
      }
    }, [error])

   

   
    const [isHeaderMobileOpen, setIsHeaderMobileOpen] = useState(false)

    const showMobileHeader = ()=> {
      
      setIsHeaderMobileOpen(!isHeaderMobileOpen)
    }

    const refHeader = useRef(null)
    useOnClickOutside(refHeader,()=> setIsHeaderMobileOpen(true))


  return(
    <>
        {/* <Preloader Title={""} /> */}
        <nav className="navbar navbar-expand-lg navbar-white fixed-top" id="banner">
            <div className="container position-relative">
                <NavLink className="navbar-brand" to="/">
                  {/* <span>
                    openwallet.x
                  </span> */}
                  <img src={NavbarLogo} width="80px" alt="" />
                </NavLink>

                <button className="navbar-toggler" onClick={showMobileHeader} type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
               {/* header Desktop */}
                <div className="collapse navbar-collapse"  id="navbarSupportedContent">
                    <ul className="navbar-nav  ml-auto text-white">
                       
                      
                         {active && account ? 
                         <>
                           
                    
                            <li data-toggle="tooltip" data-placement="bottom" title="Your Account"  onClick={gotoProfile} className="nav-item custom-item rounded  d-flex align-items-center mx-2">
                               
                                <div >
                                {account === null
                                    ? '-'
                                    : account
                                    ?

                                    <div className="d-flex align-items-center ">
                                      <div ref={ref}>
                                        
                                      </div>
                                      <div className="pl-2">
                                        {account.substring(0, 6)}...{account.substring(account.length - 4)}
                                      </div>
                                      

                                    </div>
                                    
                                    : ''}
                                </div>
                            </li>
                            <li data-toggle="tooltip" data-placement="bottom" title="Network type"  className="nav-item custom-item rounded d-flex align-items-center mx-2"  >                   
                                  {/* <div className="bg-warning rounded-circle" style={{width:"16px", height:"16px"}}>
                                      
                                  </div>
                                  <div className="pl-2">
                                    Rinkeby
                                  </div> */}
                                  {chainId &&  chainId ===1 ? 
                                  <>
                                    <div className="bg-success rounded-circle" style={{width:"16px", height:"16px"}}>
                                      
                                    </div>
                                    <div className="pl-2">
                                      Main
                                    </div>
                                  </>
                                  
                                  : chainId ===4?
                                  <> 
                                    <div className="bg-warning rounded-circle" style={{width:"16px", height:"16px"}}>
                                        
                                    </div>
                                    <div className="pl-2">
                                      Rinkeby
                                    </div>
                                  
                                  </>
                                  :""
                                  
                                  }
                              </li>
                         
                            <li data-toggle="tooltip" data-placement="bottom" title="Logout"  onClick={disconnect} className="nav-item py-2 custom-item rounded d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" style={{width:"20px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg> 
                                {/* <svg 
                                   xmlns="http://www.w3.org/2000/svg" style={{width:"30px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                  
                                  >
                                <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
                              </svg> */}
                            </li>

                         </>
                         :
                        <li className="lh-55px">
                            <button onClick={()=>{setModalOpen(!modalOpen)}} className="btn login-btn ml-50">
                                Connect Wallet
                            </button>
                            {/* <NavLink to="/profile" className="btn login-btn ml-50">Connect Wallet</NavLink> */}
                        </li>
                        }
                    </ul>
                    
                    
                </div>
              
                {/* Header mobile  */}
                <div ref={refHeader} className={`header-mobile  ${isHeaderMobileOpen ? "d-none":""} `}>
                      <ul className="navbar-nav">
                        {active && account ? 
                         <>
                           
                         
                           
                            <li data-toggle="tooltip" data-placement="bottom" title="Your Account"  onClick={gotoProfile} className="nav-item custom-item rounded  d-flex align-items-center mx-2">
                               
                                <div >
                                {account === null
                                    ? '-'
                                    : account
                                    ?

                                    <div className="d-flex align-items-center ">
                                      <div ref={ref}>
                                        
                                      </div>
                                      <div className="pl-2">
                                        {account.substring(0, 6)}...{account.substring(account.length - 4)}
                                      </div>
                                      

                                    </div>
                                    
                                    : ''}
                                </div>
                            </li>
                            <li data-toggle="tooltip" data-placement="bottom" title="Network type"  className="nav-item custom-item rounded d-flex align-items-center mx-2"  >                   
                               
                                  {chainId &&  chainId ===1 ? 
                                  <>
                                    <div className="bg-success rounded-circle" style={{width:"16px", height:"16px"}}>
                                      
                                    </div>
                                    <div className="pl-2">
                                      Main
                                    </div>
                                  </>
                                  
                                  : chainId ===4?
                                  <> 
                                    <div className="bg-warning rounded-circle" style={{width:"16px", height:"16px"}}>
                                        
                                    </div>
                                    <div className="pl-2">
                                      Rinkeby
                                    </div>
                                  
                                  </>
                                  :""
                                  
                                  }
                              </li>
                         
                            <li data-toggle="tooltip" data-placement="bottom" title="Logout"  onClick={disconnect} className="nav-item custom-item rounded d-flex align-items-center mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" style={{width:"20px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg> 
                                  
                                <div className="pl-2">
                                  Logout
                                </div>
                            </li>

                         </>
                         :
                        <li className="lh-55px mx-auto">
                            <button onClick={()=>{setModalOpen(!modalOpen);setIsHeaderMobileOpen(true)}} className="btn login-btn ml-50">
                                Connect Wallet
                            </button>
                            {/* <NavLink to="/profile" className="btn login-btn ml-50">Connect Wallet</NavLink> */}
                        </li>
                        }
                      </ul>
                        

                </div>
               
                
            </div>
            {error ? 
            <div role="alert" className="message-error alert alert-danger position-absolute rounded-sm">
              {getErrorMessage(error)} 
            </div>:
            ""
              }
        </nav>
        
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >

              <div className="text-white  p-3 text-center">
                <img src={ConnectWalletIconswallet} className="mb-2" width="70" alt="" />
                <h4 className="w-text mb-10" data-wow-delay="0.3s">Connect Your Wallet to Start collecting, Buying and Selling NFTs.</h4>
                
                <div>
                    <div onClick={connectMetaMask} className="modal-item ">
                        <img src={ConnectWalletIconsw1} width="40" className="wal-icon" alt="" />
                        Connect with MetaMask
                    </div>
                    <div onClick={connectWalletConnect}  className="modal-item ">
                        <img src={ConnectWalletIconsw2} width="40" className="wal-icon" alt="" />
                        Connect with WalletConnect
                    </div>
                </div>
            </div>
        </Modal>
    </>
  )
}

export default Header
