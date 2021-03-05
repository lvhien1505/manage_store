export const convertNameToPath = (name, id) => {
  let nameLowerCase = name.toLowerCase();
  let arr = nameLowerCase.split(" ");
  let pathStart = "";
  arr.forEach((e, k) => {
      if (!e || e == "-") {
        return ;
      }
      k === 0 ? (pathStart = e) : (pathStart = pathStart + "-" + e);
  });
  let pathEnd= id.slice(14) + id.slice(0,8) +"." + id.slice(8,14) 
  let pathStr = pathStart + "-" + pathEnd;
  return pathStr;
};

export const convertStringToId = (stringId) => {
  let arr= stringId.split(".")
  let idStart=arr[0].slice(arr.length-10)
  let idMid=arr[1];
  let idEnd=arr[0].slice(0,arr.length-10)
  return idStart + idMid + idEnd;
};

export const convertStringNameTag = (name) => {
  let nameLowerCase = name.toLowerCase();
  let arr= nameLowerCase.split(" ")
  let nameTag=""
  arr.forEach((e,k)=>{
    if (!e || e == "-") {
      return ;
    }
     k===0 ? (nameTag = e) : nameTag = nameTag + "-" + e
  })
  return nameTag;
};


export const convertDay=(data)=>{
  let date = new Date(data);
  let day = date.getDate()
  let month = date.getMonth();
  let year =date.getFullYear(); 
  return `${day}/${month}/${year}`
}
