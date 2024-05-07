import { BookCardMini } from '../BookCardMini/BookCardMini';

export const HomePage = () => {
  return (
    <>
      <h2>Home page</h2>
      <BookCardMini bookName={'flowers'} />
      <BookCardMini bookName={'science'} />
      <BookCardMini bookName={'war'} />
      <BookCardMini bookName={'sea'} />
    </>
  );
};
