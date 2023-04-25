export interface Configuration {
    id: string;
    root: ShadowRoot;
}
/**
 * HTML Template with configuration validation
 * @category Component
 */
export declare class Template {
    configuration: Configuration;
    static validateConfiguration: (configuration: Configuration) => any;
    static verifyAvailability: (id: string) => boolean;
    static getById: (id: string) => HTMLTemplateElement;
    static appendContentToRoot: (content: DocumentFragment, node: Node) => Node;
    static throwMissingTemplateError: (id: string) => boolean;
    constructor(configuration: Configuration);
    get content(): DocumentFragment;
    load: () => void;
}
