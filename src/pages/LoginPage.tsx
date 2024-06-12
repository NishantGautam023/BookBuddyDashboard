import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link} from "react-router-dom";
import {useRef} from "react";


export default function LoginPage() {
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);

        function onHandleSubmitClick() {
                const email = emailRef.current?.value
                const password = passwordRef.current?.value

                // Make server call
                console.log(`Data we got is Email: ${email} and Password is ${password}` )

        }

    return (
        <section className="flex justify-center items-center h-screen">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordRef} id="password" type="password" required/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={onHandleSubmitClick} className="w-full">Sign in</Button>
                </CardFooter>
                <div className="mt-4 text-center text-sm pb-8">
                    New to BookBuddy?{" "}
                    <Link to={'/auth/register'} className="underline">
                        Register
                    </Link>
                </div>
            </Card>
        </section>

    )
}
