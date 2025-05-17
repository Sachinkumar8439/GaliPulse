import apiRequest from "../API/api";

const createuser = async (data)=>{
    const response = await apiRequest('post','/createuser',data);
    if(response)
    {
        return response;
    }

}

const loginuser = async (data)=>{
    const response = await apiRequest('post','/loginuser',data);
    if(response)
    {
        return response;
    }

}


const useraction = {
    createuser,
    loginuser,
}

export default useraction;

