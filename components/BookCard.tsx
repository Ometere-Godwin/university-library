import React from 'react'
import Link from "next/link";
import BookCover from "@/components/BookCover";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function BookCard({id, title, genre, colour, cover, isLoanBook = false}: Book) {
    return (
        <li className={cn(isLoanBook && "xs:w-52 w-full")}>
            <Link href={`/books/${id}`}>
                <BookCover coverColour={colour} coverImage={cover}/>
            </Link>

            <div className={cn("mt-4", !isLoanBook && "xs:max-w-40 max-w-24")}>
                <p className={"book-title"}>{title}</p>
                <p className={"book-genre"}>{genre}</p>
            </div>

            {isLoanBook && (
                <div className={"mt-3 w-full"}>
                    <div className={"book-loaned"}>
                        <Image src={"/icons/calendar.svg"} alt={"Calendar"} height={18} width={18}
                               className={"object-contain"}/>
                        <p className={"text-light-100"}>
                            11 days left to return
                        </p>
                    </div>
                    <Button className={"book-btn"}>Download receipt</Button>
                </div>
            )}
        </li>
    )
}

export default BookCard
