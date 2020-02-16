import { TreeNode } from './TreeNode';

describe('TreeNode class', () => {
    const initialLabel = 'initial label';
    let treeNode :TreeNode;
    beforeEach(()=>{
        treeNode = new TreeNode(initialLabel);
        treeNode.addChild(1);
        treeNode.addChild(5);
        treeNode.addChild(8);
        treeNode.addChild(11);
    });
    describe('children methods', () => {
        it('should add the children address', () => {
            expect(treeNode.mapChildren(x => x)).toStrictEqual([1, 5, 8, 11]);
        });

        it('should return the appropriate child index', () => {
            expect(treeNode.getChildIndex(1)).toStrictEqual(5);
        });

        it('should remove the second element of the children list', () => {
            treeNode.removeChild(2);
            expect(treeNode.mapChildren(x => x)).toStrictEqual([1, 5, 11]);
        });

        it('should return the removed child address', () => {
            expect(treeNode.removeChild(2)).toEqual(8);
        });
    });
    
});