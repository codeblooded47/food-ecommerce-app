import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import data from "./../data.json";
import axios from "axios";

const useGetCuisine = ({ selectedCuisine }) => {
  const [list, setlist] = useState([]);
  const [nextCursor, setnextCursor] = useState("");
  useEffect(() => {
    if (selectedCuisine) {
      console.log(selectedCuisine);
      axios
        .get(
          `https://api.edamam.com/api/recipes/v2?type=any&app_id=d69f159f&app_key=3b1782dba679d23853b66a4197d232e2&cuisineType=${selectedCuisine}`
        )
        .then((response) => {
          setlist(response.data.hits);
          setnextCursor(response.data._links.next.href);
        });
    }

    return () => {};
  }, [selectedCuisine]);
  const clear = (selectedCuisine) => {
    setlist([]);
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=any&app_id=d69f159f&app_key=3b1782dba679d23853b66a4197d232e2&cuisineType=${selectedCuisine}`
      )
      .then((response) => {
        setlist(response.data.hits);
        setnextCursor(response.data._links.next.href);
      });
  };
  const search = (text, selectedCuisine) => {
    setlist([]);
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=any&app_id=d69f159f&app_key=3b1782dba679d23853b66a4197d232e2&cuisineType=${selectedCuisine}&q=${text}`
      )
      .then((response) => {
        setlist(response.data.hits);
        setnextCursor(response.data._links.next.href);
      });
  };
  const fetchNext = () => {
    if (nextCursor) {
      axios.get(nextCursor).then((response) => {
        setlist((prev) => [...prev, ...response.data.hits]);
        setnextCursor(response.data._links.next.href);
      });
    }
  };
  return { listItems: list, setListItems: setlist, fetchNext, search, clear };
};

export default useGetCuisine;
