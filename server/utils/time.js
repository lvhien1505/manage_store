const getTime=()=>{
   let t=new Date();
   return `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()}`
}

module.exports={
    getTime
}