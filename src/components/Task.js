import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

import commomStyles from '../commomStyles';


export default props =>{

    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through'} : {};

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');


    return (

        <View style={styles.container}> 
            <TouchableWithoutFeedback onPress={()=> props.toggleTask(props.id)}>

                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View> 
            </TouchableWithoutFeedback>
            <View> 

                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
            </View>

        </View>
    )
}

function getCheckView(doneAt){

    if(doneAt != null){
        
        return(
            <View style={styles.done}>
                <Icon name='check' size={20} color={commomStyles.colors.secondary}></Icon>
            </View>
        )
    }else{

        return(
            <View style={styles.pending}></View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',

    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        justifyContent: 'center',
        alignItems: 'center',
    },
    desc:{
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.mainText,
        fontSize: 15,
    },
    date:{
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.subText,
        fontSize: 12,
    }
})
