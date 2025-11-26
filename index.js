import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, FlatList } from 'react-native';

// Sample interests
const INTERESTS = [
  'Music', 'Coding', 'Gaming', 'Art', 'Sports',
  'Books', 'Photography', 'Cooking', 'Fitness', 'Movies'
];

export default function App() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const submitPost = () => {
    if (postText.trim() === '') return alert('Write something before posting!');
    alert(`Posted in: ${selectedInterests.join(', ')}\nText: ${postText}`);
    setPostText('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>DApp</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#fff' }}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Connect with People Who Share Your Interests</Text>
          <Text style={styles.heroDesc}>Select your interests and start joining groups or sharing ideas!</Text>
        </View>

        {/* Interests Selection */}
        <Text style={styles.sectionTitle}>Choose Your Interests</Text>
        <FlatList
          data={INTERESTS}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.interestCard, selectedInterests.includes(item) && styles.interestCardSelected]}
              onPress={() => toggleInterest(item)}
            >
              <Text style={[styles.interestText, selectedInterests.includes(item) && styles.interestTextSelected]}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Selected Interests */}
        {selectedInterests.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: '700', marginBottom: 6 }}>Your Selected Interests:</Text>
            <Text>{selectedInterests.join(', ')}</Text>
          </View>
        )}

        {/* Modal for Posting Ideas */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontWeight: '700', fontSize: 18 }}>Post an Idea</Text>
              <TextInput
                placeholder="Write something..."
                value={postText}
                onChangeText={setPostText}
                style={[styles.input, { height: 80 }]}
                multiline
              />
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <TouchableOpacity style={[styles.heroButton, { flex: 1 }]} onPress={submitPost}>
                  <Text style={{ color: '#fff' }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.heroButton, { flex: 1, backgroundColor: '#888', marginLeft: 8 }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
              </View>s
            </View>s
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 24, fontWeight: '700' },
  startButton: { backgroundColor: '#2f6bff', padding: 10, borderRadius: 8 },
  hero: { marginBottom: 20 },
  heroTitle: { fontSize: 20, fontWeight: '700' },
  heroDesc: { marginTop: 8, color: '#555' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
  interestCard: { backgroundColor: '#f1f1f1', padding: 12, margin: 6, borderRadius: 8, flex: 1, alignItems: 'center' },
  interestCardSelected: { backgroundColor: '#2f6bff' },
  interestText: { color: '#222' },
  interestTextSelected: { color: '#fff', fontWeight: '700' },
  heroButton: { backgroundColor: '#2f6bff', padding: 10, borderRadius: 8, flex: 1, alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginTop: 12 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: 16 },
  modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: 16 },
});
