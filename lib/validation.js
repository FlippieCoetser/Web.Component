export default class Validate {
}
Validate.type = (value, type) => typeof value !== type ? Validate.throwInvalidType(value, type) : undefined;
Validate.nodeType = (node, type) => node.nodeType !== type ? Validate.throwInvalidNodeType(type) : undefined;
Validate.exist = (object, property) => object[property] ?? Validate.throwMissingProperty(property);
Validate.throwInvalidType = (value, type) => {
    throw new Error(`Invalid type: ${value} should be of type ${type}`);
};
Validate.throwInvalidNodeType = (type) => {
    throw new Error(`Invalid nodeType: node should be of type ${type}`);
};
Validate.throwMissingProperty = (property) => {
    throw new Error(`Missing property: ${property} should exist`);
};
