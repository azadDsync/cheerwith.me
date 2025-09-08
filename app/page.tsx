import LandingPage from "@/components/LandingPage";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import ClientQueryProvider from "@/components/ClientQueryProvider";

export const metadata: Metadata = {
  title: "Cheer With Me - Digital Greenboard For Celebration",
  description:
    "Celebrate like we did in school! Create digital greenboard celebrations for birthdays, festivals, national days, and achievements. Interactive experience with confetti, music, and heartfelt messages.",
  openGraph: {
    title: "Digital Greenboard Celebrations - Just Like School Days",
    description:
      "Celebrate birthdays, festivals, and special moments with our interactive digital greenboard - just like the celebrations we loved in school!",
  },
};
export default function Home() {
  return (
    <>
      <main role="main">
  <ClientQueryProvider>
          <Suspense fallback={<Loading></Loading>}>
            <LandingPage />
          </Suspense>
  </ClientQueryProvider>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cheer With Me - Digital Greenboard",
            description:
              "Interactive digital celebration platform for birthdays, festivals, national days, and special occasions",
            applicationCategory: "Entertainment",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Birthday celebrations",
              "Festival wishes",
              "National day tributes",
              "Teacher appreciation",
              "Student achievements",
              "Interactive confetti",
              "Digital greenboard experience",
            ],
          }),
        }}
      />
    </>
  );
}
