import React from 'react';
import { Button } from 'react-bootstrap';
import { ITreeNode } from '../../types/TreeNodeInterface';
import { FaPlus, FaFileAlt, FaFolder, FaTrash } from 'react-icons/fa';
import { Node } from './TreeElementData';

type NodePanelPropsType = {
    onAddFolder: () => void;
    onAddLeaf: () => void;
    node :ITreeNode;
    removeChild :(childIndexInList :number) => void;
};

export function TreeNodePanel (props :NodePanelPropsType) {
    const { onAddLeaf, onAddFolder, node, removeChild } = props;
    return <div>
        <div className="node-panel">
            <Button onClick={onAddLeaf} className="node-panel__add-leaf">
                <FaPlus />
                <FaFileAlt />
            </Button>
            <Button onClick={onAddFolder} className="node-panel__add-folder">
                <FaPlus />
                <FaFolder />
            </Button>
        </div>
        <ul className="tree-node__child-list">
            {node.mapChildren((childIndex :number, indexInList :number) => <li key={childIndex}>
                <Button onClick={() => removeChild(indexInList)} data-selector={`cmd-delete-${indexInList}`} className="tree-node__child-list-item__remove-cmd">
                    <FaTrash />
                </Button>
                <Node elementIndex={childIndex} />
            </li>)}
        </ul>
    </div>;
}