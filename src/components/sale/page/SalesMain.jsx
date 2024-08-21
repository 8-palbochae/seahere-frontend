import React,{useEffect} from "react";
import TotalSales from "../itemcomponent/TotalSales";
import { useHeaderText } from "../../../stores/headerText";
import FishSales from "../itemcomponent/FishSales";
import Today from "../itemcomponent/Today";

const SalesMain = () => {
    const {setHeaderText} = useHeaderText();

    useEffect(() => {
        setHeaderText("매출 확인");
      }, [setHeaderText]);
      
    return(
        <div className="flex flex-col items-center justify-center">
            <Today />
            <TotalSales />
            <FishSales />
        </div>
    )


}

export default SalesMain;