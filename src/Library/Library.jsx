import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";



export const isset = (v) => {
    if(typeof v != "undefined"){
        return true
    }else{
        return false;
    }
}
export const $ajax_post = (method, ref, data, successcallback) => {
    // axios.post();    
    const fetchData = async () => {
        // const data = {
        //     authenticationId: "JS732911",
        //     deviceId: "fgrgd"
        //   };
  
        //   const config = {
        //       headers:{
        //           'Content-Type': 'application/json',
        //           'host':'https://employeeportal.curiousrubik.com'
        //       },
        //       auth: {
        //         username: "unykloud",
        //         password: "9ytTk47QL7Rj"
        //       },
        //       // withCredentials: true
        //     };

        //   const _ut = 'https://employeeportal.curiousrubik.com/api/authorization/?t='+(new Date()).getTime();
        //   const response = await axios.post(_ut, data, config);
         


        const _ut = "https://curiousrubik.us/dev/pmsdevapi.php?gyu="+ref+"&t="+(new Date()).getTime();
        const response = await axios.post(_ut, {"body":data});
        successcallback(response.data.data);
        return response.data;
    }
    return fetchData();
}



export const InputDisplay = ({label, value}) => {
    return (
        <div>
            <div className="control-group">
                <label className="control-label">{label}</label>
                <div className="controls">
                    <input className="form-control view-box" value={value}/>
                </div>
            </div>
        </div>
    )
}

export const InputField = ({ label, children }) => {
    return (
        <div className="control-group">
            {label && <label className="control-label">{label}</label>}
            <div className="controls">
                {children}
            </div>
        </div>
    );
};
export const TabHeader = ({ children }) => {
    return (
        <div className="tab-header">
            {children}
        </div>
    );
};
export const FormRow = ({ children }) => {
    const columns = [[], [], [], []]; // Array to hold each column's children

    

    const formRowRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [numberOfCols, setNumberOfCols] = useState(3); // Default to 3 columns

    useEffect(() => {
        if (windowWidth <= 500) {
          setNumberOfCols(1);
        } else if (windowWidth <= 800) {
          setNumberOfCols(2);
        } else if (windowWidth >= 1100) {
          setNumberOfCols(4);
        }
        else if (formRowRef.current && formRowRef.current.closest(".tab-navigation")) {
          setNumberOfCols(4);
        } else {
          console.log("formRowRef", formRowRef);
        }
      }, [windowWidth]);

    // Distribute children into columns
    if (children) {
        // Distribute children into columns
        React.Children.forEach(children, (child, index) => {
            columns[index % numberOfCols].push(child);
        });
    }
    
    const col_definations = {
        "1":"12",
        "2":"6",
        "3":"4",
        "4":"3",
    }
    const colmd_ = "col-md-"+col_definations[numberOfCols];

    return (
        <div className="row">
            {columns.map((col, colIndex) => (
                <div key={colIndex} className={colmd_}>
                    {col}
                </div>
            ))}
        </div>
    );
};
export { default as FormControl } from '../Components/FormControl';
export { default as CrGridTable } from '../Components/CrGridTable';
export { default as Container } from '../Components/Elements';

export { default as GlobalList } from '../Components/GlobalList';
export { default as TabNavigation } from '../Components/TabNavigation';
export { default as PageHeader } from '../Components/PageHeader';
export { default as ModalOpen } from '../Components/ModalOpen';


