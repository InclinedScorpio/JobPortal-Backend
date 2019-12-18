const jobData=(data) =>{
    for(let i=0;i<data.length;i++)
    {
        data[i]["id"]=data[i]["uuid"];
        delete data[i].uuid
    }
    let temp={}; //to wrap results
    temp["results"]=data;
    return temp;
}


const jobDataObject=(data) =>{
    let obj=data[0];
    obj["id"]=obj["uuid"];
    delete obj.uuid;
    return obj;
}



module.exports = {
    jobDataObject,
    jobData
}