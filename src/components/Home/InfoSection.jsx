import React from "react";
import {
  faHandHoldingHeart,
  faQuestionCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "./InfoCard";

const InfoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            iconName={faQuestionCircle}
            title="Why Donate Food?"
            description="By donating food, you help nourish those in need, bringing hope and sustenance to families across the globe."
          />
          <InfoCard
            iconName={faHandHoldingHeart}
            title="How Your Donation Helps"
            description="Each contribution supports food storage, delivery, and helps us create a hunger-free world. Your efforts make a big difference!"
          />
          <InfoCard
            iconName={faStar}
            title="Success Stories"
            description="Discover stories of individuals and communities positively impacted by food donations, highlighting the importance of our shared mission."
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
