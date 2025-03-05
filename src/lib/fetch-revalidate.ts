export const FerchRevalidate = async () => {
  const url = `http://localhost:3000/api/revalidate`;
  try {
    await fetch(url);
  } catch (error) {
    console.log(error);
  }
};
