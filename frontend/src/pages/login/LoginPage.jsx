import { useEffect, useState } from "react";
import Sawo from "sawo";

import Home from "../../components/Home";

const LoginPage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    var config = {
      // Id of the container
      containerID: "sawo-container",
      // Can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      // The API key
      apiKey: "de2cfd22-bd75-4f60-a654-27a0889746f6",
      // Callback to handle the payload sent by sdk
      onSuccess: (payload) => {
        console.log("Payload : " + JSON.stringify(payload));
        setUserLoggedIn(true);
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
  }, []);

  return (
    <div className="containerStyle">
      <section>
        {!isUserLoggedIn ? (
          <div
            className="formContainer"
            id="sawo-container"
            style={{ height: "300px", width: "300px", margin: "auto" }}
          ></div>
        ) : (
          <div className="loggedin">
            <Home />
          </div>
        )}
      </section>
    </div>
  );
};

export default LoginPage;
