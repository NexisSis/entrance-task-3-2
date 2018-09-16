import fs from 'fs';
export default function writeContent(answ){
    fs.writeFileSync('output.json', answ);
}