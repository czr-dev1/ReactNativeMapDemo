import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import useRemovalConfirm from "../components/profile/useRemovalConfirm";
import colors from "../config/colors";

function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { loginToggle } = useRemovalConfirm();

  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(true);

  const validateEmail = (val) => {
    console.log(val.trim());
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val.trim()) &&
      val.length > 0
    ) {
      setShowError(false);
      console.log("email validated");
    }
  };

  // Searches is email exists
  const emailExists = (email) => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    axios.get(`https://api.thearqive.com/profile/users?search=${username}`, config)
    .then((response) => {
      loginToggle();
      setEmail("");
      navToResetPassword();
    })
    .catch((error) => {
      loginToggle();
      setEmail("");
      enterValidEmail();
    });
  };

  const navToResetPassword = () => {
    Alert.alert("", "you are being redirected to reset your password!", [
      {
        text: "ok",
        onPress: () => navigation.navigate("ResetPassword"),
      },
    ]);
  };

  const enterValidEmail = () => {
    Alert.alert("", "please enter a valid email!", [
      {
        text: "dismiss",
      },
    ]);
  };

  // Send password reset link if applicable
  const sendResetLink = () => {
    console.log(showError);
    if (!showError) {
      axios.post("https://api.thearqive.com/api/password_reset/", {
        email: email.trim(),
      })
      .then((response) => {
        loginToggle();
        setEmail("");
        emailSent();
      })
      .catch((error) => {
        console.log(error);
        loginToggle();
        setEmail("");
        emailFailed();
      });
    } else {
      loginToggle();
      setEmail("");
      emailFailed();
    }
  };

  const emailSent = () => {
    Alert.alert("", "email has been sent!", [
      {
        text: "dismiss",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  const emailFailed = () => {
    Alert.alert("", "Error contacting server", [
      {
        text: "dismiss",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View style={styles.logo}>
				<Image
					style={{ height: 150, width: 150 }}
					source={require('../assets/color_icon.png')} />
				<Text style={styles.title}> forgot password </Text>
			</View>

      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 14, color: colors.purple}}>
          please input your e-mail:
        </Text>
        <View style={styles.input}>
          <TextInput
            style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.purple,
              width: '90%',
						}}
            value={email}
            placeholder='sample@email.com'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(val) => {
              setEmail(val);
              validateEmail(val);
            }}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.submitBtn}>
          <TouchableOpacity
            onPress={() => {
              sendResetLink();
            }}
          >
            <Text
							style={{
								color: 'white',
								alignSelf: 'center',
								fontFamily: 'Arial',
								fontSize: 24,
							}}
						>
							forgot password
						</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Text style={styles.text}> continue </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
	logo: {
		flex:  0.5,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignContent: 'center',
		marginTop: 10,
		width: '100%'
	},
	title: {
		fontFamily: 'Arial',
		fontSize: 24,
		color: colors.purple, // Hex is '#4D4185'
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderWidth: 2,
		borderColor: colors.purple, // Hex is '#B6ADCC'
		fontFamily: 'Arial',
		fontSize: 16,
		color: colors.purple,
		marginTop: 30,
		paddingLeft: 15,
		height: 60,
		width: '85%',
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignContent: 'flex-start',
		alignItems: 'center',
		width: '100%'
	},
	submitBtn: {
		backgroundColor: '#4D4185',
		justifyContent: 'center',
		borderRadius: 15,
		height: 60,
		width: '80%',
	},
	text: {
		fontSize: 14,
		color: colors.forgotDetails,
		marginBottom: 50,
	},
});

export default ForgotPasswordScreen;
