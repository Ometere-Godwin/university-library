import React from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    regular: "book-cover_regular",
    wide: "book-cover_wide",
}

interface BookListProps {
    className?: string;
    variant?: BookCoverVariant;
    coverColour: string;
    coverImage: string;
}

function BookCover({
                       className,
                       variant = "regular",
                       coverColour = "#012848",
                       coverImage = "https://placehold.co/400*600.png",
                   }: BookListProps) {
    return (
        <div className={cn
        ("relative transition-all duration-300",
            variantStyles[variant],
            className,)}
        >
            <BookCoverSvg coverColor={coverColour}/>

            <div className={"absolute z-10"}
                 style={{left: "12%", width: "87.5%", height: "88%"}}>
                <Image
                    src={coverImage}
                    fill
                    alt="Book cover"
                    className={"rounded-sm object-fill"}/>
            </div>
        </div>
    )
}

export default BookCover
