import { Utils } from "../src/utils.js";

// Template Unit Tests
import  { Template, Configuration  } from "../src/template.js";

const root = document.body.attachShadow({mode: 'open'})

describe('Given Template imported', () => {
    it('Then Template should be defined', () => {
        expect(Template).toBeDefined()
    })
    describe('Given a valid configuration defined', () => {
        const configuration: Configuration = {
            id: 'htmlTemplateId',
            root: root
        }
        it('Then configuration.id should be defined', () => {
            expect(configuration.id).toBeDefined()
        })
        it('Then configuration.id should be of type string', () => {
            expect(configuration.id).toBeInstanceOf(String)
        })
        it('Then configuration.root should be defined', () => {
            expect(configuration.root).toBeDefined()
        })
        it('Then configuration.root should be of type ShadowRoot', () => {
            expect(configuration.root).toBeInstanceOf(ShadowRoot)
        })
        describe('Given a HTML Template added to DOM', () => {
            let HTMLTemplate: HTMLTemplateElement;
            beforeEach(() => {
                HTMLTemplate = Utils.createTemplate(configuration.id, `<div>Hello World</div>`)
            })
            afterEach(() => {
                Utils.removeTemplate(configuration.id)
            })
            it('Then one HTML Template should exist in DOM', () => {
                expect(document.getElementsByTagName('template').length).toEqual(1)
            })
            describe('When instantiating a new Template(configuration)', () => {
                it('Then no missing field exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .not.toThrowError('Missing Field: Configuration.id')
                    expect(() => new Template(configuration))
                        .not.toThrowError('Missing Field: Configuration.root')
                })
                it('Then no invalid type exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .not.toThrowError(`Invalid Type: Configuration.id`)
                    expect(() => new Template(configuration))
                        .not.toThrowError(`Invalid Type: Configuration.root`)
                })
                it('Then no Missing Template exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .not.toThrowError(`Missing Template: No element with Id: ${configuration.id}, found`)
                })
                it('Then HTML Template content should equal Template.content', () => {
                    let template = new Template(configuration)
                    expect(HTMLTemplate.content).toBe(template.content)
                })
            })
        })
        describe('Given no HTML Template added to DOM', () => {
            it('Then no HTML Template should exist in DOM', () => {
                expect(document.getElementsByTagName('template').length).toEqual(0)
            })
            describe('When instantiating a new Template(configuration)', () => {
                it('Then no missing field exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .not.toThrowError('Missing Field: Configuration.id')
                    expect(() => new Template(configuration))
                        .not.toThrowError('Missing Field: Configuration.root')
                })
                it('Then no invalid type exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .not.toThrowError(`Invalid Type: Configuration.id`)
                    expect(() => new Template(configuration))
                        .not.toThrowError(`Invalid Type: Configuration.root`)
                })
                it('Then a Missing Template exception should be thrown', () => {
                    expect(() => new Template(configuration))
                        .toThrowError(`Missing Template: No element with Id: ${configuration.id}, found`)
                })
            })
        })
    })
    describe('Given a configuration with missing id defined', () => {
        const configuration: Configuration = { root: root } as unknown as Configuration
        it('Then configuration.id should not be defined', () => {
            expect(configuration.id).toBeUndefined()
        })
        describe('When instantiating a new Template(configuration)', () => {
            it('Then an missing field exception should be thrown', () => {
                expect(() => new Template(configuration))
                    .toThrowError(`Missing property: ${'id'} should exist`)
            })
        })
    })
    describe('Given a configuration with invalid id defined', () => {
        const configuration: Configuration = {
            id: 1,
            root: root
        } as unknown as Configuration;
        it('Then configuration.id should not be of type string', () => {
            expect(configuration.id).not.toBeInstanceOf(String)
        })
        describe('When instantiating a new Template(configuration)', () => {
            it('Then an invalid type exception should be thrown', () => {
                expect(() => new Template(configuration))
                    .toThrowError(`Invalid type: ${configuration.id} should be of type ${'string'}`)
            })
        })
    })
    describe('Given a configuration with missing root defined', () => {
        const configuration: Configuration = { id: 'htmlTemplateId' } as unknown as Configuration
        it('Then configuration.root should not be defined', () => {
            expect(configuration.root).toBeUndefined()
        })
        describe('When instantiating a new Template(configuration)', () => {
            it('Then an missing exception should be thrown', () => {
                expect(() => new Template(configuration))
                    .toThrowError(`Missing property: ${'root'} should exist`)
            })
        })
    })
    describe('Given a configuration with invalid root is defined', () => {
        const configuration: Configuration = {
            id: 'htmlTemplateId',
            root: 'invalidRoot' as unknown as ShadowRoot
        }
        it('Then configuration.root should not be of type ShadowRoot', () => {
            expect(configuration.root).not.toBeInstanceOf(ShadowRoot)
        })
        describe('When instantiating a new Template(configuration)', () => {
            it('Then an invalid type exception should be thrown ', () => {              
                expect(() => new Template(configuration))
                    .toThrowError(`Invalid nodeType: node should be of type ${Node.DOCUMENT_FRAGMENT_NODE}`)
            })
        })
    })
})