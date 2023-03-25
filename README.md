# tree search easy

tree-search-easy is a library to make tree-search easy. 

for follow data:
```
- a
  - b
    - c
- 2
```
search b will return
```
- a
  - b
    - c
```
this means the search will return: 
1. matched items
2. parent items of matched items
3. all children items in matched items

## install
```
# use npm
npm install tree-search-easy

# or use yarn 
yarn add tree-search-easy

```

## Usage

```
import tse from 'tree-search-easy'


const treeData = [
    {
        id:'1',
        title: 'a',
        children: [
            {
                id: '11',
                title: 'b',
                children: [
                    {
                        id: '111',
                        title: 'c'
                    }
                ]
            }
        ]
    },
    {
        id:'2',
        title: '2'
    }
]
var rt = tse.search(treeData,'bb')
console.log(JSON.stringify(rt))
```
this code will output: 

```
{
  "expandedKeys": ["1"],
  "treeData": [
    {
      "id": "1",
      "title": "a",
      "children": [
        {
          "id": "11",
          "title": "b",
          "children": [{ "id": "111", "title": "c" }]
        }
      ]
    }
  ]
}
```
we return expandedKeys in order to make UI to show all the matched items, but do not expand the unmatched children.
so you need to use treeData to get the tree data.
## Field Config
By default we use id, title, children as default fields in tree. It's easy to use your own config via

```
tse.search(treeData,'bb',{
    id:'userId',
    title:'username',
    children:'cs'
})
```
the code above is for data as follow: 

```
[{
    userId: '1',
    username: 'a',
    cs:[
        {
            userId: '11',
            username: 'ab',
        }
    ]
}]
```

## Limit
No multiple items with the same id. id is required to be unique.