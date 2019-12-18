module.exports={

    paginateResponse:(data,pageData)=>{
        let outerset={};
        let resultset={};
        resultset["count"]=data.total;
        resultset["limit"]=parseInt(pageData.limit);
        resultset["offset"]=pageData.offset;
        delete data.total;

        outerset["data"]=data.results;
        outerset["metadata"]=resultset;
        return outerset;
    }

}