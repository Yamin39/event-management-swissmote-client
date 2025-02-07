import { Link } from "react-router-dom";
import bannerImg from "../../../assets/images/banner.jpg";
import Button from "../../shared/Button/Button";

const Banner = () => {
  return (
    <div className="min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2e3657]">Event planning made easier for everyone</h1>

            <p className="text-gray-600 text-lg max-w-xl">
              GoPlanMe provides guidance and vendors for a variety of event types including funerals, birthday parties, family reunions.
            </p>

            {/* Get started button */}
            <Link to="/services">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Right Column - Image and Stats */}
          <div className="relative">
            {/* 5 Star Rating Card */}
            <div className="sm:absolute border border-gray-200 mb-6 sm:mb-0 sm:border-0 top-4 left-4 bg-white rounded-lg sm:shadow-lg p-3 z-10 flex items-center gap-2">
              <div className="bg-[#007bff] rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg">5 Star</div>
                <div className="text-sm text-gray-500">Based on 420 reviews</div>
              </div>
            </div>

            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden sm:shadow-xl">
              <img src={bannerImg} alt="Event Planning" className="w-full h-full object-cover" />
            </div>

            {/* Stats Card */}
            <div className="sm:absolute border border-gray-200 mt-6 sm:mt-0 bottom-4 right-4 bg-white rounded-lg sm:shadow-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">72%</div>
                  <div className="text-sm text-gray-500">Customer Target</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">96%</div>
                  <div className="text-sm text-gray-500">Sales Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
