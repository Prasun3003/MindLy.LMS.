

import {emailOTPClient} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { env } from "./env"
export const authClient = createAuthClient({
    plugins : [
        emailOTPClient()
    ]
})