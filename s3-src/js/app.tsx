import * as React from "react";
import { CognitoLoginComponent } from "./components/cognito.login.component";
import { TeslaLoginComponent } from "./forms/tesla.login.component";
import config from "./ui-config.json";

export class App extends React.Component {
    render() {
        return (
            <div>
                <CognitoLoginComponent clientId={config.cognitoClientId} userPoolDns={config.cognitoPoolDns} />
                <TeslaLoginComponent />
            </div>
        );
    }
}