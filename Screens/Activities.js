// Activities.js
import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import HeaderButton from '../components/HeaderButton';
import { onCollectionSnapshot } from '../Firebase/firestoreHelper'; // Import the helper function

export default function Activities({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [activities, setActivities] = useState([]);

    // Set up the navigation header with buttons
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <HeaderButton
                        onPress={() => navigation.navigate('AddActivity')}
                        iconName="add"
                        iconFamily="MaterialIcons"
                        themeStyles={themeStyles}
                    />
                    <HeaderButton
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
                }));
                setActivities(activitiesData);
            },
            (error) => {
                console.error('Error fetching activities: ', error);
            }
        );

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            {/* Pass the activities data to ItemsList */}
            <ItemsList type="activities" data={activities} />
        </View>
    );
}