import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import PressableHeaderButton from '../components/PressableHeaderButton'; // Replace with a Pressable component
import { onCollectionSnapshot } from '../Firebase/firestoreHelper';

export default function Activities({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [activities, setActivities] = useState([]);

    // Set up the navigation header with Pressable buttons
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={customStyles.headerButtonContainer}>
                    <PressableHeaderButton
                        onPress={() => navigation.navigate('AddActivity')}
                        iconName="add"
                        iconFamily="MaterialIcons"
                        themeStyles={themeStyles}
                    />
                    <PressableHeaderButton
                        onPress={() => navigation.navigate('AddActivity')}
                        iconName="run"
                        iconFamily="MaterialCommunityIcons"
                        themeStyles={themeStyles}
                    />
                </View>
            ),
        });
    }, [navigation, themeStyles]);

    // Listen for real-time updates from Firestore
    useEffect(() => {
        const unsubscribe = onCollectionSnapshot(
            'activities',
            (snapshot) => {
                const activitiesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).filter(item => item.name); // Ensure valid items
                setActivities(activitiesData); // Update state with fetched data
            },
            (error) => console.error('Error fetching activities: ', error)
        );

        return () => unsubscribe(); // Clean up subscription
    }, []);

    // Navigate to the Edit screen when an activity item is pressed
    const handleActivityPress = (item) => {
        navigation.navigate('AddActivity', { data: item });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <ItemsList 
                type="activities" 
                data={activities} 
                onItemPress={handleActivityPress} 
            />
        </View>
    );
}

const customStyles = StyleSheet.create({
    headerButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
});