import { initAuthData } from './model/services/initAuthData.ts';

export { getUserAuthData } from './model/selectors/getUserAuthData.ts';

export { getUserInited } from './model/selectors/getUserInited.ts';

export { userReducer, userActions } from './model/slice/userSlice';

export type { UserSchema, User } from './model/types/user';

export { initAuthData };
