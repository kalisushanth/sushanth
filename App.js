import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [expense, setExpense] = useState('');
  const [userCount, setUserCount] = useState('');
  const [personName, setPersonName] = useState('');
  const [contribution, setContribution] = useState('');
  const [expensesList, setExpensesList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [splitAmount, setSplitAmount] = useState(0);

  const addExpense = () => {
    if (!expense || !userCount) return;

    const totalExpense = parseFloat(expense);
    const count = parseInt(userCount);
    const split = (totalExpense / count).toFixed(2); // Calculate the split amount per user

    setExpensesList([
      { id: Math.random().toString(), amount: totalExpense, split: split }
    ]);

    setSplitAmount(split); // Store the split amount for further calculations
    setExpense('');
    setUserCount('');
  };

  const addParticipant = () => {
    if (!personName || !contribution) return;

    const amountContributed = parseFloat(contribution);
    const remainingAmount = (parseFloat(splitAmount) - amountContributed).toFixed(2); // Remaining amount for the participant

    setParticipants(prevParticipants => [
      ...prevParticipants,
      { id: Math.random().toString(), name: personName, contribution: amountContributed, remaining: remainingAmount }
    ]);

    setPersonName('');
    setContribution('');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome to the Basic Expense Splitter</Text>
    <TextInput
        style={styles.input}
        placeholder="Enter total expense"
        value={expense}
        keyboardType="numeric"
        onChangeText={setExpense}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Number of users"
        value={userCount}
        keyboardType="numeric"
        onChangeText={setUserCount}
      />
      
      <Button title="Add Expense" onPress={addExpense} />

      <FlatList
        data={expensesList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>Expense: ${item.amount}</Text>
            <Text>Split: ${item.split} per user</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter person's name"
        value={personName}
        onChangeText={setPersonName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter contribution amount"
        value={contribution}
        keyboardType="numeric"
        onChangeText={setContribution}
      />

      <Button title="Add Participant" onPress={addParticipant} />

      <FlatList
        data={participants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Text>Name: {item.name}</Text>
            <Text>Contribution: ${item.contribution}</Text>
            <Text>Remaining Amount: ${item.remaining} to be paid</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  expenseItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  participantItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e9f7ef',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});