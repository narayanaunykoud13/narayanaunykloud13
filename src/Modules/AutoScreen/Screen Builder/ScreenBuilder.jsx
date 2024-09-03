import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, isset, $ajax_post, FormControl, CrGridTable} from '../../../Library/Library';
import Header from '../../../Components/Header';
import ScreenBuilderList from './List';

import ScreenBuilderListMode from './ListMode.jsx'
import ScreenBuilderViewMode from './ViewMode.jsx'
import ScreenBuilderCreateMode from './CreateMode.jsx'

const ScreenBuilder = () => {
  let { ScreenMode, ScreenId } = useParams();
  // alert(ScreenMode)
  return (
      <div>
          <Header title="Screen Builder >> List"/>
          { ScreenMode == "create" && <ScreenBuilderCreateMode />}
          { ScreenMode === "list" && <ScreenBuilderListMode/>}
          { ScreenMode === "view" && <ScreenBuilderViewMode/>}
          { typeof ScreenMode == "undefined" && <ScreenBuilderList/>}
          
      </div>
  );
}

export default ScreenBuilder;

