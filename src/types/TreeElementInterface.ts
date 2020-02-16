export interface ITreeElement {
    getLabel: () => string;
    setLabel: (label :string) => void;
    clone: () => ITreeElement;
}
