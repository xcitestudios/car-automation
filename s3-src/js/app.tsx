import * as React from "react";
import { CognitoLoginComponent } from "./components/cognito.login.component";
import config from "./ui-config.json";

export class App extends React.Component {
    render() {
        return (
            <div>
                <CognitoLoginComponent
                    clientId={config.cognitoClientId}
                    poolDns={config.cognitoPoolDns}
                    poolId={config.cognitoPoolId}
                    region={config.cognitoRegion}
                    lambdaUrl={config.lambdaUrl}
                />
            </div>
        );
    }
}