import { Link } from "@material-ui/core";
import * as React from "react";

export class GoogleLoginComponent extends React.Component {
    props: {
        clientId: string
    }

    loginUrl() {
        return "https://carauto.auth.eu-west-1.amazoncognito.com/login?response_type=token&client_id=" + this.props.clientId + "&redirect_uri=" + window.encodeURIComponent(window.location.href);
    }

    render() {
        return (
            <Link href={this.loginUrl()}>
                Click here to sign in to your Google account. Use the same account as your Home account.
            </Link>
        )
    }
};