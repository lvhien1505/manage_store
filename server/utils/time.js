const getTime = () => {
  let t = new Date();
  return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
};
function compareTime(a, b) {
  let arrayTimeHourA = a.createdHour.split(":");
  let arrayTimeHourB = b.createdHour.split(":");
  let arrayTimeDayA = a.createdDay.split("/");
  let arrayTimeDayB = b.createdDay.split("/");


  if (parseInt(arrayTimeDayA[2]) > parseInt(arrayTimeDayB[2])) {
    return -1;
  } else if (parseInt(arrayTimeDayA[2]) < parseInt(arrayTimeDayB[2])) {
    return 1;
  } else {
    if (parseInt(arrayTimeDayA[1]) > parseInt(arrayTimeDayB[1])) {
      return -1;
    } else if (parseInt(arrayTimeDayA[1]) < parseInt(arrayTimeDayB[1])) {
      return 1;
    } else {
      if (parseInt(arrayTimeDayA[0]) > parseInt(arrayTimeDayB[0])) {
        return -1;
      } else if (parseInt(arrayTimeDayA[0]) < parseInt(arrayTimeDayB[0])) {
        return 1;
      } else {
        if (parseInt(arrayTimeHourA[0]) > parseInt(arrayTimeHourB[0])) {
          return -1;
        } else if (parseInt(arrayTimeHourA[0]) < parseInt(arrayTimeHourB[0])) {
          return 1;
        } else {
          if (parseInt(arrayTimeHourA[1]) > parseInt(arrayTimeHourB[1])) {
            return -1;
          } else if (parseInt(arrayTimeHourA[1]) < parseInt(arrayTimeHourB[1])) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  }
  return 0;
}

const sortTimeArray = (list) => {
    return list.sort(compareTime)
};

module.exports = {
  getTime,
  sortTimeArray
};
