import BottomBanner from "@/components/LandingUI/Banner/bottom-banner";
import TopBanner from "@/components/LandingUI/Banner/top-banner";
import LandingDeskTop from "@/components/LandingUI/Content/landing-desktop";
import LandingMobile from "@/components/LandingUI/Content/landing-mobile";
import LandingTablet from "@/components/LandingUI/Content/landing-tablet";

export default function Home() {
  return (
    <>
      <TopBanner />
      <LandingDeskTop />
      <LandingTablet />
      <LandingMobile />
      <BottomBanner />
    </>
  );
}
