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
} from "react-native-ui-lib";
import data from "./../data.json";
import { FadeLoading } from "react-native-fade-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
const CuisineSelector = () => {
  const [showLoader, setshowLoader] = useState(false);
  let navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setshowLoader(false);
    }, 3000);
    return () => {};
  }, []);
  let Cuisine = [
    {
      name: "American",
      image_url:
        "https://images.pexels.com/photos/2418486/pexels-photo-2418486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Asian",
      image_url:
        "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "British",
      image_url:
        "https://images.pexels.com/photos/3791089/pexels-photo-3791089.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Caribbean",
      image_url:
        "https://images.pexels.com/photos/12362298/pexels-photo-12362298.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Central Europe",
      image_url:
        "https://images.pexels.com/photos/15792419/pexels-photo-15792419.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Chinese",
      image_url:
        "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Eastern Europe",
      image_url:
        "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "French",
      image_url:
        "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Greek",
      image_url:
        "https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Indian",
      image_url:
        "https://images.pexels.com/photos/3659862/pexels-photo-3659862.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Italian",
      image_url:
        "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Japanese",
      image_url:
        "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Korean",
      image_url:
        "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Kosher",
      image_url:
        "https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mediterranean",
      image_url:
        "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mexican",
      image_url:
        "https://images.pexels.com/photos/551997/pexels-photo-551997.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Middle Eastern",
      image_url:
        "https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Nordic",
      image_url:
        "https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "South American",
      image_url:
        "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "South East Asian",
      image_url:
        "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "World",
      image_url:
        "https://images.pexels.com/photos/7664397/pexels-photo-7664397.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];
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
        }}
      >
        <Text text50>Select Cuisine</Text>
      </View>

      <GridList
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
        data={Cuisine}
        // maxItemWidth={140}
        numColumns={2}
        itemSpacing={10}
        listPadding={10}
        onEndReached={() => {
          console.log("end has been reached");
        }}
        renderItem={({ item, index }) => {
          return (
            <Card
              // center
              flex
              key={index}
              style={{
                borderRadius: 10,
                marginBottom: Cuisine.length - 1 === index ? 100 : 0,
              }}
              onPress={async () => {
                AsyncStorage.setItem("@cuisine", item.name);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: "Home", params: { cuisine: item.name } }],
                  })
                );
              }}
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
                  uri: item.image_url,
                }}
              >
                <Fader visible={true} position={Fader.position.BOTTOM} />
              </ImageBackground>

              <View padding-10>
                <Text text60 $textDefault numberOfLines={1}>
                  {item.name}
                </Text>
                <View row>
                  {/* <Text text90 color={"green"}>
                    {item.recipe.source}
                  </Text> */}
                </View>

                <View>
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
          );
        }}
      ></GridList>
    </SafeAreaView>
  );
};

export default CuisineSelector;
