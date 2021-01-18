import React from 'react';
import {View, Text} from 'react-native';
import {gql, useQuery} from "@apollo/client";

const HELLO = gql`   
    query h{
        hello
    }
`
export default function Hello(props) {
    const {data, loading, error} = useQuery(HELLO);

    if(loading)
        return <Text>Loading</Text>

    if(error) 
        return <Text>Error, {error}</Text>
    

    return (
        <View>
            <Text>{data.hello}</Text>
        </View>
    );
}
