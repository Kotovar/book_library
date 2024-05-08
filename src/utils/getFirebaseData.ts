import { getDatabase, ref, child, get } from 'firebase/database';

export async function getFirebaseData(userId: string) {
  const db = getDatabase();
  const dbRef = ref(db);
  let data: string[] = [];

  const snapshot = await get(child(dbRef, `users/${userId}`));
  if (snapshot.exists()) {
    data = snapshot.val().favorites;
  }

  return data;
}
