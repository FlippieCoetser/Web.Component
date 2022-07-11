export default class Validate {
    static type = (value: any, type: string) => 
        typeof value !== type ? Validate.throwInvalidType(value, type): undefined;
    
    static nodeType = (node: Node, type) => 
        node.nodeType !== type ? Validate.throwInvalidNodeType(type): undefined;

    static exist = (object: any, property: string) => 
        object[property] ?? Validate.throwMissingProperty(property)
    
    static throwInvalidType = (value: any, type: string) => {
        throw new Error(`Invalid type: ${value} should be of type ${type}`)
    }

    static throwInvalidNodeType = (type) => {
        throw new Error(`Invalid nodeType: node should be of type ${type}`)
    }

    static throwMissingProperty = (property: string) => { 
        throw new Error(`Missing property: ${property} should exist`)
    }
}