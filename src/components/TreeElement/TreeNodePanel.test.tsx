import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TreeNodePanel } from './TreeNodePanel';
import { TreeNode } from '../../types/TreeNode/TreeNode';
import { ITreeNode } from '../../types/TreeNodeInterface';

configure({ adapter: new Adapter() });

describe('TreeNodePanel component', () => {
    let wrapper :any;
    let innerElement :ITreeNode;
    let innerElementLabel :string;
    let addFolderFn;
    let addLeafFn;
    let removeChildFn;
    beforeEach(() => {
        innerElementLabel = 'inner label'
        innerElement = new TreeNode(innerElementLabel);
        innerElement.addChild(1);
        innerElement.addChild(7);
        innerElement.addChild(13);
        innerElement.addChild(213);
        addFolderFn = jest.fn();
        addLeafFn = jest.fn();
        removeChildFn = jest.fn();
        wrapper = shallow(<TreeNodePanel node={innerElement} onAddFolder={addFolderFn} onAddLeaf={addLeafFn} removeChild={removeChildFn} />)
    });
    it('should call the addFolderFn on click on the add-folder button', () => {
        const button = wrapper.find('.node-panel__add-folder');
        button.simulate('click');
        expect(addFolderFn).toBeCalledWith();
    });

    it('should call the addFolderFn on click on the add-leaf button', () => {
        const button = wrapper.find('.node-panel__add-leaf');
        button.simulate('click');
        expect(addLeafFn).toBeCalledWith();
    });

    describe('children', () => {
        let $li;
        beforeEach(() => {
            $li = wrapper.find('ul.tree-node__child-list>li');
        })
        it('should be in correct number', () => {
            expect($li.length).toBe(4);
        });
        it.only('should send the command to remove the child when the remove button is clicked', () => {
            $li.find('[data-selector="cmd-delete-2"]').simulate('click');
            expect(removeChildFn).toBeCalledWith(2);
        });
    });
});
