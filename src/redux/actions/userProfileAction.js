import axios from "axios"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiYzY5ZDQ1LWI5YTMtNDQ0MC1hNDhhLTZhMjMyZmE3OTYwMCIsImVtYWlsIjoiamFuZUBzZWVkLmNvbSIsInVzZXJfcm9sZSI6IjdhZGFlMmYxLTRkMzUtNDcwZC04NTEyLTFiOTYzNDMzMGE5ZSIsIm1hbmFnZXJJZCI6ImY2ODNjY2UxLWE0M2EtNDFhYS04ZmQ0LWYzY2I2OGU1ZDg2NSIsImlhdCI6MTY1OTE3NTE4MCwiZXhwIjoxNjU5MjYxNTgwfQ.d8emDSzpPgr2VUteSGPU1knYxfI6gtCX6ilQ5FQ-F8c"
export const userProfileAction =(id)=> async (dispatch) =>{
    const res = await axios.get(`https://winners-c8-bn-be-staging.herokuapp.com/api/trips/3`,
    {headers: {
        "Authorization": `Bearer ${token}`
      }}
    )
    dispatch({
      type: "GET_TRIP_BY_ID",
      payload: res.data,
    })
    
}