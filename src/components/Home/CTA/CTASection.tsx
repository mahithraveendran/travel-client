import bgImage from "@/asset/images/home/cta-image.jpg";
import RootContainer from "@/components/shared/RootContainer";
import Link from "next/link";

const CTASection = () => {
  return (
    <div data-aos="fade-up-left">
      <RootContainer className="rounded-lg pb- pt-32">
        <div
          className="rounded-lg relative"
          style={{
            backgroundImage: `url('${bgImage.src}')`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* // green overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-drd-dark-green  opacity-50 rounded-lg"></div>
          <div className="py-20 z-30 relative rounded-lg">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">
                Ready to start your journey?
              </h1>
              <p className="text-lg py-5">
                Get in touch with us to start your journey
              </p>
              <Link href="/about-us">
                <button className="bg-white text-drd-green px-8 py-2 rounded-full hover:text-drd-green hover:bg-drd-light-green hover:ease-in-out duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </RootContainer>
    </div>
  );
};

export default CTASection;
