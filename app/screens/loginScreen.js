import React, { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

// Redux
import { login, reset } from '../redux/actions/authActions';

import colors from '../config/colors';
import { Dimensions } from 'react-native';

function LoginScreen(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);

	const [user, setUser] = useState({
		username: '',
		password: '',
		isValidUser: true,
		isValidPassword: true,
		secureTextEntry: true,
		errors: {},
		expoPushToken: props.expoPushToken,
	});

	const handleUsername = (val) => {
		if (val === '') {
			setUser({
				...user,
				username: val,
				isValidUser: false,
			});
		} else {
			setUser({
				...user,
				username: val,
				isValidUser: true,
			});
		}
	};

	const handlePassword = (val) => {
		if (val.length >= 8) {
			setUser({
				...user,
				password: val,
				isValidPassword: true,
			});
		} else {
			setUser({
				...user,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setUser({
			...user,
			secureTextEntry: !user.secureTextEntry,
		});
	};

	const failedLogin = () => {
		Alert.alert(
			'failed to log in!', 
			'incorrect username and/or password! please try again', 
			[
				{
					text: 'ok',
					onPress: () => {
						setSubmitted(!submitted);
						dispatch(reset());
					}
				}
			]
		);
	};

	useEffect(() => {
		if (submitted) {
			setFailed(props.loginFail);
		} else {
			setFailed(false);
		}
	}, [props.loginFail]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<View style={styles.logo}>
				<Image 
					style={{ height: 100, width: 100 }} 
					source={require('../assets/color_icon.png')} />
				<Text style={styles.title}> log in </Text>
			</View>

			{submitted && failed ? (
				<View style={{ alignItems: 'center' }}>
				{/* Made it an Alert so that I could reset props.loginFail 
				back to false and update useState for setSubmitted. Also had 
				to add some things to authActions and authReducer */}
					<View> 
						<Text> {failedLogin()} </Text>
					</View>
				</View>
			) : null}

			<View style={styles.inputContainer}>
				<View style={styles.input}>
					<TextInput
						style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.border
						}}
						value={user.username}
						placeholder='username'
						placeholderTextColor='#B6ADCC'
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={(val) => handleUsername(val)}
					/>
					{user.isValidUser || user.username === '' ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorMsg}>please enter your username</Text>
						</Animatable.View>
					)}
				</View>

				<View style={styles.input}>
					<TouchableOpacity style={{ marginTop: 12 }} onPress={updateSecureTextEntry}>
						{user.secureTextEntry ? (
							<FontAwesome5 name='eye-slash' color='#B6ADCC' size={20} />
						) : (
							<FontAwesome5 name='eye' color='#B6ADCC' size={20} />
						)}
					</TouchableOpacity>
					<TextInput
						style={{ 
							fontFamily: 'Arial', 
							fontSize: 16, 
							color: colors.border,
							marginLeft: 10 
						}}
						value={user.password}
						placeholder='password'
						placeholderTextColor='#B6ADCC'
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={user.secureTextEntry ? true : false}
						onChangeText={(val) => handlePassword(val)}
					/>
				</View>
				{user.isValidPassword || user.password === '' ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>password must be at least 8 characters long</Text>
					</Animatable.View>
				)}

				<View style={styles.links}>
					<Text style={styles.forgotDetails}>
						forgot your log in details? get help{' '}
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('ForgotPassword');
						}}
					>
						<Text 
							style={{
								fontFamily: 'Arial',
								fontSize: 12,
								fontWeight: 'bold',
								color: colors.forgotDetails,
								marginTop: 10
							}}
						>
							signing in
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			
			<View style={styles.bottomContainer}>
				<View style={styles.submitBtn}>
					<TouchableOpacity
						onPress={() => {
							dispatch(login(user));
							setSubmitted(!submitted);
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
							log in
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.links}>
					<Text style={{
						fontFamily: 'Arial',
						fontSize: 12,
						color: colors.forgotDetails,
					}}>
						{/* Put into brackets b/c of apostrophe */}
						{`don't have an account? register `}
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Register');
						}}
					>
						<Text
							style={{
								fontFamily: 'Arial',
								fontSize: 12,
								fontWeight: 'bold',
								color: colors.forgotDetails
							}}
						>
							here
						</Text>
					</TouchableOpacity>
				</View>

				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Map');
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
		alignItems: 'center',
		justifyContent: 'center',
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
		borderColor: colors.border, // Hex is '#B6ADCC'
		fontFamily: 'Arial',
		fontSize: 16,
		color: colors.border,
		marginTop: 30,
		paddingLeft: 15,
		height: 50,
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
	links: {
		flexDirection: 'row',
	},
	forgotDetails: {
		fontFamily: 'Arial',
		fontSize: 12,
		color: colors.forgotDetails,
		marginTop: 10,
		marginLeft: 90,
	},
	text: {
		fontSize: 14,
		color: '#008BBC',
	},
	errorMsg: {
		fontSize: 12,
		color: colors.alert,
		padding: 5,
	},
});

const mapStateToProps = (state) => {
	return {
		loginFail: state.authReducer.loginFail,
	};
};

export default connect(mapStateToProps)(LoginScreen);
