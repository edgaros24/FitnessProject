import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  leaderboardItem: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#23BED4',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: 200,
  },
  stepItem: {
    marginBottom: 10,
  },
  stepCount: {
    fontSize: 40,
  },
  startStopButton: {
    backgroundColor: '#197B89',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16
  },
  startStopButtonText: {
    color: 'white',
    fontSize: 20
  },
});