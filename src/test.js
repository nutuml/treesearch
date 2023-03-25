import search from "../index.js"

const tree = [
    {
        id:1,
        title: 'abc',
        children: [
            {
                id: 11,
                title: 'aabb',
                children: [
                    {
                        id: 111,
                        title: 'ccc'
                    }
                ]
            }
        ]
    },
    {
        id:2,
        title: 'o2',
        children: [
            {
                id: 21,
                title: 'o21',
                children: [
                    {
                        id: 211,
                        title: 'o211'
                    }
                ]
            },
            {
                id: 22,
                title: 'o22',
                children: [
                    {
                        id: 221,
                        title: 'o221'
                    }
                ]
            }
        ]
    }
]
//var res = search(tree,'o22')
//console.log(JSON.stringify(res))


const t2 = [
    {
        userId: 'a',
        username: 'tom',
        cs:[
            {
                userId: 'ab',
                username: 'baby',
            },
            {
                userId: 'ac',
                username: 'cat',
            },
        ]
    },
    {
        userId: 'b',
        username: 'bob'
    },
    
]

var r2 = search(t2,'ba',{id:'userId',title:'username',children:'cs'})
console.log(JSON.stringify(r2))