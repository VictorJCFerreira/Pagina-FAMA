import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router,Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { loginUser } from './firebaseConfig';
import Obra from './pages/Obra';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      // There is an authenticated user
      const user = auth.currentUser;
      const userId = user.uid; // Get the user's UID
      console.log('User is authenticated. User ID:', userId);
    } else {
      // No user is authenticated
      console.log('No user is authenticated.');
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid; // Get the user's ID

        if (uid) {
          setUserId(uid); // Set the user's ID
        }
      } else {
        setUserId(null); // Set user ID to null if user is not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

 return(
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/dashboard"> <DashboardRoutes userId={userId} />
      </Route>
      <Route exact path="/obra">
      <Obra />
      </Route>

    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);
};


const DashboardRoutes: React.FC<{ userId: string | null }> = ({ userId }) => {
  if (userId === '9gIk4XzfwAYAPSePmCUYkgmRQZh1') {
    // Redirect to the admin dashboard for the specified user ID
    return <AdminDashboard />
  } else if (userId === 'wtJqF9cmUBZxSN9xPwn4pmS0thG3') {
    // Redirect to the user dashboard for the specified user ID
    return <UserDashboard />
  } else {
    // Handle other cases, such as redirecting to a default dashboard or login
    return 
      <Redirect to="/login" />
  }
};

export default App;