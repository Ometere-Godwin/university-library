import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import {sampleBooks} from "@/constants";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";

export default async function Home() {
    const result = await db.select().from(users);
    console.log(result);
    return (
        <>
            <BookOverview {...sampleBooks[0]}/>
            <BookList
                title="Latest Books"
                books={sampleBooks}
                containerClassName="mt-20"/>
        </>
    );
}
