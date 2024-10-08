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
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api.ts";
import { Loader, Eye, EyeOff } from "lucide-react";
import useTokenStore from "@/store.ts";
import { useToast } from "@/components/ui/use-toast";

import { posthog } from "posthog-js";





export default function LoginPage() {
    const navigate = useNavigate();
    const setToken = useTokenStore((state) => state.setToken)


    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [eyeShowPassword, setEyeShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setEyeShowPassword(!eyeShowPassword)
    }


    const { toast } = useToast()






    // Mutations
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {

            console.log("Login successful", response)
            setToken(response.data.accessToken);

            // Identify user in PostHog
            posthog.identify(response.data.user._id, {
                email: response.data.user.email,
                name: response.data.user.name
            });

            // Capture login event
            posthog.capture('user_logged_in', {
                login_type: 'email'
            });

            toast({
                description: "Login Successful!",
                duration: 1500,
                variant: "destructive"



            })
            navigate('/dashboard/home')


        },
        onError: (error: any) => {
            let errorMessage = "An error occurred while logging in. Please try again.";

            if (error.response) {
                if (error.response.status === 404) {
                    errorMessage = "The requested email or password is not correct.";
                } else if (error.response.status === 500) {
                    errorMessage = "Internal server error. Please try again later.";
                }
            } else if (error.request) {
                toast({
                    description: errorMessage,
                    duration: 1500,
                    variant: "destructive"
                })
                return;
            }

            toast({
                description: errorMessage,
                duration: 1500,
                variant: "destructive"
            })
        }



    })



    function onHandleSubmitClick(event: React.FormEvent) {
        event.preventDefault()
        const email = emailRef.current?.value
        const password = passwordRef.current?.value






        if (!email || !password) {
            return alert("Please enter your email and password")
        }

        // Temporarily hide password before submitting
        if (eyeShowPassword) {
            setEyeShowPassword(false);
        }



        mutation.mutate({ email, password })



    }

    return (
        <section className="flex justify-center items-center h-screen">

            <Card className="w-full max-w-sm">
                <form onSubmit={onHandleSubmitClick}>


                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.<br />
                            {mutation.isError && <span className="text-red-500 text-sm">Please Enter correct Email or Password</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" autoComplete="email" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    ref={passwordRef}
                                    id="password"
                                    type={eyeShowPassword ? "text" : "password"}
                                    autoComplete="password"
                                    required
                                    className="pr-10" // Add padding to the right to make space for the icon
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {eyeShowPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {mutation.isPending ? (
                            <Button className="w-full bg-amber-200" disabled>
                                Loading ...  <Loader className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full" onClick={togglePasswordVisibility}>Sign in</Button>

                        )}


                    </CardFooter>
                </form>
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
