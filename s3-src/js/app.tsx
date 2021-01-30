import * as React from "react";
import { GoogleLoginComponent } from "./components/google.login.component";
import { TeslaLoginComponent } from "./forms/tesla.login.component";

export class App extends React.Component {
    render() {
        return (
            <div>
                <GoogleLoginComponent clientId="abc" />
                <TeslaLoginComponent />
            </div>
        );
    }
}