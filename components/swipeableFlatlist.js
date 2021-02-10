import React, { Component } from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Animated from "react-native-reanimated";
import { SwipeListView } from "react-native-swipe-list-view";

export default class SwipeFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
    };
  }
  onSwipeValueChange = (swipeData) => {
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;
    if (value < Dimensions.get("window").width) {
      const newData = [...allNotifications];
      this.updateMarkAsRead(allNotifications, [key]);
      newData.splice(key, 1);
      this.setState({
        allNotifications: newData,
      });
    }
  };
  updateMarkAsRead = (notification) => {
    db.collection("notifications").doc(notification.doc_id).update({
      notification_status: "read",
    });
  };
    renderItem = (data) => {
      <Animated.View>
    <ListItem
      leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
      title={data.item.book_name}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      subtitle={data.itemMessage}
      bottomDivider
          ></ListItem>
    </Animated.View>;
  };

  renderHiddenItem = () => {
    <View style={styles.rowBack}>
      <View style={[styles.backRightButton, styles.backRightButtonRight]}>
        <Text style={styles.backTextWhite}></Text>
      </View>
    </View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
          keyExtractor={(item, index) => index.toString()}
        ></SwipeListView>
      </View>
    );
  }
}
