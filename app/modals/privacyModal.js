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

function privacyModal(props) {
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
      //name: "Terms of Service",
      //description:
        //"All Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such Content. The arqive and Cal State LA may not monitor or control the Content posted via the Service that The arqive provides and, we cannot take responsibility for such Content. Any use or reliance on any Content or materials posted via the Service or obtained by you through the Service is at your own risk.\n     The arqive and Cal State LA does not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Service or endorse any opinions expressed via the Service. You understand that by using the Service, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. Under no circumstances will The arqive and/or Cal State LA be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of any Content posted, emailed, transmitted or otherwise made available via the Service or broadcast elsewhere.\n You represent you have the legal right to post the content that you post on the Service. You may not post anything you have copied or collected from the internet that you do not have the right to post.\n     You retain your rights to any Content you submit, post or display on or through the Service. By submitting, posting or displaying Content on or through the Service, you grant The arqive a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed).  Furthermore, you grant all users of the Service a Creative Commons License (CC BY-NC) for their use of the content you post.", 
      name: "Privacy Policy",
      description:
          "Privacy Policy for TheArqive.com \n\nAt TheArqive, we are committed to protecting the privacy and security of our users. \n\nThis Privacy Policy describes the types of information we collect, how we use, share, and protect that information, and how it complies with the Google Play requirements. Information We Collect We collect the following types of information from our users: Personal Information: We may collect personal information such as your name, email address, and location when you sign up for an account with us. User Content: We may collect user-generated content such as posts, comments, images, and videos that you submit to our website. Cookies and Tracking Information: We may use cookies, web beacons, and similar technologies to collect information about how you use our website, such as the pages you visit and the links you click. Log Data: Our servers automatically record information about how you use our website, including your IP address, browser type, operating system, and the date and time of your visit. We also collect information transmitted off-device through third-party libraries or SDKs used in our app. This includes data collected and handled by these third-party tools to provide and improve their services. How We Use Your Information We use your information to provide and improve our services, communicate with you about your account, and personalize your experience on our website. We may also use your information to: Respond to your requests and inquiries. Analyze user behavior and usage patterns to improve our website and services. Send you promotional materials and offers. Comply with legal obligations. Sharing Your Information We may share your information with third-party service providers who help us provide and improve our services. We may also share your information with law enforcement agencies, government bodies, or other third parties when we are required to do so by law. See more at https://thearqive.com/privacypolicy", 
      //name: "  ",
      //description:
       //     "Additionally, we disclose the user data collected and shared through third-party libraries or SDKs used in our app, such as Google Analytics and Google AdSense, in our app's Data safety form on the Google Play Console. Protecting Your Information We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information. Your Choices You can control how we use your information by: Updating your account settings to manage your communication preferences. Disabling cookies in your browser settings. Deleting your account and all associated information. Data Retention Practices We will retain your personal information only for as long as necessary to provide you with our services and as required by law. When we no longer need to use your personal information, we will securely delete or destroy it. Legal Basis for Processing We process your personal information based on your consent and our legitimate business interests in providing and improving our services. User Rights  You have the right to: Access and receive a copy of your personal information. Rectify any inaccurate or incomplete personal information.  Object to the processing of your personal information.  Erase your personal information in certain circumstances.  Restrict the processing of your personal information in certain circumstances.  Withdraw your consent at any time. Complaints If you have any concerns about our processing of your personal information, you have the right to lodge a complaint with the relevant data protection authority. Questions and Concerns If you have any questions or concerns about our Privacy Policy or how it complies with the Google Play requirements, please contact us at thearqive@gmail.com.", 
        
  
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
            padding: 18,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
        
          Privacy Policy
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
        }
      }

      />
        <View style={{ marginBottom: 5 }}>
					<Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://thearqive.com/privacypolicy')}>
  Privacy Policy
					</Text>
				</View>

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

export default privacyModal;
