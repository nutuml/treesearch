interface TreeConfig {
    id: string;
    title: string;
    children: string;
}
declare function search(tree: Array<Object>, keyword: string, property: TreeConfig): {
    expandedKeys: any[];
    treeData: any[];
};
declare const _default: {
    search: typeof search;
};
export default _default;
