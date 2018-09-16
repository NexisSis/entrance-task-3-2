import readContent from './readContent';
import writeContent from './writeContent';
import schedule from './schedule';
import http from 'http';

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'application/json'});
    var answ = JSON.stringify(schedule(readContent()),null,3);
    writeContent(answ);
    res.end(answ);

});



server.listen(3333);