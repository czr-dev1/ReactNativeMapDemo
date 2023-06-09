import React, { useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

import colors from '../config/colors';

function StoryListScreen(props) {
	const navigation = useNavigation();

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			{props.isLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView>
					{props.stories.map((item, i) => {
						return (
							<TouchableWithoutFeedback
								key={i}
								onPress={() => {
									navigation.navigate('Story', {
										title: item.title,
										description: item.description,
									});
								}}
							>
								<Card>
									<Card.Title>{item.title}</Card.Title>
								</Card>
							</TouchableWithoutFeedback>
						);
					})}
				</ScrollView>
			)}
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
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '100%',
	},
});

const mapStateToProps = (state) => {
	return {
		isLoading: state.storyReducer.isLoading,
		stories: state.storyReducer.storyList,
	};
};

export default connect(mapStateToProps)(StoryListScreen);
