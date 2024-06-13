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
import {Link,  useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {login} from "@/http/api.ts";
import {Loader} from "lucide-react";


export default function LoginPage() {
        const navigate = useNavigate();


        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);


    // Mutations
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {

            navigate('/dashboard/home')

        },
    })

        function onHandleSubmitClick() {
                const email = emailRef.current?.value
                const password = passwordRef.current?.value

                // Make server call




            if(!email || !password) {
                return alert("Please enter your email and password")
            }

            mutation.mutate({email, password})



        }

    return (
        <section className="flex justify-center items-center h-screen">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.<br/>
                        {mutation.isError && <span className="text-red-500 text-sm">{mutation.error.message}</span>}
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
                    {mutation.isPending ? (
                        <Button className="w-full bg-amber-200" disabled>
                            Loading ...  <Loader className="animate-spin" />
                        </Button>
                    ) : (
                        <Button onClick={onHandleSubmitClick} className="w-full">Sign in</Button>
                    )}


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
