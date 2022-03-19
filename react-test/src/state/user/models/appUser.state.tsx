import { User } from "firebase/auth";
import { FirebaseStoredArticleInternal } from "../../../models/dtos/firebaseStore/firebaseStoredArticle.model";

export interface UserState {
  isLogged: boolean;
  userData: User | null;
  userStoredArticles: FirebaseStoredArticleInternal[] | undefined;
}
