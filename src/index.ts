interface TreeConfig {
    id: string;
    title: string;
    children: string;
}
const defProperty = {
    id: 'id',
    title: 'title',
    children: 'children'
}
function checkExpand(expandedKeys:Array<string>, loopId:string, idPidMap:Map<string,string>){
    do{
        if(!expandedKeys.includes(loopId)){
            expandedKeys.push(loopId);
            loopId = idPidMap.get(loopId);
        }else{
            return;
        }
    }while(idPidMap.has(loopId))
}
function toPlain(tree: Array<Object>, idPidMap:Map<string,string>, idItemMap:Map<string,Object>, id:string, children:string){
    var plainArr = [];
    var tmpArr = [];
    tree.forEach((item,index)=>{
        tmpArr.push({
            pid:'',
            data:item
        });
    })
    while(tmpArr.length>0){
        var item = tmpArr.shift();
        var tmpId = item.data[id]
        if(tmpId===item.pid){
            // may be in loop forever.
            console.log('id and pid CAN NOT be same.', tmpId)
            continue;
        }
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
    return plainArr;
   // console.log(plainArr);
}
 function search(tree: Array<Object>, keyword: string, property: TreeConfig){
    const {id, title, children} = {...defProperty, ...property}
    var idItemMap = new Map();
    var idPidMap = new Map();
    var plainArr = toPlain(tree,idPidMap, idItemMap, id, children);
    
    var filteredArr = [];
    plainArr.forEach((item)=>{
        if(item[title]?.includes(keyword)){
            filteredArr.push(item)
        }
    })
    //console.log(filteredArr);
    // build tree
    var resMap = new Map();
    var treeData = [];
    var expandedKeys = [];
    filteredArr.forEach((item)=>{
        var tmpId = item[id];
        var subArr = item[children]
        var loopId = idPidMap.get(tmpId);
        if(resMap.has(tmpId)){
            checkExpand(expandedKeys,loopId,idPidMap);
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
        var loopItem = curItem;
        while(idPidMap.has(loopId)){
            if(resMap.has(loopId)){
                resMap.get(loopId)[children].push(loopItem);
                checkExpand(expandedKeys,loopId,idPidMap);
                return;
            }
            if(!expandedKeys.includes(loopId)){
                expandedKeys.push(loopId);
            }
            var tmpItem = {...idItemMap.get(loopId)}
            tmpItem[children] = [loopItem];
            
            resMap.set(loopId,tmpItem)
            loopId = idPidMap.get(loopId);
            loopItem = tmpItem;
        }
       // console.log(loopItem)
        treeData.push(loopItem);
    })
    return {
        expandedKeys,
        treeData
    };
}

export default {
    search
}