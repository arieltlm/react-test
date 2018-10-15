console.warn('Mock script is deprecated, use standalone play backend instead.');
const http = require('http');

const resultWrapper = (data = {}) => {
  return JSON.stringify({
    success: true,
    result: data
  });
};

const operators =
  [
    {id:1, name: 'ReadCSV', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:2, name: 'PrintDataFrame', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:3, name: 'FieldsInputDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:4, name: 'TriggerParamDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:5, name: 'DynamicInputDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:6, name: 'ModelOutputDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:7, name: 'ModelInputDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:8, name: 'LongRunDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:9, name: 'MatplotDemo', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:10, name: 'ErrorOp', operatorTag: 'io,preProcess', operatorPackage: 'python'},
    {id:11, name: 'ChineseCharTest', operatorTag: 'io,preProcess', operatorPackage: 'python'}
  ].map((op) => ({
    ...op,
    content: JSON.stringify(require('../../develop/resources/json/operators/python/' + op.name))
  }));

const project = {
  'id': 1,
  'name': 'demo',
  'versionContent': JSON.stringify(require('../../develop/resources/json/dags/dag')),
};

const auth = {
  'success': true,
};

const admin = {
  id: 1,
  name: 'admin',
  email: 'admin',
  fullname: 'admin',
  role: 'admin',
};

const visitor = {
  id: 2,
  name: 'visitor',
  email: 'visitor',
  fullname: 'visitor',
  role: 'visitor',
};

http.createServer((req, res) => {
  let user = null;
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Cache-Control'
  });
  if (req.method === 'OPTIONS') {
    res.end('{}');
  }
  if (req.method === 'GET') {
    res.end('HELLO');
  }
  if (req.method === 'POST') {
    if (req.url === '/bus/project/show') {
      console.log(resultWrapper(project));
      res.end(resultWrapper(project));
    } else if (req.url === '/bus/operator/list') {
      console.log(resultWrapper(operators));
      res.end(resultWrapper(operators));
    } else if (req.url === '/bus/login') {
      console.log(JSON.stringify(Object.keys(req)));
      res.end(resultWrapper());
    } else if (req.url === '/bus/user/info') {
      res.end(resultWrapper(admin));
    }
  }
}).listen(9000);
console.log('正在监听9000端口');
