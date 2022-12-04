const jsonArrToCsv = (jsonObjArr) => {
  const excludeKeys = ["_id", "__v"];
  const excludeVals = Object.values;
  const headers = Object.keys(jsonObjArr[0]).filter(
    (ele) => excludeKeys.includes(ele) === false
  );
  const uppercaseHeader = headers.map((ele) => ele.toUpperCase());
  const result = [uppercaseHeader];
  jsonObjArr.forEach((obj) => {
    const vals = Object.values(obj);
    const len = vals.length;
    const partialVals = vals.slice(1, len - 1);
    const applicationDateIndex = 2;
    const interviewDateIndex = 3;
    partialVals[2] = new Date(partialVals[2]).toLocaleDateString();
    if (partialVals[3]) {
      partialVals[3] = new Date(partialVals[3])
        .toLocaleString()
        .split(",")
        .join(" ");
    } else {
      partialVals[3] = "Not Yet!";
    }

    result.push(partialVals);
  });

  const csv = result.join("\r\n");
  return csv;
};

// helper function to check if any of the strings in the array contains the keyword
const checkContains = (strArr, keyword) => {
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i].indexOf(keyword) > -1) {
      return true;
    }
  }
  return false;
};

module.exports = {
  jsonArrToCsv,
  checkContains,
};
