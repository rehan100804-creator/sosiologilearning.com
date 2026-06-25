import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Ensure the user is signed in anonymously before any operation (disabled as we use unauthenticated rules)
export async function ensureSignedIn() {
  // No-op - Anonymous Auth is not enabled in this Firebase sandbox project
}

export async function saveStudentProgress(nim: string, data: any) {
  await ensureSignedIn();
  const path = `students/${nim}`;
  try {
    const docRef = doc(db, 'students', nim);
    const payload = {
      nim: nim,
      name: data.name,
      score: data.score !== undefined ? data.score : null,
      correctCount: data.correctCount !== undefined ? data.correctCount : 0,
      incorrectCount: data.incorrectCount !== undefined ? data.incorrectCount : 0,
      watchedVideo: !!data.watchedVideo,
      readModule: !!data.readModule,
      viewedSources: !!data.viewedSources,
      userAnswers: data.userAnswers || null,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload);
    return payload;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getStudentProgress(nim: string) {
  await ensureSignedIn();
  const path = `students/${nim}`;
  try {
    const docRef = doc(db, 'students', nim);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function getAllStudentProgress() {
  await ensureSignedIn();
  const path = 'students';
  try {
    const colRef = collection(db, 'students');
    const querySnapshot = await getDocs(colRef);
    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
