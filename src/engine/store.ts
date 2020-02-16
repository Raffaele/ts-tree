import { combineReducers, createStore } from 'redux';
import { treeReducer } from './TreeReducer/treeReducer';
import { ITreeMapper } from '../types/TreeMapperInterface';

export interface IStore {
    tree :ITreeMapper
}

export const store = createStore<IStore, any, any, any>(
    combineReducers({
        tree: treeReducer
    })
);
