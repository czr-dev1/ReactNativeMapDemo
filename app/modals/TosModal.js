import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";

function TosModal(props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (props.route.params.isMapScreen) {
        // console.log("maps");
        // fun bug where on the map screen it wasn't routing correctly
        // you still the other navigation because it handles routing oddly
        // if you don't do that in the profile screen
      } else {
        // console.log("not maps");
        props.navigation.goBack();
      }
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [])

  const data = [
    {
      name: "Terms of Service",
      description:
        "All Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such Content. The arqive and Cal State LA may not monitor or control the Content posted via the Service that The arqive provides and, we cannot take responsibility for such Content. Any use or reliance on any Content or materials posted via the Service or obtained by you through the Service is at your own risk.\n     The arqive and Cal State LA does not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Service or endorse any opinions expressed via the Service. You understand that by using the Service, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. Under no circumstances will The arqive and/or Cal State LA be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of any Content posted, emailed, transmitted or otherwise made available via the Service or broadcast elsewhere.\n     You represent you have the legal right to post the content that you post on the Service. You may not post anything you have copied or collected from the internet that you do not have the right to post.\n     You retain your rights to any Content you submit, post or display on or through the Service. By submitting, posting or displaying Content on or through the Service, you grant The arqive a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed).  Furthermore, you grant all users of the Service a Creative Commons License (CC BY-NC) for their use of the content you post.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[styles.shadow2, {
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.purple,
          width: "100%",
        }]}
      >
        <Entypo
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{ padding: 24 }}
          name="chevron-left"
          size={28}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 18,
            padding: 24,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          terms of service
        </Text>
        <Entypo
          style={{ padding: 24 }}
          name="cross"
          size={28}
          color={colors.purple}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.box}>
              <Text style={styles.itemTitle}>{item.name}</Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    height: "100%",
  },
  box: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  description: {
    color: colors.black,
    fontSize: 12,
  },
});

export default TosModal;
