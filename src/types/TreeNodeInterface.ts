import { ITreeElement } from './TreeElementInterface';
import { Component } from 'react';

export type MapChildrenIterator = (childIndex :number, indexInList :number) => any;

export interface ITreeNode extends ITreeElement {
    mapChildren(callback :MapChildrenIterator) :any[];
    removeChild: (index :number) => number;
    addChild: (index: number) => number;
    getChildIndex: (index :number) => number;
}
