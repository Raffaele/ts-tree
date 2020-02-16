// import { ITreeElement } from '../types/TreeElementInterface';
import { ITreeNode } from '../../types/TreeNodeInterface';
import { TreeNode } from '../../types/TreeNode/TreeNode';
import { ITreeMapper } from '../../types/TreeMapperInterface';
import { TreeElement } from '../../types/TreeElement/TreeElement';

const defaultState :ITreeMapper = {
    elements: [ new TreeNode('ROOT') ]
};

export enum TreeReducerEvents {
    ADD_CHILD = 'TREE:ADD-CHILD',
    REMOVE_CHILD = 'TREE:REMOVE-CHILD',
    CHANGE_LABEL = 'TREE:CHANGE-LABEL',
};

export function treeReducer(state :ITreeMapper = defaultState, action :any) :ITreeMapper {
    let newState :ITreeMapper = cloneState(state);
    switch(action.type) {
        case TreeReducerEvents.ADD_CHILD:
            const nodeToAdd = action.isFolder ? new TreeNode(action.label) : new TreeElement(action.label);
            newState.elements.push(nodeToAdd);
            const parent = newState.elements[action.parentIndex] as ITreeNode;
            parent.addChild(newState.elements.length - 1);
            return newState;
        case TreeReducerEvents.REMOVE_CHILD:
            const parentElement = newState.elements[action.parentIndex] as ITreeNode;
            const elementIndexToRemove = parentElement.getChildIndex(action.childIndex);
            parentElement.removeChild(action.childIndex);
            delete newState.elements[elementIndexToRemove];
            return newState;
        case TreeReducerEvents.CHANGE_LABEL:
            newState.elements[action.treeElementIndex].setLabel(action.label);
            return newState;
        default:
            return newState;
    }
}

function cloneState(oldState :ITreeMapper) :ITreeMapper {
    return {
        elements: oldState.elements.map(el => el.clone())
    };
}
