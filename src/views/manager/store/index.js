// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'core/utility/hooks/useAxios';

export const getStates = createAsyncThunk('appManager/getStates', async params => {
  const response = await axios.get('/api/admin/states', { params })
  return {
    data: response.data.data.data,
    total: response.data.data.total
  }
});

export const deleteState = createAsyncThunk('appManager/deleteState', async (uuid, { dispatch, getState }) => {
  await axios.delete(`/api/admin/states/delete/${uuid}`);
  return await dispatch(getStates(getState()));
});

export const getLgas = createAsyncThunk('appManager/getLgas', async params => {
  const response = await axios.get('/api/admin/lgas', { params })
  return {
    data: response.data.data.data,
    total: response.data.data.total
  }
});

export const deleteLga = createAsyncThunk('appManager/deleteLga', async (id, { dispatch, getState }) => {
  await axios.delete(`/api/admin/lgas/delete/${id}`);
  return await dispatch(getLgas(getState()));
});

export const getWards = createAsyncThunk('appManager/getWards', async params => {
  const response = await axios.get('/api/admin/wards', { params })
  return {
    data: response.data.data.data,
    total: response.data.data.total
  }
});

export const deleteWard = createAsyncThunk('appManager/deleteWard', async (id, { dispatch, getState }) => {
  await axios.delete(`/api/admin/wards/delete/${id}`);
  return await dispatch(getWards(getState()));
});

export const getPollingUnits = createAsyncThunk('appManager/getPollingUnits', async params => {
  const response = await axios.get('/api/admin/pollingUnits', { params })
  return {
    data: response.data.data.data,
    total: response.data.data.total
  }
});

export const deletePollingUnit = createAsyncThunk('appManager/deletePollingUnit', async (id, { dispatch, getState }) => {
  await axios.delete(`/api/admin/pollingUnits/delete/${id}`);
  return await dispatch(getPollingUnits(getState()));
});

export const appManagerSlice = createSlice({
  name: 'appManager',
  initialState: {
    states: [],
    lgas: [],
    wards: [],
    pollingUnits: [],
    total: 1
  },
  reducers: {
    // selectState: (state, action) => {
    //   if (action.payload === null) {
    //     state.states = []
    //   } else {
    //     state.states = action.payload
    //   }
    // }
  },
  extraReducers: builder => {
    builder.addCase(getStates.fulfilled, (state, action) => {
      state.states = action.payload.data
      state.total = action.payload.totalPages
    });
    builder.addCase(getLgas.fulfilled, (state, action) => {
      state.lgas = action.payload.data
      state.total = action.payload.totalPages
    });
    builder.addCase(getWards.fulfilled, (state, action) => {
      state.wards = action.payload.data
      state.total = action.payload.totalPages
    });
    builder.addCase(getPollingUnits.fulfilled, (state, action) => {
      state.pollingUnits = action.payload.data
      state.total = action.payload.totalPages
    });
  }
})

// export const { selectState } = appManagerSlice.actions

export default appManagerSlice.reducer
