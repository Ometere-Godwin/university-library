import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import BookCover from "@/components/BookCover";

function BookOverview({
                          title,
                          author,
                          genre,
                          rating,
                          total_copies,
                          available_copies,
                          description,
                          colour,
                          cover
                      }: Book) {
    return (
        <section className={"book-overview"}>
            <div className={"flex flex-col flex-1 gap-5"}>
                <h1>{title}</h1>

                <div className={"book-info"}>
                    <p className={"font-semibold text-light-200"}>
                        By <span className={"font-semibold text-light-100"}>{author}</span>
                    </p>

                    <p>
                        Category{" "}
                        <span className={"font-semibold text-light-200"}>{genre}</span>
                    </p>

                    <div className={"flex flex-row gap-1"}>
                        <Image src={"/icons/star.svg"} alt={"star"} height={22} width={22}/>
                        <p>{rating}</p>
                    </div>
                </div>

                <div className={"book-copies"}>
                    <p>Total Books{total_copies}</p>
                    <p>Available Books {available_copies}</p>
                </div>

                <p className={"book-description"}>{description}</p>

                <Button className={"book-overview_btn"}>
                    <Image src={"/icons/book.svg"} alt={"Book"} height={20} width={20}/>
                    <p>Borrow now</p>
                </Button>
            </div>

            <div className={"relative flex flex-1 justify-center"}>
                <div className={"relative"}>
                    <BookCover
                        variant="wide"
                        className="z-10"
                        coverColour={colour}
                        coverImage={cover}
                    />

                    <div className={"absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden"}>
                        <BookCover
                            variant="wide"
                            coverColour={colour}
                            coverImage={cover}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookOverview
