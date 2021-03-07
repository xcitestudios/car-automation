import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import * as React from "react";

export class TeslaLoginComponent extends React.Component {
    props: {
        accessToken: string,
        lambdaUrl: string
    }

    state: {
        loginFailureReason: null | string
    }

    constructor(props) {
        super(props);

        this.state = {
            loginFailureReason: null
        };
    }

    async doLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        let body: { [key: string]: any; } = {
            action: 'teslaAuthenticate',
            data: {
                jwt: {
                    token: this.props.accessToken
                }
            }
        };

        formData.forEach((v, k) => {
            body.data[k] = v.toString();
        });

        let response: Response;

        try {
            response = await fetch(
                this.props.lambdaUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }
            );
        } catch (err) {
            this.setState({
                loginFailureReason: err
            });

            return;
        }

        const result = response.json();

    }

    render() {
        if (this.props.accessToken === '') {
            return <div />;
        }

        let errorMessage: JSX.Element = undefined;

        if (this.state.loginFailureReason !== null) {
            errorMessage = <div>{this.state.loginFailureReason}</div>
        }

        return (
            <form onSubmit={this.doLogin}>
                <p>Enter your Tesla username/password. This will be used to generate a token used to access your account, your username/password will not be stored.</p>

                {errorMessage}
            
                <FormControl>
                    <InputLabel htmlFor="username">Username:</InputLabel> 
                    <Input type="text" id="username" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <Input type="password" id="password" />
                </FormControl>

                <Button type="submit">Submit</Button>
            </form>
        )
    }
};