import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import PressableHeaderButton from '../components/PressableHeaderButton'; // Using the PressableHeaderButton
import { onCollectionSnapshot } from '../Firebase/firestoreHelper';

export default function Diet({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [dietData, setDietData] = useState([]);

    // Set up the navigation header with pressable buttons
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <PressableHeaderButton
                        onPress={() => navigation.navigate('AddDiet')}
                        iconName="add"
                        iconFamily="MaterialIcons"
                        themeStyles={themeStyles}
                    />
                    <PressableHeaderButton
                        onPress={() => navigation.navigate('AddDiet')}
                        iconName="food"
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
            'diet',
            (snapshot) => {
                const dietEntries = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).filter(item => item.name); // Ensure valid items

                setDietData(dietEntries); // Update the state with fetched data
            },
            (error) => console.error('Error fetching diet entries:', error)
        );

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // Navigate to the edit screen when a diet entry is pressed
    const handleDietPress = (item) => {
        navigation.navigate('AddDiet', { type: 'edit', data: item });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <ItemsList 
                type="diet" 
                data={dietData.map((entry) => ({
                    ...entry,
                    warning: entry.calories > 800, // Show warning if calories > 800
                }))}
                onItemPress={handleDietPress} // Pass the press handler to ItemsList
            />
        </View>
    );
}