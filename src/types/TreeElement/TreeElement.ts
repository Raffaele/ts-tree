import { ITreeElement } from '../TreeElementInterface';

export class TreeElement implements ITreeElement {
    constructor(private label :string) {}
    getLabel() {
        return this.label;
    }
    setLabel(label: string) {
        this.label = label;
    }
    clone() {
        return new TreeElement(this.getLabel());
    }
}