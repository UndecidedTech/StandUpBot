import React from "react";
import { Button } from "semantic-ui-react"
import { SiDiscord } from "react-icons/si"

function LoginPage() {
    return (
        <div className="Login-Button">
            <a href="#"><Button content="Sign in with Discord" icon={SiDiscord}/></a>
        </div>
    )
}

export default LoginPage;