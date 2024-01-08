import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import {styles} from '../styles';


const StepHistoryScreen = () => {
  const [stepData, setStepData] = useState([]);

  useEffect(() => {
    const fetchStepHistory = async () => {
      try {
        const userId = auth.currentUser.uid;
        const db = getFirestore();

        const stepsQuery = query(collection(db, 'steps'), where('userId', '==', userId));
        const querySnapshot = await getDocs(stepsQuery);

        const steps = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          steps.push({
            id: doc.id,
            date: data.date.toDate().toDateString(),
            steps: data.steps,
          });
        });

        setStepData(steps);
      } catch (error) {
        console.error('Error fetching step history:', error.message);
      }
    };

    fetchStepHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step History</Text>
      {stepData.length === 0 ? (
        <Text>No step history available.</Text>
      ) : (
        stepData.map((item) => (
          <View key={item.id} style={styles.stepItem}>
            <Text>Date: {item.date}</Text>
            <Text>Steps: {item.steps}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default StepHistoryScreen;
