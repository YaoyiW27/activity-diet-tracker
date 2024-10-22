import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PressableHeaderButton({ onPress, iconName, iconFamily, themeStyles }) {
    const IconComponent = iconFamily === 'MaterialCommunityIcons' ? MaterialCommunityIcons : MaterialIcons;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                customStyles.button,
                { opacity: pressed ? 0.6 : 1 }, // Feedback on press
            ]}
            android_ripple={{ color: 'gray' }} // Android ripple effect
        >
            <IconComponent name={iconName} size={24} color={themeStyles.textColor} />
        </Pressable>
    );
}

const customStyles = StyleSheet.create({
    button: {
        marginHorizontal: 4,
    },
});