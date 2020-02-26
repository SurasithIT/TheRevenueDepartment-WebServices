var url = `https://rdws.rd.go.th/serviceRD3/vatserviceRD3.asmx?wsdl`;
console.log("VAT Service", url);

var request = require("request");
var fs = require("fs");

var specialRequest = request.defaults({
  agentOptions: {
    ca: fs.readFileSync("./adhq1.cer") //path of CA cert file
  }
});

var requestArgs = {
  username: "anonymous",
  password: "anonymous",
  TIN: "0107557000462", // if don't know can be un define
  Name: "", // if don't know can be un define
  ProvinceCode: "0", // if don't know can define as '0'
  BranchNumber: "60", // if don't know can define as '0'
  AmphurCode: "0" // if don't know can define as '0'
};

// requestArgs.TIN = "0105548115897";
var soap = require("soap");

var options = {
  request: specialRequest
};

soap.createClient(url, options, function(err, client) {
  if (err) {
    console.error(err);
    return;
  }
  //   console.log(client);
  client.Service(requestArgs, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(result.ServiceResult.vNID.anyType[0].$value);
    let ret = result.ServiceResult;
    for (var key in ret) {
      if (ret[key]) {
        let value = ret[key].anyType[0].$value;
        console.log(key, ":", value);
      }
    }
  });
});
