import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

function useAuthCtx() {
  return useContext(AuthContext);
}

export default useAuthCtx;
