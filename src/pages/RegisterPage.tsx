import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/http/api.ts";
import { Loader } from "lucide-react";
import useTokenStore from "@/store.ts";

export default function RegisterPage() {
    const setToken = useTokenStore((state) => state.setToken);
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mutations
    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            setToken(response.data.accessToken);
            navigate('/dashboard/home');
        },
        onError: (error: any) => {
            let errorMessage = "An error occurred during registration. Please try again.";

            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = "Invalid data provided. Please check your input.";
                } else if (error.response.status === 500) {
                    errorMessage = "Internal server error. Please try again later.";
                }
            }

            setErrorMessage(errorMessage);
        }
    })

    function onHandleRegisterClick(event: React.FormEvent) {
        event.preventDefault();
        setErrorMessage(null);  // Clear previous error message
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!name || !email || !password) {
            return setErrorMessage("Please fill all the fields.");
        }

        if (!isValidEmail(email)) {
            return setErrorMessage("Please enter a valid email address.");
        }

        if (password.length < 6) {
            return setErrorMessage("Password must be at least 6 characters long.");
        }

        mutation.mutate({ name, email, password });
    }

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm mx-auto p-4 shadow-lg rounded-lg">
                <form onSubmit={onHandleRegisterClick}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" ref={nameRef} placeholder="Max" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    ref={emailRef}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" ref={passwordRef} required />
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 text-sm">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && <Loader className="animate-spin mr-2" />}
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to={'/auth/login'} className="underline text-blue-600 hover:text-blue-800">
                                Sign In
                            </Link>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </section>
    )
}