import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';
import {styles} from '../styles';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const db = getFirestore();

        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const leaderboardQuery = query(
          collection(db, 'steps'),
          where('date', '>=', startOfWeek),
        );

        const leaderboardMap = {};

        const unsubscribe = onSnapshot(leaderboardQuery, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userId = doc.data().userId;
            const steps = doc.data().steps;

            if (leaderboardMap[userId]) {
              leaderboardMap[userId] += steps;
            } else {
              leaderboardMap[userId] = steps;
            }
          });

          const leaderboard = Object.entries(leaderboardMap)
            .map(([userId, steps]) => ({ userId, steps }))
            .sort((a, b) => b.steps - a.steps);

          setLeaderboardData(leaderboard);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {leaderboardData.length === 0 ? (
        <Text>No data available.</Text>
      ) : (
        leaderboardData.map((item, index) => (
          <View key={item.userId} style={styles.leaderboardItem}>
            <Text>{index + 1}. User ID: {item.userId}</Text>
            <Text>Total Steps: {item.steps}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default LeaderboardScreen;
