import Validate from './validation.js'

/**
* @module Base
*/

export interface Configuration {
    id: string;
    root: ShadowRoot;
}

/**
* HTML Template with configuration validation
* @category Base
*/
export default class Template {
    static validateConfiguration = (configuration: Configuration) => 
        Validate.exist(configuration, 'id') && 
        Validate.type(configuration.id, 'string') ||
        Validate.exist(configuration, 'root') && 
        Validate.nodeType(configuration.root, Node.DOCUMENT_FRAGMENT_NODE)
    
    static verifyAvailability = (id: string) =>
        document.getElementById(id) === null ? Template.throwMissingTemplateError(id): undefined
    
    static getById = (id:string): HTMLTemplateElement =>
        document.getElementById(id) as HTMLTemplateElement

    static appendContentToRoot = (content: DocumentFragment, node: Node) =>
        node.appendChild(content.cloneNode(true))

    static throwMissingTemplateError = (id: string): boolean => {
        throw new Error(`Missing Template: No element with Id: ${id}, found`)
    }
    
    constructor(public configuration: Configuration) {
        Template.validateConfiguration(this.configuration)
        Template.verifyAvailability(this.configuration.id)
        this.load() 
    }

    public get content(): DocumentFragment { 
        return Template.getById(this.configuration.id).content
    }

    public load = () : void => {
        Template.appendContentToRoot(this.content, this.configuration.root)
    }
}