import React, { useEffect, useState } from "react";
import { ImageBackground, StatusBar } from "react-native";

import {
  Colors,
  View,
  Card,
  CardProps,
  Button,
  Text,
  Spacings,
  GridList,
  GridListItem,
  Fader,
  Image,
  Badge,
  ListItem,
  TextField,
} from "react-native-ui-lib";
import data from "./../data.json";
import { FadeLoading } from "react-native-fade-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetCuisine from "../api/useGetCuisine";
import { CommonActions, useNavigation } from "@react-navigation/native";
const Home = (props) => {
  const [showLoader, setshowLoader] = useState(true);
  const [selectedCuisine, setselectedCuisine] = useState("");
  const [inputText, setInputText] = useState("");
  const [showBottomLoading, setShowBottomLoading] = useState(true);
  const [searchUsed, setSearchUsed] = useState(false);
  let navigation = useNavigation();
  const { listItems, setListItems, fetchNext, search, clear } = useGetCuisine({
    selectedCuisine,
    search: inputText,
  });
  useEffect(() => {
    setTimeout(() => {
      setshowLoader(false);
    }, 1000);
    return () => {};
  }, []);
  useEffect(() => {
    const getItem = async () => {
      if (props.route.params?.cuisine) {
        setselectedCuisine(props.route.params?.cuisine);
      } else {
        let itemFromStorage = await AsyncStorage.getItem("@cuisine");
        setselectedCuisine(itemFromStorage);
      }
    };
    getItem();

    return () => {};
  }, []);
  // useEffect(() => {
  //   AsyncStorage.clear();

  //   return () => {};
  // }, []);
  const updateListOnScroll = () => {
    setTimeout(() => {
      setListItems((prev) => {
        let items = [];
        prev.forEach((ele) => {
          if (!ele.loading) {
            items.push(ele);
          }
        });
        items.push(listItems[0]);
        items.push(listItems[0]);

        return items;
      });
    }, 1000);
  };
  const onEndReached = () => {
    fetchNext();
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 12,
          backgroundColor: "#fff",
          // marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <Text text50>{selectedCuisine}</Text>
        <Button
          style={{ marginLeft: 10 }}
          label={"Change"}
          size={Button.sizes.medium}
          backgroundColor={Colors.red30}
          iconOnRight
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "CuisineSelector" }],
              })
            );
          }}
        />
      </View>

      {listItems.length < 1 ? (
        <GridList
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 20 }}
          data={[0, 1, 2, 3, 4, 5, 6, 7]}
          // maxItemWidth={140}
          numColumns={2}
          itemSpacing={Spacings.s3}
          listPadding={10}
          // onEndReached={onEndReached}
          renderItem={({ item, index }) => {
            return (
              <Card
                // center
                flex
                // key={index}
                style={{ borderRadius: 10 }}
                onPress={() => console.log("press on a card")}
              >
                <FadeLoading
                  primaryColor="gray"
                  secondaryColor="lightgray"
                  duration={2000}
                  style={{ height: 150 }}
                />
                <View padding-10>
                  <FadeLoading
                    primaryColor="lightgray"
                    secondaryColor="lightgray"
                    duration={1000}
                    style={{ height: 10, width: 70, marginTop: 10 }}
                  />
                  <FadeLoading
                    primaryColor="lightgray"
                    secondaryColor="lightgray"
                    duration={1000}
                    style={{ height: 10, marginTop: 10 }}
                  />
                  <FadeLoading
                    primaryColor="lightgray"
                    secondaryColor="lightgray"
                    duration={1000}
                    style={{ height: 10, marginTop: 10 }}
                  />
                </View>
              </Card>
            );
          }}
        ></GridList>
      ) : (
        <GridList
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 10 }}
          data={listItems}
          // maxItemWidth={140}
          numColumns={2}
          ListHeaderComponent={
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <TextField
                placeholder={"Search"}
                // floatingPlaceholder
                value={inputText}
                onChangeText={(text) => {
                  setInputText(text);
                }}
                // enableErrors
                // validate={["required", "email", (value) => value.length > 6]}
                // validationMessage={[
                //   "Field is required",
                //   "Email is invalid",
                //   "Password is too short",
                // ]}
                // showCharCounter
                maxLength={30}
                containerStyle={{
                  width: "70%",
                  // flex: 1,
                  padding: 10,
                  backgroundColor: "#fff",
                  // marginTop: 10,
                  // marginHorizontal: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                fieldStyle={{ paddingHorizontal: 10 }}
              />
              <Button
                style={{
                  marginLeft: 10,
                  // flex: 2,
                  height: 45,
                  borderRadius: 10,
                  padding: 10,
                }}
                label={searchUsed ? "Clear" : "Search"}
                round={false}
                size={Button.sizes.small}
                backgroundColor={Colors.red30}
                onPress={() => {
                  if (!searchUsed) {
                    search(inputText, selectedCuisine);
                    setSearchUsed(true);
                  } else {
                    clear(selectedCuisine);
                    setInputText("");
                    setSearchUsed(false);
                  }
                }}
              />
            </View>
          }
          itemSpacing={10}
          listPadding={10}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent}
          renderItem={({ item, index }) => {
            return (
              <>
                <Card
                  // center

                  flex
                  key={index}
                  style={{
                    borderRadius: 10,
                    // marginBottom:
                    //   listItems.length - 1 === index ||
                    //   listItems.length - 2 === index
                    //     ? 100
                    //     : 0,
                  }}
                  onPress={() => console.log("press on a card")}
                >
                  {/* <Card.Image
                style={{ height: 150, width: "100%" }}
                source={{
                  uri: item.recipe.images.THUMBNAIL.url,
                }}
              /> */}
                  <ImageBackground
                    style={{ height: 150, width: "100%", borderRadius: 10 }}
                    imageStyle={{ borderRadius: 10 }}
                    source={{
                      uri: item.recipe.images.THUMBNAIL.url,
                    }}
                  >
                    <Fader visible={true} position={Fader.position.BOTTOM} />
                  </ImageBackground>

                  <View padding-10>
                    <View style={{ flexDirection: "row" }}>
                      {item.recipe.healthLabels.map((ele, index) => {
                        if (index === 0) {
                          return (
                            <Badge
                              key={index}
                              borderRadius={5}
                              labelStyle={{ paddingHorizontal: 5 }}
                              label={ele}
                              style={{ marginRight: 2, borderRadius: 5 }}
                              size={15}
                            />
                          );
                        }
                      })}
                    </View>

                    <Text text80 $textDefault numberOfLines={1}>
                      {item.recipe.label}
                    </Text>
                    <View row>
                      <Text text90 color={"green"}>
                        {item.recipe.source}
                      </Text>
                    </View>

                    <View>
                      <View style={{ flexDirection: "row" }}>
                        {item.recipe.healthLabels.map((ele, index) => {
                          if (index === 0) {
                            return (
                              <Text key={index} text90 $textDisabled>
                                label={ele}
                              </Text>
                            );
                          }
                        })}
                      </View>

                      {/* <View row right>
                    <Button
                      style={{ marginRight: 10 }}
                      text90
                      link
                      // iconSource={featureIcon}
                      label="Feature"
                    />
                    <Button
                      text90
                      link
                      // iconSource={shareIcon}
                      label="Share"
                    />
                  </View> */}
                    </View>
                  </View>
                </Card>
              </>
            );
          }}
        ></GridList>
      )}
    </SafeAreaView>
  );
};
const ListFooterComponent = () => {
  return (
    <GridList
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: 20 }}
      data={[0, 1]}
      // maxItemWidth={140}
      numColumns={2}
      itemSpacing={Spacings.s3}
      listPadding={10}
      // onEndReached={onEndReached}
      renderItem={({ item, index }) => {
        return (
          <Card
            // center
            flex
            // key={index}
            style={{ borderRadius: 10 }}
            onPress={() => console.log("press on a card")}
          >
            <FadeLoading
              primaryColor="gray"
              secondaryColor="lightgray"
              duration={2000}
              style={{ height: 150 }}
            />
            <View padding-10>
              <FadeLoading
                primaryColor="lightgray"
                secondaryColor="lightgray"
                duration={1000}
                style={{ height: 10, width: 70, marginTop: 10 }}
              />
              <FadeLoading
                primaryColor="lightgray"
                secondaryColor="lightgray"
                duration={1000}
                style={{ height: 10, marginTop: 10 }}
              />
              <FadeLoading
                primaryColor="lightgray"
                secondaryColor="lightgray"
                duration={1000}
                style={{ height: 10, marginTop: 10 }}
              />
            </View>
          </Card>
        );
      }}
    ></GridList>
  );
};
export default Home;
