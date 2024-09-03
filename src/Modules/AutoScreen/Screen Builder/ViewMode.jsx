import React, {useEffect, useState} from 'react'
import { useParams, Link, Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { isset, $ajax_post, InputDisplay, InputField, TabHeader, TabNavigation, PageHeader} from '../../../Library/Library';
import Header from '../../../Components/Header';


import { 
    PropertySafetyOutlined, BarsOutlined, RadiusUprightOutlined, InsertRowLeftOutlined, ProjectOutlined, UserOutlined, 
    ProductOutlined, IdcardOutlined, ContactsOutlined, ClockCircleOutlined, PullRequestOutlined, AuditOutlined,
    HeatMapOutlined, FlagOutlined, PartitionOutlined, LinkOutlined, DockerOutlined, FormOutlined} from '@ant-design/icons';


const ScreenBuilderListMode = () => {

    let { viewId, tabId, ScreenMode } = useParams();
    console.log("idddd",viewId)
   
    const isEditMode = ScreenMode === 'edit';
    console.log("isEditMode",isEditMode)
   
    const [view_data, setview_data] = useState({});

    const fetchData = async () => {
        try {
          $ajax_post('post', 's/p/1003', {"id":viewId}, function(record){
            setview_data(record);
          })
          
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
      useEffect(() => {
          fetchData();
      }, []);

      console.log("outside",view_data)
   // let ViewPath = "/property-setup/view/"+viewId
    let ViewPath = `/property-setup/${isEditMode ? 'edit' : 'view'}/${viewId}`;
    let NavMenus = [];
    
    // # get data or create config
   
        
       
            // NavMenus.push({"path":ViewPath, "tabpath":"primary-information", "label":"Primary Information", "icon":<PropertySafetyOutlined />}),
            
    
    
    return (
        <div>
            <Header title="Property View">
            </Header>
            <PageHeader>
                {/* <Link to='/property-setup/edit/1/primary-information' className='btn btn-primary'>Edit</Link> */}

                { (tabId == "primary-information" || tabId == "construction-details" || tabId == "property-details") && (ScreenMode === 'view') && (<Link to={`/property-setup/edit/${viewId}/primary-information`} className='btn btn-primary'>Edit</Link>)}
                {(ScreenMode === 'edit')&&(<Link className='btn'>Save</Link>)}
                {(ScreenMode === 'view')&&(<Link to='/property-setup/list' className='btn'>Back to list</Link>)}
                {(ScreenMode === 'edit')&&(<Link to={`/property-setup/view/${viewId}/${tabId}`} className='btn'>Cancel</Link>)}
            </PageHeader>
            
            <TabNavigation menus={NavMenus}>
            
            </TabNavigation> 

            
        </div>
    )
}
export default ScreenBuilderListMode;
