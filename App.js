import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Linking
} from 'react-native';

// Live Replit Backend URL
const BACKEND_URL = 'https://gov-service-hub--bhaktaram08.replit.app';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [portals, setPortals] = useState([]);
  const [activeTab, setActiveTab] = useState('Odisha');

  const fetchPortals = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/portals`);
      const data = await response.json();
      setPortals(data);
    } catch (error) {
      console.error("Error fetching portals:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPortals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPortals();
  };

  const openUrl = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("An error occurred", err));
    }
  };

  const filteredPortals = portals.filter(portal => portal.category === activeTab);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0052cc" />
        <Text style={styles.loadingText}>Loading Portals...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Govt All Web</Text>
        <Text style={styles.headerSubtitle}>Digital Seva India</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Odisha', 'Central', 'Admin'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'Central' ? 'Central Govt' : tab === 'Odisha' ? 'Odisha Services' : 'Admin Panel'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {activeTab === 'Admin' ? (
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Admin Dashboard Login</Text>
            <Text style={styles.adminInfo}>Email: admin@govallweb.com</Text>
            <Text style={styles.adminInfo}>Password: adminpassword123</Text>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => openUrl(`${BACKEND_URL}/admin`)}
            >
              <Text style={styles.adminButtonText}>Open Web Admin Panel</Text>
            </TouchableOpacity>
          </View>
        ) : filteredPortals.length === 0 ? (
          <Text style={styles.noDataText}>No portals available for this category.</Text>
        ) : (
          filteredPortals.map((portal) => (
            <TouchableOpacity
              key={portal._id || portal.id}
              style={styles.portalCard}
              onPress={() => openUrl(portal.url)}
            >
              <View style={styles.portalInfo}>
                <Text style={styles.portalName}>{portal.name}</Text>
                <Text style={styles.portalDesc} numberOfLines={2}>{portal.description}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>➔</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5eb',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0052cc',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0052cc',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#ffffff',
  },
  scrollContent: {
    padding: 15,
  },
  portalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  portalInfo: {
    flex: 1,
    paddingRight: 10,
  },
  portalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  portalDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#0052cc',
    fontWeight: 'bold',
  },
  adminCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  adminInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  adminButton: {
    backgroundColor: '#0052cc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  adminButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
    fontSize: 15,
  }
});
