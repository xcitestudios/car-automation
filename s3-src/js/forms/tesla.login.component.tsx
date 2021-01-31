import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import * as React from "react";

export class TeslaLoginComponent extends React.Component {
    props: {
        accessToken: string,
        lambdaUrl: string
    }

    async doLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        let body: { [key: string]: any; } = {
            cognitoAcessToken: this.props.accessToken
        };

        formData.forEach((v, k) => {
            body[k] = v.toString();
        });

        const response = await fetch(
            this.props.lambdaUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }
        );

        const result  = response.json();

    }

    render() {
        if (this.props.accessToken === '') {
            return <div />;
        }

        return (
            <form onSubmit={this.doLogin}>
                <p>Enter your Tesla username/password. This will be used to generate a token used to access your account, your username/password will not be stored.</p>
            
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