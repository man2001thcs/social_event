import { useState, useEffect } from "react";
import GenerateRandomCode from "react-random-code-generator";
import {
  Stack,
  Button,
  Center,
  Heading,
  ScrollView,
  VStack,
  Divider,
  NativeBaseProvider,
} from "native-base";
import BookCom from "./book_com";

function BookList() {
  const urlBook = "http://10.13.128.107/php_server/controller/book/list.php";

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(urlBook, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(JSON.parse(JSON.stringify(result)) ?? []);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  console.log(items);

  const bookListAll = (items?.length !== 0 ? items : []).map((item, index) => {
    return (
      <BookCom key={index} id={item?.WpBook.id} name={item?.WpBook.name} />
    );
  });

  return (
    <NativeBaseProvider>
      <Stack>{bookListAll}</Stack>
    </NativeBaseProvider>
  );
}

export default BookList;
