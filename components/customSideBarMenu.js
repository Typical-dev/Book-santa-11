import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default class CustomSideBarMenu extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      name: "",
      userID: firebase.auth().currentUser.email,
    }
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!cancelled) {
      this.setState({image:uri})
      this.uploadImage(uri, this.state.userID)
    }
  }

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child("user_profiles/" + imageName)
    return ref.put(blob).then(response)
    this.fetchImage(imageName)
  }

  componentDidMount() {
    this.fetchImage(this.state.userID)
    this.getUserProfile()
  }

  fetchImage = (imageName) => {
    var storageRef = firebase.storage().ref().child("user_profiles/" + imageName)
    storageRef.getDownloadURL()
      .then((url) => {
      this.setState({image:url})
      })
      .catch((error) => {
      this.setState({image:"#"})
    })
  }

  getUserProfile() {
    db.collection("users").where("email_id", "==", this.state.userID).onSnapshot((snapShot) => {
      snapShot.forEach((doc) => {
       this.setState({name:doc.data().first_name +" " +doc.data().last_name})
     })
   })
  }
   render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 0.5, alignItems: "center", backgroundColor: "orange" }}
        >
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size="medium"
            onPress={() => {
              this.selectPicture();
            }}
            containerStyle={styles.imageContainer}
            showEditButton
          />
          <Text style={{ fontWeight: "100", fontSize: 20, paddingTop: 10 }}>
            {this.state.name}

          </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Text>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
