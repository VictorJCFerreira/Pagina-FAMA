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
import { getUserRole } from './firebaseConfig';

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
  const [userRole, setUserRole] = useState<string | null>(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        const email = user.email;
        const role = await getUserRole(email);

        if (role) {
          setUserRole(role);
        }
      } else {
        setUserRole(null); // Set role to null if user is not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

 return(
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/dashboard"> <DashboardRoutes userRole={userRole} />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);
};


const DashboardRoutes: React.FC<{ userRole: string | null }> = ({ userRole }) => {
  if (userRole === 'admin') {
    return (
      <Switch>
        <Route path="/dashboard/admin" component={AdminDashboard} />
        <Redirect to="/dashboard/admin" />
      </Switch>
    );
  } else if (userRole === 'user') {
    return (
      <Switch>
        <Route path="/dashboard/user" component={UserDashboard} />
        <Redirect to="/dashboard/user" />
      </Switch>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default App;