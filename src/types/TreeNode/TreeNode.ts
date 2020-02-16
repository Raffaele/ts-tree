import { ITreeNode, MapChildrenIterator } from '../TreeNodeInterface';
import { TreeElement } from '../TreeElement/TreeElement';

export class TreeNode extends TreeElement implements ITreeNode {
    private childrenIndex: number[] = [];
    mapChildren(iterator :MapChildrenIterator) {
        return this.childrenIndex.map(iterator);
    }
    removeChild(childIndex: number) {
        return this.childrenIndex.splice(childIndex, 1)[0];
    }
    addChild (childIndex: number) {
        this.childrenIndex.push(childIndex);
        return this.childrenIndex.length - 1;
    }
    getChildIndex(index :number) :number {
        return this.childrenIndex[index];
    }
    clone () {
        const cloneObj = new TreeNode(this.getLabel());
        cloneObj.setChildrenIndex(this.childrenIndex);
        return cloneObj;
    }
    private setChildrenIndex(childrenIndex :number[]) {
        this.childrenIndex = [...childrenIndex];
    }
}
