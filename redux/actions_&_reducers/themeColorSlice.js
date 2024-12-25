import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  textPrimaryColor: '#455A64',
  textSecondaryColor: '#616161',
  primaryColor: '#FFFAFF',
  primaryColor2: '#EAEAEE',
  secondaryColor: '#145792',
}

export const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState,
  reducers: {
    changeThemeColor: (state, { payload }) => {
      // state.primaryColor = action.payload
      state.textPrimaryColor = payload.textPrimaryColor;
      state.textSecondaryColor = payload.textSecondaryColor;
      state.primaryColor = payload.primaryColor;
      state.primaryColor2 = payload.primaryColor2;
      state.secondaryColor = payload.secondaryColor;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeThemeColor } = themeColorSlice.actions

export default themeColorSlice.reducer