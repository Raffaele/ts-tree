import { TreeElement } from './TreeElement';

describe('TreeElement class', () => {
    const initialLabel = 'initial label';
    let treeElement;
    beforeEach(() => {
        treeElement = new TreeElement(initialLabel);
    });
    describe('label', () => {
        it('should allow to read the label used in the constructor', () => {
            expect(treeElement.getLabel()).toBe(initialLabel);
        });
        it('should set the new label', () => {
            const newLabel = 'new label';
            treeElement.setLabel(newLabel);
            expect(treeElement.getLabel()).toBe(newLabel);
        });
    });
    describe('clone functionality', () => {
        let clonedTreeElement :TreeElement;
        beforeEach(() => {
            clonedTreeElement = treeElement.clone();
        });
        it('should not be the original one', () => {
            expect(clonedTreeElement).not.toBe(treeElement);
        });
        it('should have same label', () => {
            expect(clonedTreeElement.getLabel()).toBe(initialLabel);
        });
    });
});