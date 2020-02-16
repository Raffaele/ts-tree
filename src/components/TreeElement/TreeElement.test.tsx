import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TreeElementComponent } from './TreeElement';
import { TreeElement } from '../../types/TreeElement/TreeElement';
import { TreeNode } from '../../types/TreeNode/TreeNode';

configure({ adapter: new Adapter() });

describe('TreeElement component', () => {
    const innerElementLabel = 'inner-element-label';
    let innerElement :TreeElement;
    let wrapper :any;
    const addChild = jest.fn();
    const removeChild = jest.fn();
    const changeLabel = jest.fn();
    let originalWindowPrompt :any;
    let originalWindowPromptReturn :string;
    beforeAll(() => {
        originalWindowPrompt = window.prompt;
        originalWindowPromptReturn = 'hello';
        window.prompt = jest.fn().mockReturnValue(originalWindowPromptReturn);
    });
    afterAll(() => {
        window.prompt = originalWindowPrompt;
    });
    beforeEach(() => {
        innerElement = new TreeNode(innerElementLabel);
        wrapper = shallow(<TreeElementComponent elementIndex={2} element={innerElement} addChild={addChild} removeChild={removeChild} changeLabel={changeLabel} />)
    });
    describe('component label', () => {
        let labelDom :any;
        beforeEach(() => {
            labelDom = wrapper.find('.tree-element__label');
        });
        it('should show the correct text', () => {
            expect(labelDom.text()).toBe(innerElementLabel);
        });
        it('should update the label when the user click on the text', () => {
            labelDom.simulate('click');
            expect(changeLabel).toBeCalledWith('hello');
        });
    });

    describe('NodePanel', () => {
        describe('when the tree element is not a TreeNode', () => {
            it('should not be present', () => {
                innerElement = new TreeElement(innerElementLabel);
                wrapper = shallow(<TreeElementComponent elementIndex={2} element={innerElement} addChild={addChild} removeChild={removeChild} changeLabel={changeLabel} />)
                const $nodePanel = wrapper.find('TreeNodePanel');
                expect($nodePanel.length).toBe(0);
            });
        });
        describe('when the tree element is a TreeNode', () => {
            let $nodePanel :any;
            let nodeProps :any;
            beforeEach(() => {
                $nodePanel = wrapper.find('TreeNodePanel');
                nodeProps = $nodePanel.props();
            });
            it('should be present with appropriate attributes if element is a node', () => {
                expect($nodePanel.length).toBe(1);
                expect($nodePanel.props().node).toBe(innerElement);
            });
            it('should send command to add folder', () => {
                nodeProps.onAddFolder();
                expect(addChild).toBeCalledWith('hello', true);
            });
            it('should send command to add leaf', () => {
                nodeProps.onAddLeaf();
                expect(addChild).toBeCalledWith('hello', false);
            });
            it('should remove a child', () => {
                nodeProps.removeChild(3);
                expect(removeChild).toBeCalledWith(3);
            });
        });
    });
});
