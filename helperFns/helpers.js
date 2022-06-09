
let jsonArrToCsv = (jsonObjArr) => {
  let excludeKeys = ['_id', '__v'];
  let excludeVals = Object.values
  let headers = Object.keys(jsonObjArr[0]).filter(ele => (excludeKeys.includes(ele) === false));
  let uppercaseHeader = headers.map(ele => ele.toUpperCase());
  let result = [uppercaseHeader];
  jsonObjArr.forEach(obj => {
    let vals = Object.values(obj);
    let len = vals.length;
    let partialVals = vals.slice(1, len-1);
    let applicationDateIndex = 2;
    let interviewDateIndex = 3;
    partialVals[2] = new Date(partialVals[2]).toLocaleDateString()
    if(partialVals[3]){
      partialVals[3] = new Date(partialVals[3]).toLocaleString().split(',').join(' ');
    } else {
      partialVals[3] = "Not Yet!"
    }

     result.push(partialVals);

  })

  var csv = result.join('\r\n');
  return csv;


}





module.exports = {
  jsonArrToCsv

}