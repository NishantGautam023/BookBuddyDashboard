
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
import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {register} from "@/http/api.ts";
import {LoaderCircle} from "lucide-react";
import useTokenStore from "@/store.ts";


export default function RegisterPage() {

        const setToken = useTokenStore((state) => state.setToken);
        const navigate = useNavigate();

        const nameRef = useRef<HTMLInputElement>(null);
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);


        //  Mutations
    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            setToken(response.data.accessToken);
            navigate('/dashboard/home');
        },
    })


    function onHandleRegisterClick() {
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Make a server call

        if(!name || !email || !password) {
            return alert("Please fill all the fields below");
        }

        mutation.mutate({name, email, password})


    }







    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" ref={nameRef} placeholder="Max" required />
                            </div>

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
                            <Input id="password" type="password" ref={passwordRef} />
                        </div>

                        <Button
                            onClick={onHandleRegisterClick}
                            type="submit"
                            className="w-full"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending && <LoaderCircle className="animate-spin" /> }
                             <span className="ml-2">Create an account </span>

                        </Button>

                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                      <Link to={'/auth/login'} className="underline">
                          Sign In
                      </Link>
                    </div>
                </CardContent>
            </Card>
        </section>

    )
}
