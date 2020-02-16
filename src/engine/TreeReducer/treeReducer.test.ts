import { treeReducer, TreeReducerEvents } from './treeReducer';
import { ITreeMapper } from '../../types/TreeMapperInterface';
import { TreeElement } from '../../types/TreeElement/TreeElement';
import { TreeNode } from '../../types/TreeNode/TreeNode';
import { ITreeNode } from '../../types/TreeNodeInterface';

describe('treeReducer reducer', () => {
    let initialState :ITreeMapper;
    let eventName :TreeReducerEvents;
    beforeEach(() => {
        initialState = {
            elements: [
                new TreeElement('my test'),
                new TreeNode('another test'),
                new TreeElement('my last test'),
                new TreeNode('a test again')
            ]
        };
    });
    describe('CHANGE-LABEL event', () => {
        beforeEach(() => {
            eventName = TreeReducerEvents.CHANGE_LABEL;
        });
        it('should change the label to a particular node element', () => {
            const newState = treeReducer(initialState, {
                type: eventName,
                treeElementIndex: 1,
                label: 'hello test'
            });

            expect(newState.elements[1].getLabel()).toEqual('hello test');
        });
    });
    describe('ADD_CHILD event', () => {
        beforeEach(() => {
            eventName = TreeReducerEvents.ADD_CHILD;
        });
        it('should add a child index to a particular tree element and add the element in the `elements` array of the state', () => {
            const newState = treeReducer(initialState, {
                type: eventName,
                parentIndex: 1,
                label: 'child-label',
                isFolder: true
            });
            expect(newState.elements.length).toBe(5);
            expect(newState.elements[1]).toEqual({
                childrenIndex: [4],
                label: 'another test'
            });
            expect(newState.elements[4]).toEqual({
                childrenIndex: [],
                label: 'child-label'
            });
        });

        it('should add a child index to a particular tree element and add the element in the `elements` array of the state', () => {
            const newState = treeReducer(initialState, {
                type: eventName,
                parentIndex: 3,
                label: 'child-label',
                isFolder: false
            });
            expect(newState.elements.length).toBe(5);
            expect(newState.elements[3]).toEqual({
                childrenIndex: [4],
                label: 'a test again'
            });
            expect(newState.elements[4]).toEqual({
                label: 'child-label'
            });
        });
    });
    describe('REMOVE_CHILD event', () => {
        beforeEach(() => {
            eventName = TreeReducerEvents.REMOVE_CHILD;
            (initialState.elements[1] as ITreeNode).addChild(2);
            (initialState.elements[1] as ITreeNode).addChild(3);
        });

        it('should remove the first child of element 1', () => {
            const newState = treeReducer(initialState, {
                type: eventName,
                parentIndex: 1,
                childIndex: 1
            });

            expect(newState.elements[3]).toBeUndefined();
            expect((newState.elements[1] as ITreeNode).mapChildren(x=>x))
                .toEqual([2]);
        });
    });
});
