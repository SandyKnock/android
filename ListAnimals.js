import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Alert, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {listRepos} from './reducer';
import * as imgArr from './img'

const img = imgArr;

class ListAnimals extends Component {
    componentDidMount() {
        this.props.listRepos();
    }

    renderItem = ({item}) => (
        <View style={styles.item}>
            <View style={styles.container}>
                <Image source={{uri: item.img}} style={{width: 100, height: 100}}/>
            </View>
            <Text>{item.list.title}</Text>
            <Text>{item.list.body}</Text>
        </View>
    );

    onApply() {
        Alert.alert('заявка принята!')
    }

    onNewList() {
        Alert.alert('новый список')
    }

    render() {
        const {repos} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    styles={styles.container}
                    data={repos}
                    renderItem={this.renderItem}
                />
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                        onPress={this.onApply}
                        title="Подать заявку"
                    />
                    <Button
                        onPress={this.onNewList}
                        title="Новый список!"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});


const mapStateToProps = state => {
    let result = [];
    let count = 0;
    for (let item of state.repos) {
        count += 1;
        result.push({list: item, img: img.img[count]});
        if (count === 20) {
            break
        }
    }
    return {
        repos: result
    };
};

const mapDispatchToProps = {
    listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAnimals);