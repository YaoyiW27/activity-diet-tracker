import { StyleSheet } from "react-native";

const colors = {
    activeTintColor: '#d4a373',
    inactiveTintColor: 'black',
    headerBackgroundColor: '#3a5a40',
    headerTextColor: '#fff',
    tabBarBackgroundColor: '#3a5a40',
    lightTheme: {
        backgroundColor: '#a3b18a',
        textColor: '#fff',
    },
    darkTheme: {
        backgroundColor: '#84a98c',
        textColor: '#000',
    },
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'stretch', 
      padding: 10, 
    },
    addButton: {
      padding: 10,
      borderRadius: 5, 
    },
    addScreenContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#a3b18a',
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#344e41',
    },
    input: {
        borderWidth: 1,
        borderColor: '#3a5a40',
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 5,
        borderColor: '#3a5a40',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3a5a40',
        padding: 8,
        borderRadius: 5,
        flex: 0.48,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
    },
    tallInput: {
        height: 100,
    },
    toggleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      toggleCard: {
        backgroundColor: '#3a5a40',  
        borderRadius: 10,            
        padding: 10,                 
        marginVertical: 8,          
        width: '50%',                
        shadowOpacity: 0.15,      
        shadowRadius: 5,           
        shadowColor: '#000',         
        shadowOffset: { height: 2, width: 0 }, 
        elevation: 4,               
      },
      itemsCard: {
        backgroundColor: '#3a5a40',  
        borderRadius: 10,            
        padding: 10,                
        marginVertical: 8,           
        flex: 1,   
        shadowOpacity: 0.15,        
        shadowRadius: 5,            
        shadowColor: '#000',      
        shadowOffset: { height: 2, width: 0 }, 
        elevation: 4,             
      },
      rowContainer: {
        flexDirection: 'row',        
        justifyContent: 'space-between', 
        alignItems: 'center',       
      },
      activityName: {
        fontSize: 15,                
        fontWeight: 'bold',         
        color: '#FFFFFF',           
        flex: 1,                   
      },
      detailsContainer: {
        flexDirection: 'row',        
        alignItems: 'center',        
      },
      detailBox: {
        backgroundColor: '#FFFFFF',  
        padding: 8,                  
        borderRadius: 5,          
      },
      activityDetail: {
        fontSize: 13,              
        color: '#000',             
      },
      warning: {                        
        marginRight: 10,
      },
});

export { colors , styles };