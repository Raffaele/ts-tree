import { TreeElementComponent } from './TreeElement';
// import { ITreeMapper } from '../../types/TreeMapperInterface';
import { store, IStore } from '../../engine/store';
import { connect } from 'react-redux';
import { TreeReducerEvents } from '../../engine/TreeReducer/treeReducer';

type PropsType = {
    elementIndex :number;
};

function mapDispatchToProps(dispatch :Function, params: PropsType) {
    const { elementIndex } = params;
    return {
        changeLabel: (newLabel :string) => {
            dispatch({
                type: TreeReducerEvents.CHANGE_LABEL,
                label: newLabel,
                treeElementIndex: elementIndex
            });
        },
        addChild: (childLabel :string, isFolder :boolean) => {
            dispatch({
                type: TreeReducerEvents.ADD_CHILD,
                label: childLabel,
                parentIndex: elementIndex,
                isFolder
            });
        },
        removeChild: (childIndex :number) => {
            dispatch({
                type: TreeReducerEvents.REMOVE_CHILD,
                parentIndex: elementIndex,
                childIndex
            })
        }
    };
}

function mapStateToProps ({ tree }: IStore, params: PropsType) {
    const { elements } = tree;
    const { elementIndex } = params;
    return { 
        elementIndex,
        element: elements[elementIndex]
     };
}
export const Node = connect(mapStateToProps, mapDispatchToProps)(TreeElementComponent);
