import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { render } from "react-dom";

const BellIconWithBadge = (props) => {
  return (
    <View>
      <Icon
        name="bell"
        type="fount-awesome"
        color="#696969"
        size={25}
        onPress={() => {
          props.navigation.navigate("Notifications");
        }}
      ></Icon>
      <Badge
        value={this.state.value}
        containerStyle={{ position: "absolute", top: -4, right: -4 }}
      ></Badge>
    </View>
  );
};
class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  getNumberOfNotifications() {
    db.collection("notifications")
      .where("notification_status", "==", "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => {
          doc.data;
        });
        this.setState({ value: unreadNotifications.length });
      });
  }

  componentDidMount() {
    this.getNumberOfNotifications();
  }
  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#696969"
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          ></Icon>
        }
        rightComponent={<BellIconWithBadge {...props} />}
        centerComponent={{
          text: props.title,
          style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
        }}
        backgroundColor="#CAF8FE"
      />
    );
  }
}

export default MyHeader;
