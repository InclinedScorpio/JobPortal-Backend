const transformAll = (data) => {
    const result = data.map(({uuid, job_title, job_description})=>{
        id: uuid,
        job_title,
        job_description
    })
}

module.exports = {
    transformAll
}