import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Obra.css';
import List , {atualizarDatas , Titulo} from '../components/List';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import TabelaGastosEfetuados , {TabelaGastosPendentes} from '../components/TabelasDeGastos';


const Obra: React.FC = () => {
    atualizarDatas();
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <Titulo/>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Obra</IonTitle>
            </IonToolbar>
          </IonHeader>
          <List />
          <TabelaGastosEfetuados/>
          <TabelaGastosPendentes/>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Obra;
  