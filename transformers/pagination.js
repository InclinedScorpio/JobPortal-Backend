module.exports={

    paginateResponse:(data,pageData)=>{

        let resultset={};
        resultset["count"]=data.total;
        resultset["limit"]=parseInt(pageData.limit);
        resultset["offset"]=pageData.offset;
        data["metadata"]=resultset;
        delete data.total;
        return data;

    }

}

// availableJobs["total"]=availableJobs.total;
// availableJobs=pagination.paginateResponse(availableJobs,pageDetail);




// let page=user.query.page;//by user
//         let limit=user.query.limit;//by user 
//         let offset=(page-1)*limit;

//         let pageDetail={
//             limit:user.query.limit,
//             page:page,
//             offset:offset
//         }