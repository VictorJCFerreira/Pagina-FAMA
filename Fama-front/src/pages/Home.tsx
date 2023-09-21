import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar, IonImg, IonFooter, IonInput } from '@ionic/react';
import './Home.css';
import { IonThumbnail } from '@ionic/react';
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle className="ion-padding ion-text-center"></IonTitle>
          <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'5px 0' }}>
          <IonImg
          src="https://construtorafama.com.br/wp-content/uploads/2021/03/logo@2x.png"
          alt="Logo"
          style={{
            width: '120px', // Adjust the width as needed
            height: 'auto', // Maintain aspect ratio
          }}
          />
          </div>
          
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        <IonImg
          src="https://uploaddeimagens.com.br/images/004/611/671/original/images--JzzFB6E0-transformed.png?1695049283"
          alt="Logo"
          style={{
            width: '400px',
            height: 'auto', 
          }}
          />
        </div>
      
        <IonButton size="large" routerLink="/login" style={{
        marginTop: '10px'}}>Login</IonButton>
        <IonButton size="large" className="cadastro-button" fill="outline" routerLink="/cadastro" color="warning" style={{
        marginTop: '10px'}}>Cadastro</IonButton>
      </IonContent>
      <IonFooter>
        <IonToolbar color="dark">
          <div style={{ display: 'flex', flexDirection: 'row',marginLeft: '10px' }}>
          <div  style={{ display: 'flex', justifyContent: 'initial', padding:'08px 0', paddingLeft:'10px' }}>
          <IonImg
          src="https://construtorafama.com.br/wp-content/uploads/2021/03/logo@2x.png"
          alt="Logo"
          style={{
            width: '110px',
            height: 'auto', 
          }}
          />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column',marginLeft: '40px' }}>
          <IonInput
            placeholder="Rua Padre Carapuceiro, 968, sala 403."
            clearInput
            style={{ marginBottom: '0px' }}
          ></IonInput>

          <IonInput
            placeholder="Recife - PE. CEP: 51.020-280"
            clearInput
            style={{ marginBottom: '0px' }}
          ></IonInput>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column',marginLeft: '40px' }}>
          <IonInput
            placeholder="(81) 3471-8288"
            clearInput
            style={{ marginBottom: '0px' }}
          ></IonInput>

          <IonInput
            placeholder="falacomagente@localhost"
            clearInput
            style={{ marginBottom: '0px' }}
          > 
          </IonInput>
          </div>


          </div>
        
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
