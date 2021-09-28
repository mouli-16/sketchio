import { useEffect ,useState } from 'react'
import Sawo from 'sawo'
import Home from '../../components/Home'

const LoginPage = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [payload, setPayload] = useState({});
    useEffect(() => {
        var config = {
            // should be same as the id of the container created on 3rd step
            containerID: 'sawo-container',
            // can be one of 'email' or 'phone_number_sms'
            identifierType: 'email',
            // Add the API key copied from 5th step
            apiKey: 'de2cfd22-bd75-4f60-a654-27a0889746f6',
            // Add a callback here to handle the payload sent by sdk
            onSuccess: payload => {
                console.log("Payload : " + JSON.stringify(payload));
                setUserLoggedIn(true);
                setPayload(payload);
            },
        }
        let sawo = new Sawo(config)
        sawo.showForm()
    }, [])

    return (
        <div className="containerStyle" >
        <section>
  
          {!isUserLoggedIn ? (
            <div className="formContainer" id="sawo-container" style={{"height": "300px", "width": "300px","margin":"auto"}}></div>
          ) : (
            <div className="loggedin">
              <Home/>
            </div>
          )}
        </section>
      </div>
    );
  };

export default LoginPage