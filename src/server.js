const http = require('http');
const fs = require('fs');



const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'application/json'});
        var obj;
        var a='hey';
        fs.readFile('input.json', 'utf8', function (err, data) {
            if (err) console.log(err);
            //obj = JSON.parse(data);
            obj = JSON.parse(data);
            res.end(JSON.stringify(obj,null,3));
        });
});


server.listen(3333);