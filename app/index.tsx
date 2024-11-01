import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';

interface Item {
  firstName: string;
  lastName: string;
  id: number;
}

const Index = () => {
  const [users, setUsers] = useState<null | Item[]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => {
        console.log(json.users);
        setUsers(json.users);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Users</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color="#ffa500" />
        </View>
      ) : (
        <ScrollView>
          {users &&
            users.map((item: Item) => (
              <View key={item.id} style={styles.userItem}>
                <View style={styles.row}>
                  <Text style={styles.userName}>
                    {item.firstName + " " + item.lastName}
                  </Text>
                  <Link href={`/details/${item.id}`} style={styles.linkButton}>
                    <Text style={styles.linkText}>Details</Text>
                  </Link>
                </View>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    borderBottomWidth: 2,
    borderColor: '#2a8a0b',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#2a8a0b',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  userItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#e6f2d4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b4d9a7',
    shadowColor: '#3ca740',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a3a3a',
  },
  linkButton: {
    backgroundColor: '#6ea52d',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Index;
