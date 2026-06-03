import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// 1. Create Context
const IssueContext = createContext();

// 2. Create Provider Component
export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch issues from the API
  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    console.log("IssueContext: Fetching issues...");

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.log("IssueContext: No authentication token found. Skipping fetch.");
        setIssues([]);
        setLoading(false);
        return;
      }

      let endpoint = `${API_URL}/issues/my`;
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        if (payload.user && payload.user.isAdmin) {
          endpoint = `${API_URL}/issues`;
        }
      } catch (e) {
        console.error("Error safely decoding token in IssueContext", e);
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('IssueContext: Failed to fetch issues -', response.status, errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIssues(data);
      console.log("IssueContext: Issues fetched successfully.", data);
    } catch (err) {
      console.error("IssueContext: Error fetching issues:", err);
      setError(err.message || 'Failed to fetch issue data.');
      setIssues([]); // Clear issues on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load and auth changes
  useEffect(() => {
    fetchIssues();
    
    const handleAuthChange = () => {
      fetchIssues();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Function to update the status of a specific issue
  const updateIssueStatus = async (issueId, newStatus, adminFeedback) => {
    console.log(`IssueContext: Updating issue ${issueId} to status ${newStatus}`);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_URL}/issues/${issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, adminFeedback })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update issue');
      }

      const updatedIssueData = await response.json();

      setIssues(prevIssues =>
        prevIssues.map(issue =>
          issue._id === issueId ? updatedIssueData.issue : issue
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error("IssueContext: Error updating issue:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <IssueContext.Provider value={{ issues, loading, error, updateIssueStatus, fetchIssues }}>
      {children}
    </IssueContext.Provider>
  );
};

// 3. Create Custom Hook to use the Context
export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};
