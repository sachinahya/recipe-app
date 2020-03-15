import { AnyAction, BasicAction } from 'lib/actions';
import React from 'react';

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

type UndoRedoActions<T> = T | BasicAction<'UNDO'> | BasicAction<'REDO'> | BasicAction<'CLEAR'>;

const initState = <S>(initialState: S): UndoRedoState<S> => ({
  past: [],
  present: initialState,
  future: [],
});

export const undoable = <S, A extends AnyAction>(
  reducer: React.Reducer<S, A>
): React.Reducer<UndoRedoState<S>, UndoRedoActions<A>> => {
  return (state, action) => {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO': {
        const previous = past[past.length - 1];
        if (!previous) return state;
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }

      case 'REDO': {
        const next = future[0];
        if (!next) return state;
        const newFuture = future.slice(1);

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }

      case 'CLEAR': {
        return initState(state.present);
      }

      default: {
        const newPresent = reducer(present, action as A);

        if (present === newPresent) return state;
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
};

interface UndoableReducer<S, A> {
  /**
   * Current state.
   */
  state: S;
  /**
   * Indicates if it is currently possible to undo.
   */
  canUndo: boolean;
  /**
   * Indicates if it is currently possible to redo.
   */
  canRedo: boolean;
  /**
   * Dispatch actions to the reducer.
   */
  dispatch(action: A): void;
  /**
   * Undo the current state.
   */
  undo(): void;
  /**
   * Redo the state.
   */
  redo(): void;
  /**
   * Clear undo and redo history. Useful after making API calls.
   */
  clearHistory(): void;
}

/**
 * Extends a React reducer to provide undo/redo capabilities.
 *
 * @template S State type.
 * @template A Action type.
 * @param reducer A React reducer to enhance.
 * @param initialState Initial 'present' state for the reducer.
 * @returns An undoable reducer.
 */
export const useUndoableReducer = <S, A extends BasicAction>(
  reducer: React.Reducer<S, A>,
  initialState: S
): UndoableReducer<S, A> => {
  // ? Does this need to be memoized? Answer: probably not
  const undoableReducer = undoable(reducer);

  const [state, dispatch] = React.useReducer(undoableReducer, initialState, initState);

  return {
    state: state.present,
    // Removes undo/redo/clear actions from typings
    dispatch: (action: A) => dispatch(action),
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    clearHistory: () => dispatch({ type: 'CLEAR' }),
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
};
