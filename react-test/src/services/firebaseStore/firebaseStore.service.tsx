import { addDoc, collection, DocumentData, DocumentReference, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { FirebaseStoredArticleDto } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model";
import { auth, db } from "../../utils/firebase.util";

export function getUserStoredArticles(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, "storedArticles"), where("userUid", "==", auth.currentUser ? auth.currentUser?.uid: 'null'));
    return getDocs(q);
}

export function addUserStoredArticle(article: FirebaseStoredArticleDto): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(db, "storedArticles"),
        article
    );
}
//todo push new savedArticle