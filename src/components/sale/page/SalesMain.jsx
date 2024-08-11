import React,{useEffect} from "react";
import IncomingSales from "../itemcomponent/IncomingSales";
import { useHeaderText } from "../../../stores/headerText";

const SalesMain = () => {
    const {setHeaderText} = useHeaderText();

    useEffect(() => {
        setHeaderText("매출 확인");
      }, [setHeaderText]);
      
    return(
        <div>
            <IncomingSales />
        </div>

    )


}

export default SalesMain;