import { UserCredential } from "firebase/auth";

export interface UserState {
  isLogged: boolean;
  userData: UserCredential | undefined;
}
