import apiRequest from "../API/api";

const loadproducts = async ()=>{
    const response = await apiRequest('get','/data/products');
    if(response)
    {
        return response;
    }

}




const rundata = {
    loadproducts,
}

export default rundata;


