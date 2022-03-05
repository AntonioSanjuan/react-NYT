import { UserCredential } from "firebase/auth";
import { FirebaseStoredArticleInternal } from "../../../models/dtos/firebaseStore/firebaseStoredArticle.model";

export interface UserState {
  isLogged: boolean;
  userData: UserCredential | undefined;
  userStoredArticles: FirebaseStoredArticleInternal[] | undefined;
}
