export default class Validate {
    static type: (value: any, type: string) => any;
    static nodeType: (node: Node, type: any) => any;
    static exist: (object: any, property: string) => any;
    static throwInvalidType: (value: any, type: string) => never;
    static throwInvalidNodeType: (type: any) => never;
    static throwMissingProperty: (property: string) => never;
}
