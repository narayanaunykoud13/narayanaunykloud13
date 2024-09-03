import React, {useEffect, useState} from 'react'
import { useParams, Link, Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { isset, $ajax_post, InputDisplay, InputField, TabHeader, TabNavigation, PageHeader} from '../../../Library/Library';
import Header from '../../../Components/Header';

import PropertySetupViewPrimary from './View Tabs/Primary';
import PropertyDetails from './View Tabs/PropertyDetails';
import LandDetails from './View Tabs/LandDetails';
import BuildingGroups from './View Tabs/BuilingGroups';
import Amenities from './View Tabs/Amenities';
import CommunityTeamMember from './View Tabs/CommunityTeamMember';
import ConstructionDetails from './View Tabs/ConstructionDetails';
import Address from './View Tabs/Address';
import Contacts from './View Tabs/Contacts';
import VisitingHours from './View Tabs/VisitingHours';
import Utilities from './View Tabs/Utilities';
import License from './View Tabs/License';
import NearbyProperties from './View Tabs/NearbyProperties';
import LocalAttractions from './View Tabs/LocalAttractions';
import MarketListing from './View Tabs/MarketListing';
import MediaLink from './View Tabs/MediaLink';
import Communication from './View Tabs/Communication';
import FormElements from './View Tabs/FormElements';


import { 
    PropertySafetyOutlined, BarsOutlined, RadiusUprightOutlined, InsertRowLeftOutlined, ProjectOutlined, UserOutlined, 
    ProductOutlined, IdcardOutlined, ContactsOutlined, ClockCircleOutlined, PullRequestOutlined, AuditOutlined,
    HeatMapOutlined, FlagOutlined, PartitionOutlined, LinkOutlined, DockerOutlined, FormOutlined} from '@ant-design/icons';


const PropertySetupView = () => {

   /*  const edit_property_setup = () => {
        console.log("edit_property_setup....",JSON.stringify(edit_property_setup))
        $ajax_post('post', 's/p/1002', propertyCreateForm, function(record_id){
             console.log("reccccid",record_id);
            navigate("/property-setup/view/"+record_id+"/primary-information");
        })
    }; */

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
   
        
       
            NavMenus.push({"path":ViewPath, "tabpath":"primary-information", "label":"Primary Information", "icon":<PropertySafetyOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"form-elements", "label":"Form Elements", "icon":<FormOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"property-details", "label":"Property Details", "icon":<BarsOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"land-details", "label":"Land Details", "icon":<RadiusUprightOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"building-groups", "label":"Buildings/Groups", "icon":<InsertRowLeftOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"amenities", "label":"Amenities", "icon":<ProjectOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"community-team-member", "label":"Community Team Member", "icon":<UserOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"construction-details", "label":"Construction Details", "icon":<ProductOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"address", "label":"Address", "icon":<IdcardOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"contacts", "label":"Contacts", "icon":<ContactsOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"visiting-hours", "label":"Visiting Hours", "icon":<ClockCircleOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"utilities", "label":"Utilities", "icon":<PullRequestOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"license", "label":"License", "icon":<AuditOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"nearby-properties", "label":"Nearby Properties", "icon":<HeatMapOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"local-attractions", "label":"Local Attractions", "icon":<FlagOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"market-listing", "label":"Market Listing", "icon":<PartitionOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"media-link", "label":"MediaLink", "icon":<LinkOutlined />}),
            NavMenus.push({"path":ViewPath, "tabpath":"communication", "label":"Communication & Documents", "icon":<DockerOutlined />})
    
    
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
                {/* <TabHeader>Property Setup View Screen</TabHeader> */}
                {(!isset(tabId) || tabId == "primary-information") && <PropertySetupViewPrimary data={view_data} />}
                {(isset(tabId) && tabId == "form-elements") && <FormElements data={view_data} />}
                {(isset(tabId) && tabId == "property-details") && <PropertyDetails data={view_data}/>}
                {(isset(tabId) && tabId == "land-details") && <LandDetails data={view_data} />}
                {(isset(tabId) && tabId == "building-groups") && <BuildingGroups data={view_data} />}
                {(isset(tabId) && tabId == "amenities") && <Amenities data={view_data} />}
                {(isset(tabId) && tabId == "community-team-member") && <CommunityTeamMember data={view_data} />}
                {(isset(tabId) && tabId == "construction-details") && <ConstructionDetails data={view_data}/>}
                {(isset(tabId) && tabId == "address") && <Address data={view_data}/>}
                {(isset(tabId) && tabId == "contacts") && <Contacts  data={view_data}/>}
                {(isset(tabId) && tabId == "visiting-hours") && <VisitingHours data={view_data} />}
                {(isset(tabId) && tabId == "utilities") && <Utilities data={view_data} />}
                {(isset(tabId) && tabId == "license") && <License data={view_data} />}
                {(isset(tabId) && tabId == "nearby-properties") && <NearbyProperties data={view_data} />}
                {(isset(tabId) && tabId == "local-attractions") && <LocalAttractions data={view_data} />}
                {(isset(tabId) && tabId == "market-listing") && <MarketListing data={view_data} />}
                {(isset(tabId) && tabId == "media-link") && <MediaLink data={view_data} />}
                {(isset(tabId) && tabId == "communication") && <Communication data={view_data} />}
                {/* <Routes>
                    <Route path="/inquiry/view/:viewId/primary" element= />
                    <Route path="/inquiry/view/:viewId/team-member-information" element={<InquiryViewHome />} />
                    <Route path="/inquiry/view/:viewId/lease-information" element={<InquiryViewHome />} />
                    <Route path="/inquiry/view/:viewId" element={<Navigate to={`/inquiry/view/${viewId}/primary`} replace />} />
                </Routes> */}
            </TabNavigation> 

            
        </div>
    )
}
export default PropertySetupView;
