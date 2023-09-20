import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './visaogeral.css';
import ListadeObras from '../components/ListadeObras';
import { IonCol, IonGrid, IonRow } from '@ionic/react';




const Visaogeral: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Visão Geral das Obras</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Visão Geral das Obras</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ListadeObras />
          <IonButton size="default" >Adicionar Obra</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Visaogeral;
  