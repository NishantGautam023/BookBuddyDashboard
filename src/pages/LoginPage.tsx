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

export default function LoginPage() {
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
                        <Input id="email" type="email" placeholder="m@example.com" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Sign in</Button>
                </CardFooter>
                <div className="mt-4 text-center text-sm pb-8">
                    New to BookBuddy?{" "}
                    <Link to={'/register'} className="underline">
                        Register
                    </Link>
                </div>
            </Card>
        </section>

    )
}
