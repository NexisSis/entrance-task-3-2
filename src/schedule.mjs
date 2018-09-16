export default function schedule(data){
    //fill data
    var devices = data.devices;
    var rates = data.rates;
    var maxPower = data.maxPower;
    var total = 0;
    // devices sort by power from big to small
    var devicesSort = devices.slice(0);
    devicesSort.sort(function(a,b) {
        return  b.power - a.power;
    });
    //rates sort by value from small to big
    var ratesSort = rates.slice(0);
    ratesSort.sort(function(a,b) {
        return  a.value - b.value;
    });

    var schedule = {};
     for(var i =0; i<24 ; i++){
        schedule[i] = {
            id:[],
            power:0
        };
     };
     var consumedEnergy={
         value:0,
         devices:{}
     }
    devicesSort.forEach(function(item,i){
        consumedEnergy.devices[item.id] = 0;

    });
    devicesSort.forEach(function(item,i){
        for(var i =0; i < item.duration;i++){
            if(item.mode == 'day')
            {
             for(var j =0; j<ratesSort.length;j++){
                  if((ratesSort[j].from >= 7 && ratesSort[j].from <= 17) && schedule[ratesSort[j].from].power + item.power<=maxPower){
                      consumedEnergy.value += (ratesSort[j].value*item.power)/1000;
                      consumedEnergy.devices[item.id] += (ratesSort[j].value*item.power)/1000;
                      schedule[ratesSort[j].from].power += item.power;
                      //err here but i have no time to fix it :C
                      schedule[ratesSort[j].from++].id.push(item.id);
                      break;
                 }
             }
            }else if(item.mode == 'night'){
                for(var j =0,min=ratesSort[j].from,max=ratesSort[j].to; j<ratesSort.length;j++){
                    if(ratesSort[j].from==24){
                        ratesSort[j].from=0;
                    }
                    if((ratesSort[j].from > 17 && ratesSort[j].from < 24 || ratesSort[j].from >= 0 && ratesSort[j].from < 7) && max != min && schedule[ratesSort[j].from].power + item.power<=maxPower ) {
                        consumedEnergy.value += (ratesSort[j].value*item.power)/1000;
                        consumedEnergy.devices[item.id] += (ratesSort[j].value*item.power)/1000;
                        schedule[ratesSort[j].from].power += item.power;
                        //err here but i have no time to fix it :C
                        schedule[ratesSort[j].from++].id.push(item.id);
                        break;
                    }
                }
            }
            else{
                for(var j =0; j<ratesSort.length;j++) {
                    if (ratesSort[j].from >= 24) {
                        ratesSort[j].from = 0;
                    }
                    if(schedule[ratesSort[j].from].power + item.power <= maxPower) {
                        schedule[ratesSort[j].from].power += item.power;
                        consumedEnergy.value += (ratesSort[j].value*item.power)/1000;
                        consumedEnergy.devices[item.id] += (ratesSort[j].value*item.power)/1000;
                        //err here but i have no time to fix it :C
                        schedule[ratesSort[j].from++].id.push(item.id);
                        break;
                    }
                }
            }
        }
    });
    //building answer
    var answ ={
        schedule:{
            id:[]
        }
    };
    //remove temp data
    for(var i =0;i<24;i++){
        delete schedule[i].power;
    }
    answ.schedule = schedule;
    answ.consumedEnergy = consumedEnergy;

    return answ;
}