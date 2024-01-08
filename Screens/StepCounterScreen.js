import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { auth } from '../firebase';
import { getFirestore, collection, addDoc, serverTimestamp, 
  query, where, getDocs, setDoc } from 'firebase/firestore';
import {styles} from '../styles';


const StepCounterScreen = ({ navigation }) => {
  const [stepCount, setStepCount] = useState(0);
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [isCounting, setIsCounting] = useState(false);
  const [stepThreshold, setStepThreshold] = useState(0.3);

  useEffect(() => {
    let gyroscopeSubscription;
    let accelerometerSubscription;

    const startSensors = async () => {
      gyroscopeSubscription = Gyroscope.addListener(data => {
        setGyroscopeData(data);
        if (isCounting) {
          handleStepDetection(data);
        }
      });

      accelerometerSubscription = Accelerometer.addListener(data => {
        setAccelerometerData(data);
        if (isCounting) {
          handleStepDetection(data);
        }
      });
    };

    const handleStepDetection = data => {
      const LOW_PASS_FILTER_FACTOR = 0.1;
      let filteredAcceleration = 0;

      // Apply a simple low-pass filter to accelerometer data
      filteredAcceleration =
        LOW_PASS_FILTER_FACTOR * data.x + (1 - LOW_PASS_FILTER_FACTOR) * filteredAcceleration;

      if (filteredAcceleration > stepThreshold) {
        setStepCount(prevCount => prevCount + 1);
      }
    };

    startSensors();

    return () => {
      if (gyroscopeSubscription) {
        gyroscopeSubscription.remove();
      }
      if (accelerometerSubscription) {
        accelerometerSubscription.remove();
      }
    };
  }, [isCounting, stepThreshold]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleToggleCounting = async () => {
    const db = getFirestore();
    const userId = auth.currentUser.uid;
  
    try {
      if (!isCounting) {
        // Counting started, do nothing for now
      } else {
        // Counting stopped, update the existing document with the final step count
        const today = new Date();
        const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
        const stepsQuery = query(collection(db, 'steps'), where('userId', '==', userId), where('date', '==', todayTimestamp));
        const querySnapshot = await getDocs(stepsQuery);
  
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          await setDoc(doc.ref, { steps: stepCount }, { merge: true });
          console.log('Document updated with steps: ', stepCount);
        } else {
          // If no document exists for today, add a new one
          const stepsData = {
            userId,
            steps: stepCount,
            date: serverTimestamp(),
          };
  
          const docRef = await addDoc(collection(db, 'steps'), stepsData);
          console.log('Document written with ID: ', docRef.id);
        }
      }
  
      // Toggle counting state
      setIsCounting(prevIsCounting => !prevIsCounting);
    } catch (error) {
      console.error('Error updating Firestore:', error.message);
    }
  };

  const handleNavigateToHistory = () => {
    navigation.navigate('StepHistory');
  };

  const handleNavigateToLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step CounterScreen</Text>
      <Text style={styles.stepCount}>Total Steps: {stepCount}</Text>
      <TouchableOpacity
        style={[styles.startStopButton, { backgroundColor: isCounting ? 'red' : '#197B89' }]}
        onPress={handleToggleCounting}
      >
        <Text style={styles.startStopButtonText}>{isCounting ? 'Stop Counting' : 'Start Counting'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToHistory}>
        <Text style={styles.buttonText}>View Step History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToLeaderboard}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepCounterScreen;
