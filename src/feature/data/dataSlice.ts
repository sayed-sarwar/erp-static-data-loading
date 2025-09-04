import { API_BASE_URL } from '@/utils/const'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import data from "../../../db.json";
import axios from 'axios'

export interface Userdata {
  value: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // Track API call status
  jsonData: {},
  selectedTemplatedata:{}
}

const initialState: Userdata = {
  value: [],
  status: 'idle',
  jsonData: {},
  selectedTemplatedata:{} 
  
}

// Async thunk for API call
export const fetchData = createAsyncThunk('userdata/fetchData', async () => {
  const response = await axios.get(API_BASE_URL) // Replace with your API URL
  return response.data
})

export const Userdataslice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    updateTemplateData: (state, action: PayloadAction<any>) => {
      state.selectedTemplatedata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded'
        state.value = action.payload
        state.jsonData =  data 
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default Userdataslice.reducer

export const { updateTemplateData } = Userdataslice.actions