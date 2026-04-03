import DetailsSection from "@/components/details-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import PeopleSection from "@/components/people-section";
import RsvpSection from "@/components/rsvp-section";
import SiteFooter from "@/components/site-footer";
import SummarySection from "@/components/summary-section";
import TimelineSection from "@/components/timeline-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6f0ed_0%,#fbf8f6_45%,#f7f0ed_100%)] text-stone-800">
      <Navbar />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
        <HeroSection />
        <DetailsSection />
        <PeopleSection />
        <TimelineSection />
        <SummarySection />
        <RsvpSection />
        <SiteFooter />
      </div>
    </main>
  );
}
