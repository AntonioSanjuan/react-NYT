import { auth } from '../../../utils/firebase.util';
import { UserState } from './appUser.state';

export const userInitialState: UserState = {
  isLogged: false,
  userData: auth.currentUser,
  userStoredArticles: undefined
};
