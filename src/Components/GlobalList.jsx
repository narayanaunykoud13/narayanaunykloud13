import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {Select} from 'antd';
import { isset, $ajax_post} from '../Library/Library';

const GlobalList = ({ label, name, recordType, listId, onChange, value, readonly, style }) => {

    const [items, setItems] = useState([]);
    
    let readonly_ = "";
    if(isset(readonly)){
       readonly_ = readonly;
    }else{
       readonly_ = "";
    }
    const fetchData = async () => {
      try {
        if(!isset(listId)){
            // alert("List ID is not there::")
            return;
        }
        var obj = {};//{"id":"custrecord_cr_sun_com_uom","record_type":"customrecord_cr_sun_community"}
        obj.id = listId;

        if(isset(recordType)){
            obj.record_type = recordType;
        }
        $ajax_post('post', 'g.c.globallist', obj, function(records){
            //  alert(records.length)
            setItems(records.list);
        })
        
      } catch (error) {
          console.error('There was an error!', error);
      }
  };
  
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Select
            className="form-control"
            // style={{ width: 200 }}
            style={style}
            name={name}
            onChange={onChange}
            value={value}
            placeholder="Select an option" d={items.length}
            disabled={readonly_}
            >
                {items.map(item => (
                    <Option value={item.id}>{item.title}</Option>
                ))}
        </Select>
    );
};
export default GlobalList;