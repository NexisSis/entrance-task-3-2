import fs from 'fs';

export default function readContent(){
    var input = fs.readFileSync('./input.json', 'utf8');
    var content = JSON.parse(input);
    if(!content.devices){
        console.log('Devices is empty');
        process.exit();
    }
    if(!content.rates){
        console.log('Rates is empty');
        process.exit();
    }
    if(!content.maxPower){
        console.log('Max Power is empty');
        process.exit();
    }
    return content;
}