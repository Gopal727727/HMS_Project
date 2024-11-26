import HomeBanner from "@/Components/HomeBanner";
import Homeservices from "@/Components/HomeServices";
import Homegallery from "@/Components/Homegallery";
import Homereview from "@/Components/Homereview";

export default function page() {
  return (
      <main>
          <HomeBanner />
          <Homeservices />
          <Homegallery />
          <Homereview />
      </main>
  );
}
