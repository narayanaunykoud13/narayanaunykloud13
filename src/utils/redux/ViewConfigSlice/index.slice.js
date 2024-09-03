import { createSlice } from "@reduxjs/toolkit";

export const viewConfigSlice = createSlice({
  name: "task",
  initialState: {
    name: "",
    json: {
      records: {},
      availableFields: [],
      dataSources: [],
      visibleFilters: [],
      filters: {
        fixed: [],
        custom: [],
      },
      groupByFields: [],
    },
  },
  reducers: {
    saveViewConfigAction: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    saveViewRecordsAction: (state, action) => {
      let json = {};
      if (action.payload?.primary) {
        json.records = action.payload;
      } else {
        json = { ...state.json };
        json.records = {
          ...state?.json?.records,
          ...action?.payload,
        };
      }
      return (state = {
        ...state,
        json,
      });
    },
    saveAvailableFieldsAction: (state, action) => {
      return (state = {
        ...state,
        json: {
          ...state?.json,
          availableFields: action.payload,
        },
      });
    },
    addAvailableFieldsAction: (state, action) => {
      let incomingFields = action.payload?.map((field) => ({
        ...field,
        hidden: true,
      }));
      let availableFields = state.json.availableFields ?? [];
      return (state = {
        ...state,
        json: {
          ...state?.json,
          availableFields: [...availableFields, ...incomingFields],
        },
      });
    },
    hideShowAvailableFieldAction: (state, action) => {
      return (state = {
        ...state,
        json: {
          ...state?.json,
          availableFields: state?.json?.availableFields.map(
            (availableField) => {
              if (availableField?.internalid === action?.payload) {
                return {
                  ...availableField,
                  hidden: !availableField?.hidden,
                };
              }
              return availableField;
            }
          ),
        },
      });
    },
    saveDataSourcesAction: (state, action) => {
      return (state = {
        ...state,
        json: {
          ...state?.json,
          dataSources: action.payload,
        },
      });
    },
    saveVisibleFiltersAction: (state, action) => {
      return (state = {
        ...state,
        json: {
          ...state?.json,
          visibleFilters: action.payload,
        },
      });
    },
    addFilterAction: (state, action) => {
      let filters = state.json.filters || [];
      return (state = {
        ...state,
        json: {
          ...state?.json,
          filters: {
            ...filters,
            ...action.payload,
          },
        },
      });
    },
    addGroupByFieldAction: (state, action) => {
      return (state = {
        ...state,
        json: {
          ...state?.json,
          groupByFields: action.payload,
        },
      });
    },
  },
});

export const {
  addAvailableFieldsAction,
  saveViewRecordsAction,
  hideShowAvailableFieldAction,
  saveAvailableFieldsAction,
  saveDataSourcesAction,
  saveVisibleFiltersAction,
  saveViewConfigAction,
  addFilterAction,
  addGroupByFieldAction
} = viewConfigSlice.actions;

export const saveViewConfig = (data) => async (dispatch) => {
  try {
    dispatch(saveViewConfigAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const saveViewRecords = (data) => async (dispatch) => {
  try {
    dispatch(saveViewRecordsAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const addAvailableFields = (data) => async (dispatch) => {
  try {
    dispatch(addAvailableFieldsAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const saveAvailableFields = (data) => async (dispatch) => {
  try {
    dispatch(saveAvailableFieldsAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const hideShowAvailableField = (data) => async (dispatch) => {
  try {
    dispatch(hideShowAvailableFieldAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const saveDataSources = (data) => async (dispatch) => {
  try {
    dispatch(saveDataSourcesAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const saveVisibleFilters = (data) => async (dispatch) => {
  try {
    dispatch(saveVisibleFiltersAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const addFilter = (data) => async (dispatch) => {
  try {
    dispatch(addFilterAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const addGroupByFields = (data) => async (dispatch) => {
  try {
    dispatch(addGroupByFieldAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const selectViewConfig = (state) => state.viewConfig;

export default viewConfigSlice.reducer;
