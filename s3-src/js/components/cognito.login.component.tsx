import { Link } from "@material-ui/core";
import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { CognitoUser } from "@aws-amplify/auth";
import * as React from "react";
import { TeslaLoginComponent } from "../forms/tesla.login.component";

export class CognitoLoginComponent extends React.Component {
    props: {
        lambdaUrl: string,
        clientId: string,
        poolDns: string,
        poolId: string,
        region: string,
    }

    state: {
        user: CognitoUser | null,
        accessToken: string,
    }

    constructor(props) {
        super(props);

        Amplify.configure({
            oauth: {
                domain: this.props.poolDns + '.auth.' + this.props.region + '.amazoncognito.com',
                scope: ['email', 'profile', 'openid'],
                responseType: 'code',
                redirectSignIn: this.loginUrl(),
                redirectSignOut: this.loginUrl()
            },
            Auth: {
                region: this.props.region,
                userPoolId: this.props.poolId,
                userPoolWebClientId: this.props.clientId
            }
        });

        this.state = {
            user: null,
            accessToken: ''
        };

        Hub.listen('auth', (e) => this.authStateChanged(e));
    }

    async authStateChanged(e: any) {
        switch (e.payload.event) {
            case 'signIn':
                this.setState({
                    user: e.payload.data
                });
                await this.getUserToken();
                break;

            case 'signOut':
                this.setState({
                    user: null,
                    accessToken: ''
                });

                break;
        }
    }

    loginUrl() {
        let redirectUri = window.location.protocol + '//' + window.location.hostname;
        if (['80', '443'].indexOf(window.location.port) === -1) {
            redirectUri += ':' + window.location.port;
        }
        redirectUri += window.location.pathname.replace('//', '/');

        return redirectUri;
    }

    login(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google
        });
    }

    getUserToken(): void {
        this.state.user.getSession((err, data) => {
            this.setState({
                accessToken: data.accessToken.jwtToken
            });
        }, {clientMetadata: {}});
    }

    render() {
        if (this.state.user !== null) {
            return <TeslaLoginComponent accessToken={this.state.accessToken} lambdaUrl={this.props.lambdaUrl} />;
        }

        return (
            <Link href="#" onClick={this.login}>
                Click here to sign in to your Google account. Use the same account as your Home account.
            </Link>
        )
    }
};