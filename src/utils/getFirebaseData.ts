import { getDatabase, ref, child, get, set } from 'firebase/database';

export async function getFirebaseData(userId: string) {
  const db = getDatabase();
  const dbRef = ref(db);
  let favorites: string[] = [];
  let history: string[] = [];

  const snapshot = await get(child(dbRef, `users/${userId}`));
  if (snapshot.exists()) {
    favorites = snapshot.val().favorites;
    history = snapshot.val().history;
  }

  return [favorites, history];
}

export async function writeUserData(
  userId: string,
  favorite: string[] = [],
  history: string[] = []
) {
  const db = getDatabase();
  await set(ref(db, 'users/' + userId), {
    favorites: favorite,
    history: history,
  });
}

export async function removeUserFavorite(userId: string, bookId: string) {
  const db = getDatabase();

  const [favorites = [], history = []] = await getFirebaseData(userId);
  const updatedFavorite = favorites.filter(book => book !== bookId);

  await set(ref(db, 'users/' + userId), {
    favorites: updatedFavorite,
    history: history,
  });
}

export async function removeUserHistory(userId: string, story: string) {
  const db = getDatabase();

  const [favorites = [], history = []] = await getFirebaseData(userId);
  const updatedHistory = history.filter(link => link !== story);

  await set(ref(db, 'users/' + userId), {
    favorites: favorites,
    history: updatedHistory,
  });
}
