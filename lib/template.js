import Validate from './validation.js';
/**
* HTML Template with configuration validation
* @category Base
*/
export default class Template {
    constructor(configuration) {
        this.configuration = configuration;
        this.load = () => {
            Template.appendContentToRoot(this.content, this.configuration.root);
        };
        Template.validateConfiguration(this.configuration);
        Template.verifyAvailability(this.configuration.id);
        this.load();
    }
    get content() {
        return Template.getById(this.configuration.id).content;
    }
}
Template.validateConfiguration = (configuration) => Validate.exist(configuration, 'id') &&
    Validate.type(configuration.id, 'string') ||
    Validate.exist(configuration, 'root') &&
        Validate.nodeType(configuration.root, Node.DOCUMENT_FRAGMENT_NODE);
Template.verifyAvailability = (id) => document.getElementById(id) === null && Template.throwMissingTemplateError(id);
Template.getById = (id) => document.getElementById(id);
Template.appendContentToRoot = (content, node) => node.appendChild(content.cloneNode(true));
Template.throwMissingTemplateError = (id) => {
    throw new Error(`Missing Template: No element with Id: ${id}, found`);
};
