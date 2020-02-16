import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ITreeElement } from '../../types/TreeElementInterface';
import { ITreeNode } from '../../types/TreeNodeInterface';
import { TreeNodePanel } from './TreeNodePanel';

import './TreeElement.css';


type TreeElementPropsType = {
    elementIndex :number;
    element :ITreeElement;
    changeLabel :(newLabel :string) => void;
    removeChild :(childIndex :number) => void;
    addChild :(childLabel :string, isFolder :boolean) => void;
};

export function TreeElementComponent (props :TreeElementPropsType) {
    const treeNode = props.element as ITreeNode;
    function addChild({ isFolder } : { isFolder :boolean}) {
        // console.log('addalo', window.prompt);
        const childLabel = window.prompt('child label:');
        if (typeof childLabel === 'string') {
            props.addChild(childLabel, isFolder);
        }
    }
    function changeLabel() {
        const newLabel = window.prompt('new label:', props.element.getLabel());
        if (typeof newLabel === 'string') {
            props.changeLabel(newLabel);
        }
    }
    return <Row className="tree-node">
        <Col>
            <p>
                <span className="tree-element__label"  onClick={changeLabel}>
                    {props.element.getLabel()}
                </span>
            </p>
            {treeNode.mapChildren && <TreeNodePanel
                                        onAddFolder={() => addChild({ isFolder: true })}
                                        onAddLeaf={() => addChild({ isFolder: false })}
                                        node={ treeNode }
                                        removeChild={props.removeChild}
                                    /> }
        </Col>
    </Row>;
}
