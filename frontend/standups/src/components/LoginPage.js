import React from "react";
import { Button } from "semantic-ui-react"
import { SiDiscord } from "react-icons/si"

function LoginPage() {
    return (
        <div className="Login-Button">
            <Button content="Sign in with Discord" icon={SiDiscord}/>
        </div>
    )
}

export default LoginPage;