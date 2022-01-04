import {useEffect} from "react"
import { loader } from "../utils"

function Preloader(){

	useEffect(() => {
		loader()
	},[])

	return(
		<>
	     
		    <div id="preloader">
		        <div className="preload-content">
		            <div id="dream-load"></div>
		        </div>
		    </div>
	    </>
	)
}

export default Preloader