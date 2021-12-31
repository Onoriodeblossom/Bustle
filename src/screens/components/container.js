import React from "react";
import { View, ScrollView, FlatList, Pressable ,StyleSheet} from "react-native";

// export const Container = styled.View`
//   
//   `;
export const Container =(props)=>{
    return(
        <View style={styles(props).container}>

        </View>

    )
}

const styles = props => StyleSheet.create({
    container:{
        width: props.width ? props.width : "100%",
    }




})