import { useMemo } from 'react';

import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { useAppDispatch } from './useAppDispatch';

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
  const dispatch = useAppDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
}
