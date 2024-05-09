import { getDatabase, ref, child, get, set } from 'firebase/database';

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

export function writeUserData(userId: string, favorite: string[]) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    favorites: favorite,
  });
}

export async function removeUserData(userId: string, bookId: string) {
  const db = getDatabase();

  const favorites = await getFirebaseData(userId);
  const updatedFavorite = favorites.filter(book => book !== bookId);

  await set(ref(db, 'users/' + userId), {
    favorites: updatedFavorite,
  });
}
