import React from "react";

const Container = ({ className, children }) => {
    return (
        <div className="container-fluid {{className}}">
            {children}
        </div>
    );
};
export default Container;