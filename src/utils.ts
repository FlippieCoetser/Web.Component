export class Utils {
    static createComponent = <T>(tag, attributes?: any):T => {
        const component = document.createElement(tag);
            if (attributes != null) {
                Object.entries(attributes).forEach(attribute => {
                component.setAttribute(attribute[0], attribute[1]);
            })
        }
        document.body.appendChild(component);
        return component
    }
    static getValues = (keyValuePair: never) => {
        var values = [];
        Object.keys(keyValuePair).forEach(key => { values.push(keyValuePair[key])})
        return values
    }
    static getEnumLength = (typescriptEnum) => Object.keys(typescriptEnum).length

    static defineComponent = (tag: string, component) => {
        !customElements.get(tag) && customElements.define(tag, component)
    }

    static createTemplate = (id ,template?) => {
        let HTMLTemplate: HTMLTemplateElement= document.createElement("template");
        HTMLTemplate.innerHTML = template ?? ''
        HTMLTemplate.id = id;
        document.body.appendChild(HTMLTemplate);
        return HTMLTemplate;
    }
    static removeTemplate = (id) => {
        let HTMLTemplate = <HTMLTemplateElement>document.getElementById(id)
        HTMLTemplate.remove()
    }
}