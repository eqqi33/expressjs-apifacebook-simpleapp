const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')(/*options*/);
const cn = 'postgres://postgres:admin123@127.0.0.1:5432/test_fd';
const db = pgp(cn);

let getPivotArray = (dataArray, mainIndex, rowIndex, colIndex, dataIndex) => {
  let result = {}, ret = [];
  let newCols = [];
  for (let i = 0; i < dataArray.length; i++) {
      if (!result[dataArray[i][rowIndex]]) {
        result[dataArray[i][mainIndex]] = {};
      }
      if(typeof rowIndex === "object"){
        result[dataArray[i][mainIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];
        for(let s=0;s < rowIndex.length;s++){
            result[dataArray[i][mainIndex]][rowIndex[s]] = dataArray[i][rowIndex[s]];
        }
      }else{
        result[dataArray[i][mainIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];
      }
      //To get column names
      if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
          newCols.push(dataArray[i][colIndex]);
      }
  }

  newCols.sort((a, b) => a - b);
  let item = [];
  //Add Header Row
  item.push(mainIndex);
  item.push.apply(item[0], rowIndex);
  if(typeof rowIndex === "object"){
    item.push.apply(item[0], newCols);
    ret.push(item[0]);
  }else{
    item.push.apply(item, newCols);
    ret.push(item);
  }
  //Add content 
  let headerKEY = [];
      headerKEY.push(mainIndex);
  for (let key in result) {
      item = [];
      item.push(key);
      if(typeof rowIndex === "object"){
        for (let i = 0; i < (headerKEY[0].length-newCols.length); i++) {
            if(typeof result[key][headerKEY[0][i]] !== "undefined"){
              item.push(result[key][headerKEY[0][i]] || "");
            }
        }
      }
      for (let i = 0; i < newCols.length; i++) {
          item.push(result[key][newCols[i]] || "0");
      }
      ret.push(item);
  }  return ret;
}

let arrayToHTMLTable = (myArray, changeNameColumn="", columnWhatChangeName="", dataChangeColumn="",intoColumn="", removeColumn="") => {
  let result = "";
  if(dataChangeColumn !== "" && typeof dataChangeColumn === "object"){ //normalization data to change
    let newData = [];
    for (let i = 0; i < myArray.length; i++) {
      let loopingData = []
      for (let j = 0; j < myArray[i].length; j++) {
        if(i > 0){ //data body
          if(intoColumn == j){ //data merge
            loopingData.push(myArray[i][dataChangeColumn[0]] +" "+ myArray[i][dataChangeColumn[1]]);
          }else{ //data normal
            let changeDesignElm = !isNaN(myArray[i][j])&&myArray[i][j]>0?'<span class=\'new badge\' data-badge-caption=\'\'>'+myArray[i][j]+'</span>':myArray[i][j];
            loopingData.push(changeDesignElm)
          }  
        }else{ // data header
          if(changeNameColumn !== "" && columnWhatChangeName !== "" && columnWhatChangeName == j ){
            loopingData.push(changeNameColumn.charAt(0).toUpperCase()+changeNameColumn.slice(1));//change the name one header table
          }else{
            loopingData.push(myArray[i][j].charAt(0).toUpperCase()+myArray[i][j].slice(1)); //normal
          }
        }
      }
      loopingData.splice(removeColumn,1);
      newData.push(loopingData)
    }
    for (let i = 0; i < newData.length; i++) {
      result += "<tr>";
      for (let j = 0; j < newData[i].length; j++) {
        result += "<td id='col-"+i+"-"+j+"'>" + newData[i][j] + "</td>";              
      }
      result += "</tr>";
    }    
  }else{
    for (let i = 0; i < myArray.length; i++) {
      result += "<tr>";
      for (let j = 0; j < myArray[i].length; j++) {
        result += "<td id='col-"+i+"-"+j+"'>" + myArray[i][j] + "</td>";              
      }
      result += "</tr>";
    }
  }
  return result;
}

router.get('/', function(req, res, next) {
  let sco; // shared connection object;
  db.connect()
  .then(obj => {
      // obj.client = new connected Client object;
      sco = obj; // save the connection object;
      // execute all the queries you need:
      return sco.any("SELECT * FROM transaction;");
  })
  .then(data => {
    // success
    let output = getPivotArray(data, ['firstname'], ['lastname','email'], 'item', 'quantity');
    let convertToTable = arrayToHTMLTable(output,"Full Name",0, [0,1],0,1);
    res.render('index', { dataAwal: data, dataPivot:convertToTable });      
  })
  .catch(error => {
    // error
    console.log('ERROR:', error)
  })
  .finally(() => {
      // release the connection, if it was successful:
      if (sco) {
          sco.done();
      }
  });  
});

module.exports = router;
module.exports.getPivotArray = getPivotArray;
module.exports.arrayToHTMLTable = arrayToHTMLTable;
