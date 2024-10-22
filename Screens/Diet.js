import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import HeaderButton from '../components/HeaderButton';
import { onCollectionSnapshot } from '../Firebase/firestoreHelper'; 

export default function Diet({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [dietData, setDietData] = useState([]);

    // Set up the navigation header with buttons
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <HeaderButton 
                        onPress={() => navigation.navigate('AddDiet')}
                        iconName="add"
                        iconFamily="MaterialIcons"
                        themeStyles={themeStyles}
                    />
                    <HeaderButton 
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
                }));
                setDietData(dietEntries);
            },
            (error) => {
                console.error('Error fetching diet entries: ', error);
            }
        );

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            {/* Pass the diet data to ItemsList */}
            <ItemsList type="diet" data={dietData} />
        </View>
    );
}