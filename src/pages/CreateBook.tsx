import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

import {Button} from "@/components/ui/button.tsx";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useMutation} from "@tanstack/react-query";
import {createBook} from "@/http/api.ts";
import {LoaderCircle} from "lucide-react";



const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters"
    }),
    genre: z.string().min(2, {
        message: "Genres must be at least 2 characters"
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters"
    }),
    coverImage: z.instanceof(FileList).refine(file => {
        return file.length ===1;
    },
        "Cover Image is required"),

    file: z.instanceof(FileList).refine(file => {
            return file.length ===1;
        },
        "file is required"),

})






export default function CreateBook() {






    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            genre: '',
            description: '',
        },
    })

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');


    // Mutations
    const mutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {

           console.log('Book Created successfully')

        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        console.log(values)
        formData.append('title', values.title);
        formData.append('genre', values.genre);
        formData.append('description', values.description);
        formData.append('coverImage', values.coverImage[0]);
        formData.append('file', values.file[0]);

        mutation.mutate(formData);


    }




    return (
        <>
            <section>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                         <div className="flex items-center justify-between">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Create</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="flex items-center gap-4">

                                <Button variant={"outline"}>
                                    <span className="ml-2">Cancel</span>
                                </Button>
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending && <LoaderCircle className="animate-spin" /> }
                                    <span className="ml-2">Submit</span>
                                </Button>


                            </div>

                        </div>
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Create a new Book </CardTitle>
                                <CardDescription>Fill out the form below to create a new book. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="title" // the one in the database section of the form
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"{...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"{...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="genre"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Genre</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"{...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"{...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="coverImage"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>CoverImage</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        className="w-full"{...coverImageRef}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="bookPDF"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>BookPDF</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        className="w-full"{...fileRef}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                </div>

                            </CardContent>
                        </Card>


                    </form>
                </Form>

            </section>
        </>
    )
}
