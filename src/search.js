
const defProperty = {
    id: 'id',
    title: 'title',
    children: 'children'
}
export default function search(tree, keyword, property){
    const {id, title, children} = {...defProperty, ...property}
    var tmpArr = [];

    var plainArr = [];
    var idItemMap = new Map();
    var idPidMap = new Map();
    
    tree.forEach((item,index)=>{
        tmpArr.push({
            pid:'',
            data:item
        });
    })
    while(tmpArr.length>0){
        var item = tmpArr.shift();
        var tmpId = item.data[id]
        idItemMap.set(tmpId,item.data);
        idPidMap.set(tmpId,item.pid);
        plainArr.push(item.data);
        item.data[children]?.forEach((child,index)=>{
            tmpArr.push({
                pid: tmpId,
                data: child
            })
        })
    }
    console.log(plainArr);
    var filteredArr = [];
    plainArr.forEach((item)=>{
        if(item[title]?.includes(keyword)){
            filteredArr.push(item)
        }
    })
    //console.log(filteredArr);
    // build tree
    var resMap = new Map();
    var resArr = [];
    filteredArr.forEach((item)=>{
        var tmpId = item[id];
        var subArr = item[children]
        if(resMap.has(tmpId)){
            return;
        }
        var curItem = {...item}
        resMap.set(tmpId,curItem);
        // find down
        if(subArr instanceof Array){
            var tmpSubArr = [...subArr];
            while(tmpSubArr.length>0){
                var tmpSubItem = tmpSubArr.shift();
                resMap.set(tmpSubItem[id],tmpSubItem);
                tmpSubItem[children]?.forEach((child,index)=>{
                    tmpSubArr.push(child)
                })
            }
        }
       
        // find up
        var loopId = idPidMap.get(tmpId);
        var loopItem = curItem;
        while(idPidMap.has(loopId)){
            if(resMap.has(loopId)){
                resMap.get(loopId)[children].push(loopItem);
                return;
            }
            var tmpItem = {...idItemMap.get(loopId)}
            tmpItem[children] = [loopItem];
            
            resMap.set(loopId,tmpItem)
            loopId = idPidMap.get(loopId);
            loopItem = tmpItem;
        }
       // console.log(loopItem)
        resArr.push(loopItem);
    })
    return resArr;
}
