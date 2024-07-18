import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/http/api.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Book } from "@/types.ts";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BooksPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["books"],
        queryFn: getBooks,
        staleTime: 10000,
    });

     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    const handleDeleteClick = (book: Book) => {
        setBookToDelete(book);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (bookToDelete) {
            console.log("Deleting book:", bookToDelete);
            setIsDeleteDialogOpen(false);
            setBookToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setBookToDelete(null);
    };


  

    return (
        <>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components">Books</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link to={'/dashboard/books/create'}>
                    <Button>
                        <CirclePlus size={20} />
                        <span className="ml-2">ADD BOOK</span>
                    </Button>
                </Link>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>
                        Manage your books and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : isError ? (
                        <div>Error loading books. Please try again later.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Genre</TableHead>
                                    <TableHead className="hidden md:table-cell">Author Name</TableHead>
                                    <TableHead className="hidden md:table-cell">Created At</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.data.map((book: Book) => (
                                    <TableRow key={book._id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <img
                                                alt={book.title}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={book.coverImage}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-sky-300">
                                                {book.genre}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {book.author.name}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {book.createdAt}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteClick(book)}>Delete</DropdownMenuItem>
                                                
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                    </div>
                </CardFooter>
            </Card>

    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the book
                            "{bookToDelete?.title}" from our database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            


            
        </>
    );
}