import React from "react";
import { TouchableWithoutFeedback, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


import colors from "../config/colors";
import { logout } from "../redux/actions/authActions";

function ModalOpener(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const iconColor = colors.border
  const icons = {
    "phone": <FontAwesome name="phone" size={24} color={iconColor} />,
    "support": <FontAwesome name="handshake-o" size={24} color={iconColor} />,
    "contact": <FontAwesome name="id-card" size={24} color={iconColor} />,
    "faqs": <FontAwesome name="question-circle-o" size={24} color={iconColor} />,
    "accessibility": <FontAwesome name="universal-access" size={24} color={iconColor} />,
  }

  return (
    <View style={{justifyContent: "center", width: "100%", }}>
      {props.name === "log out" ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
          }}
        >
          <View style={{flexDirection: "row", alignItems: "center", padding: 24, borderTopWidth: 1, borderColor: colors.menuBorder}}>
            <FontAwesome name="sign-out" size={24} color={iconColor} />
            <Text style={{ padding: 5, color: colors.white }}>{props.name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(props.navigateTo, {});
          }}
        >
          <View style={{flexDirection: "row", alignItems: "center", padding: 24, borderBottomWidth: 1, borderColor: colors.menuBorder}}>
            {icons[props.icon]}
            <Text style={{ padding: 24, color: colors.white, }}>{props.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ModalOpener;
