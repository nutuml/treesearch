"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var defProperty = {
    id: 'id',
    title: 'title',
    children: 'children'
};
function checkExpand(expandedKeys, loopId, idPidMap) {
    do {
        if (!expandedKeys.includes(loopId)) {
            expandedKeys.push(loopId);
            loopId = idPidMap.get(loopId);
        }
        else {
            return;
        }
    } while (idPidMap.has(loopId));
}
function toPlain(tree, idPidMap, idItemMap, id, children) {
    var _a;
    var plainArr = [];
    var tmpArr = [];
    tree.forEach(function (item, index) {
        tmpArr.push({
            pid: '',
            data: item
        });
    });
    while (tmpArr.length > 0) {
        var item = tmpArr.shift();
        var tmpId = item.data[id];
        if (tmpId === item.pid) {
            // may be in loop forever.
            console.log('id and pid CAN NOT be same.', tmpId);
            continue;
        }
        idItemMap.set(tmpId, item.data);
        idPidMap.set(tmpId, item.pid);
        plainArr.push(item.data);
        (_a = item.data[children]) === null || _a === void 0 ? void 0 : _a.forEach(function (child, index) {
            tmpArr.push({
                pid: tmpId,
                data: child
            });
        });
    }
    return plainArr;
    // console.log(plainArr);
}
function search(tree, keyword, property) {
    var _a = __assign(__assign({}, defProperty), property), id = _a.id, title = _a.title, children = _a.children;
    var idItemMap = new Map();
    var idPidMap = new Map();
    var plainArr = toPlain(tree, idPidMap, idItemMap, id, children);
    var filteredArr = [];
    plainArr.forEach(function (item) {
        var _a;
        if ((_a = item[title]) === null || _a === void 0 ? void 0 : _a.includes(keyword)) {
            filteredArr.push(item);
        }
    });
    //console.log(filteredArr);
    // build tree
    var resMap = new Map();
    var treeData = [];
    var expandedKeys = [];
    filteredArr.forEach(function (item) {
        var _a;
        var tmpId = item[id];
        var subArr = item[children];
        var loopId = idPidMap.get(tmpId);
        if (resMap.has(tmpId)) {
            checkExpand(expandedKeys, loopId, idPidMap);
            return;
        }
        var curItem = __assign({}, item);
        resMap.set(tmpId, curItem);
        // find down
        if (subArr instanceof Array) {
            var tmpSubArr = __spreadArray([], subArr, true);
            while (tmpSubArr.length > 0) {
                var tmpSubItem = tmpSubArr.shift();
                resMap.set(tmpSubItem[id], tmpSubItem);
                (_a = tmpSubItem[children]) === null || _a === void 0 ? void 0 : _a.forEach(function (child, index) {
                    tmpSubArr.push(child);
                });
            }
        }
        // find up
        var loopItem = curItem;
        while (idPidMap.has(loopId)) {
            if (resMap.has(loopId)) {
                resMap.get(loopId)[children].push(loopItem);
                checkExpand(expandedKeys, loopId, idPidMap);
                return;
            }
            if (!expandedKeys.includes(loopId)) {
                expandedKeys.push(loopId);
            }
            var tmpItem = __assign({}, idItemMap.get(loopId));
            tmpItem[children] = [loopItem];
            resMap.set(loopId, tmpItem);
            loopId = idPidMap.get(loopId);
            loopItem = tmpItem;
        }
        // console.log(loopItem)
        treeData.push(loopItem);
    });
    return {
        expandedKeys: expandedKeys,
        treeData: treeData
    };
}
exports.default = {
    search: search
};
