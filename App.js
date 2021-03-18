import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

import Loading from "./loading";
import Weather from "./Weather";

const API_KEY = "APP_KEY";

export default class App extends React.Component {
	// state [START]
	state = {
		isLoading: true,
		temp: 0,
		condition: "",
	};
	// state [END]
	// getWeather[START]
	getWeather = async (latitude, longitude) => {
		// Send to API and get weather!
		const {
			data: { main, weather },
		} = await axios(
			`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
		);
		this.setState({ isLoading: false, temp: main.temp, condition: weather[0].main });
	};
	// getWeather[END]
	// getLocation [START]
	getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			const {
				coords: { latitude, longitude },
			} = await Location.getCurrentPositionAsync();

			// getWeather
			this.getWeather(latitude, longitude);
		} catch (error) {
			Alert.alert("Can't find you.", "So sad...!");
		}
	};
	// getLocation [END]

	// componentDidMount [START]
	componentDidMount() {
		this.getLocation();
	}
	// componentDidMount [END]

	// render[START]
	render() {
		const { isLoading, temp, condition } = this.state;
		return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
	}
	// render[END]
}
