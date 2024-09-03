import React, {useEffect, useState} from 'react'
import { useParams, Link, Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { isset, $ajax_post, InputDisplay, InputField, TabHeader, TabNavigation, PageHeader} from '../../../Library/Library';
import Header from '../../../Components/Header';

import UiSetupList from './Components/List';
import FormElements from './Components/FormElements';
import UiSetupPopups from './Components/Popups';


import { 
    PropertySafetyOutlined, BarsOutlined, AppstoreOutlined, HddOutlined, MenuOutlined, RadiusUprightOutlined, InsertRowLeftOutlined, ProjectOutlined, UserOutlined, 
    ProductOutlined, IdcardOutlined, ContactsOutlined, ClockCircleOutlined, PullRequestOutlined, AuditOutlined,
    HeatMapOutlined, FlagOutlined, PartitionOutlined, LinkOutlined, DockerOutlined, FormOutlined} from '@ant-design/icons';


const UiSetup = () => {

   /*  const edit_property_setup = () => {
        console.log("edit_property_setup....",JSON.stringify(edit_property_setup))
        $ajax_post('post', 's/p/1002', propertyCreateForm, function(record_id){
             console.log("reccccid",record_id);
            navigate("/property-setup/view/"+record_id+"/primary-information");
        })
    }; */

    let { tabId } = useParams();
    if(!isset(tabId)){
      tabId = "form-elements";
    }
   
    
    
   
    const [view_data, setview_data] = useState({});

   

      console.log("outside",view_data)
   // let ViewPath = "/property-setup/view/"+viewId
    let ViewPath = `/ui-setup`;
    let NavMenus = [];
    
    // # get data or create config
   
        
       
    NavMenus.push({"path":ViewPath, "tabpath":"form-elements", "label":"Form Elements", "icon":<FormOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"list", "label":"List View", "icon":<BarsOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"popups", "label":"Popups View", "icon":<LinkOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"button", "label":"Buttons View", "icon":<LinkOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"horizontal-tabs", "label":"Horizontal Tabs", "icon":<AppstoreOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"vertical-tabs", "label":"Vertical Tabs", "icon":<HddOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"services", "label":"Services", "icon":<MenuOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"context-help", "label":"Context Help", "icon":<BarsOutlined />});
    NavMenus.push({"path":ViewPath, "tabpath":"access-record", "label":"Access Record", "icon":<BarsOutlined />});
    
    
    return (
        <div>
            <Header title="UI Setup">
            </Header>
            <PageHeader>
                <Link to={`/ui-setup/${tabId}`} className='btn btn-primary'>Edit</Link>
                <Link className='btn'>Save</Link>
                <Link to='/ui-setup/list' className='btn'>Back to list</Link>
                <Link to={`/ui-setup/${tabId}`} className='btn'>Cancel</Link>
            </PageHeader>
            
            <TabNavigation menus={NavMenus} tabId={tabId}>
                {(tabId == "form-elements") && <FormElements />}
                {(tabId == "list") && <UiSetupList />}
                {(tabId == "popups") && <UiSetupPopups />}
            </TabNavigation> 

            
        </div>
    )
}
export default UiSetup;
