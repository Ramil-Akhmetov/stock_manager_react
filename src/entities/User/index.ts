import { initAuthData } from './model/services/initAuthData';

export { userReducer, userActions } from './model/slice/userSlice';

export type { UserSchema } from './model/types/user';

export { initAuthData };
export { getUserAuthData } from './model/selectors/selectors';
export { getUserInited } from './model/selectors/selectors';
