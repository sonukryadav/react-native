// App.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from "react-native";

import { Pedometer } from "expo-sensors";

import CircularProgress from "react-native-circular-progress-indicator";

const colors = {
  primary: "rgb(51, 51, 0)",
  primary50: "rgba(51, 51, 0,0.5)",
  secondary: "#f39c12",
  text: "#ecf0f1",
};

export default function App() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  var WindowHeight = Dimensions.get("window").height;
  var Dist = StepCount * 0.762; // 1 step = 0.762 meter and 1 meter = 1.3123 steps
  var DistanceCovered = Dist.toFixed(2);
  var cal = DistanceCovered * 0.06; // Calories burnt asumed 60 per kilometer
  var caloriesBurnt = cal.toFixed(2);

  const requestActivityPermission = async () => {
    Pedometer.requestPermissionsAsync()
      .then((result) => { })
      .catch((e) => { });

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    )
      .then((result) => { })
      .catch(() => { });
  };

  subscribe = () => {
    Pedometer.isAvailableAsync().then(
      (result) => {
        SetPedomaterAvailability(String(result));
      },

      (error) => {
        SetPedomaterAvailability(error);
      }
    );

    return Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });
  };

  useEffect(() => {
    requestActivityPermission();
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/step.jpg")}
        resizeMode="contain"
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Is Pedometer available on the device : {PedomaterAvailability}
          </Text>
        </View>
        {PedomaterAvailability !== "false" ? (
          <View style={{ flex: 5 }}>
            <View style={{ flex: 3, alignItems: "center" }}>
              <CircularProgress
                value={StepCount}
                maxValue={6500}
                radius={200}
                textColor={colors.text}
                activeStrokeColor={colors.secondary}
                inActiveStrokeColor={colors.primary}
                inActiveStrokeOpacity={0.8}
                inActiveStrokeWidth={60}
                activeStrokeWidth={60}
                title={"Step Count"}
                titleColor={colors.text}
                titleStyle={{ fontWeight: "bold" }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Target : 6500 steps(5kms)
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Distance Covered : {DistanceCovered} m
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Calories Burnt : {caloriesBurnt}
                </Text>
              </View>
              <StatusBar style="auto" />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={[styles.headingDesign]}>
              Sorry! Pedometer not available. You can't use this app.
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headingDesign: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "100%",
    fontSize: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  textDesign: {
    backgroundColor: colors.primary50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
