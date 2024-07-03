import travelTripsTwoIma from "@/asset/images/home/travel-tips-2.jpg";
import travelTripsImg from "@/asset/images/home/trips.png";
import DrdSection from "@/components/shared/DrdSection";
import RootContainer from "@/components/shared/RootContainer";
import Image from "next/image";
import React from "react";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
  TbCircleNumber6Filled,
  TbCircleNumber7Filled,
  TbCircleNumber8Filled,
} from "react-icons/tb";

const TripsAndGuideTwo: React.FC = () => (
  <div className=" pb-20 pt-16">
    <DrdSection name="Trips & Guide" description="Explore the world with us" />
    <div className="space-y-20">
      <div>
        <RootContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32">
            <div data-aos="fade-right">
              <Image
                src={travelTripsImg}
                alt="Travel trips and tricks"
                className="rounded-2xl"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div className="space-y-8 text-drd-green" data-aos="fade-left">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber1Filled className="text-drd-dark-green size-10" />
                  Purchase travel insurance
                </h1>
                <p className="text-slate-400">
                  Purchase travel insurance. Look, no one wants to spend money
                  on travel insurance for international travel
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber2Filled className="text-drd-dark-green size-10" />
                  Avoid travel fatigue
                </h1>
                <p className="text-slate-400">
                  As you start booking your first international trip, your
                  excitement may get the better of you and you may want to go
                  all out
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber3Filled className="text-drd-dark-green size-10" />
                  Be aware of free wifi spots
                </h1>
                <p className="text-slate-400">
                  Research and remember which places locally have free WiFi
                  (think McDonald&lsquo;s, Starbucks, etc.) Download city maps
                  onto your phone so you can use them offline.
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber4Filled className="text-drd-dark-green size-10" />
                  Bring a power adapter
                </h1>
                <p className="text-slate-400">
                  If you&apos;re traveling abroad, chances are the electric plug
                  system is different
                </p>
              </div>
            </div>
          </div>
        </RootContainer>
      </div>
      <div>
        <RootContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32">
            <div className="block md:hidden" data-aos="fade-right">
              <Image
                src={travelTripsTwoIma}
                alt="Travel trips and tricks"
                className="rounded-2xl"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div className="space-y-8 text-drd-green" data-aos="fade-right">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber5Filled className="text-drd-dark-green size-10" />
                  Eat Local
                </h1>
                <p className="text-slate-400">
                  One of the best parts of traveling is trying the local food.
                  Don&lsquo;t be afraid to try new things, even if you
                  don&lsquo;t know what they are.{" "}
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber6Filled className="text-drd-dark-green size-10" />
                  Stay in hostels
                </h1>
                <p className="text-slate-400">
                  Hostels are a great way to save money while traveling. You can
                  stay in a dorm room with other travelers or rent a private
                  room.
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber7Filled className="text-drd-dark-green size-10" />
                  Packing cube
                </h1>
                <p className="text-slate-400">
                  Packing cubes are a great way to stay organized while
                  traveling. You can use them to separate your clothes by type
                  and keep everything neat and tidy in your suitcase.{" "}
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-4 mb-2">
                  <TbCircleNumber8Filled className="text-drd-dark-green size-10" />
                  Take free walking tours
                </h1>
                <p className="text-slate-400">
                  Free walking tours are a great way to explore a new city and
                  learn about its history and culture. Most major cities offer
                  free walking tours, and they are a great way to meet other
                  travelers.{" "}
                </p>
              </div>
            </div>
            <div className="hidden md:block" data-aos="fade-left">
              <Image
                src={travelTripsTwoIma}
                alt="Travel trips and tricks"
                className="rounded-2xl"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </RootContainer>
      </div>
    </div>
  </div>
);

export default TripsAndGuideTwo;
