const fetchUserData = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/user/currentUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            console.error('Failed to fetch user data');
            return null;
        }
    } 
    catch (error) {
        console.error('Error fetching user data', error);
        return null;
    }
};

const fetchAllUsers = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/user/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const usersData = await response.json();
            return usersData;
        } else {
            console.error('Failed to fetch users data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching users data', error);
        return null;
    }
};
  
export { fetchUserData, fetchAllUsers };
  