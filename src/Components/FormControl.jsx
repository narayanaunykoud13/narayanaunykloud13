import React from 'react';

const FormControl = ({ label, children, type, border, labelStyle }) => {
    return (
        <div className="control-group">
            {label && <label className="control-label" style={labelStyle}>{label}</label>}
            <div className="controls">
                {
                    border == "F" || type == "radio" ?
                        React.Children.map(children, child => child)  
                    :  
                        React.Children.map(children, child =>
                            React.cloneElement(child, { className: `${child.props.className || ''} form-control`.trim() })
                        ) 
                        // React.Children.map(children, child => {
                        //     if (React.isValidElement(child) && (child.type === 'input' || child.type === 'textarea' || child.type.displayName === 'GlobalList')) {
                        //         return React.cloneElement(child, { className: `${child.props.className || ''} form-control`.trim() });
                        //     }
                        //     return child;
                        // })
                }
            </div>
        </div>
    );
};

export default FormControl;