import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import * as React from "react";

export class TeslaLoginComponent extends React.Component {
    doLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    render() {
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