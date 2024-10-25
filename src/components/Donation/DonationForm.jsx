import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "../../utility/Storage";
import queryClient from "../../utility/Storage";
import Notification from "../../Ui/Notification";
import ErrorPage from "../../Ui/Error";
import { Button } from "@material-tailwind/react";
import ButtonLoader from "../../Ui/ButtonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const DonationForm = () => {
  const [showOccasionCards, setShowOccasionCards] = useState(true);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [number, setNumber] = useState("");
  const [delivery, setDelivery] = useState("pickup");
  const [diet, setDiet] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState(null);
  const [showCarbonFootprint, setShowCarbonFootprint] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  
  const navigate = useNavigate();
  const firebase = useFirebase();

  const occasions = [
    { id: 'birthday', title: 'Birthday', icon: '🎂' },
    { id: 'wedding', title: 'Wedding Reception', icon: '💒' },
    { id: 'corporate', title: 'Corporate Meet', icon: '💼' },
    { id: 'party', title: 'Party', icon: '🎉' },
    { id: 'anniversary', title: 'Anniversary', icon: '💑' },
    { id: 'other', title: 'Other Events', icon: '📅' },
    { id: 'willing', title: 'Willingly Donate', icon: '❤️' },
  ];

  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [locationError, setLocationError] = useState("");

  const calculateCarbonFootprint = (quantity) => {
    // Simple carbon footprint calculation
    // Average food waste creates about 2.5 kg of CO2 per kg of food
    const averageFoodWeight = 0.5; // Assuming average portion is 500g
    const totalWeight = quantity * averageFoodWeight;
    const carbonSaved = totalWeight * 2.5;
    return carbonSaved.toFixed(2);
  };

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
    setShowOccasionCards(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    switch (name) {
      case "food-name":
        setFoodName(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "expiration-date":
        setExpirationDate(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "name":
        setName(value);
        break;
      case "delivery":
        setDelivery(value);
        break;
      default:
        break;
    }

    if (type === "checkbox") {
      if (checked) {
        setDiet([...diet, value]);
      } else {
        setDiet(diet.filter((item) => item !== value));
      }
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setLocationError(err.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const { longitude, latitude } = location;

  const formData = {
    occasion: selectedOccasion?.id,
    foodName,
    quantity,
    expirationDate,
    longitude,
    latitude,
    name,
    number,
    delivery,
    diet,
    image,
  };

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: firebase.handleNewMealsListing,
    onSuccess: () => {
      const carbonSaved = calculateCarbonFootprint(quantity);
      setCarbonFootprint(carbonSaved);
      setShowCarbonFootprint(true);
      queryClient.invalidateQueries(["meals"]);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate(formData);
  };

  if (showCarbonFootprint) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-2xl p-8 bg-gray-900 shadow-md rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-color">Thank You for Your Donation!</h2>
          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <p className="text-gray-100 text-xl mb-6">
              Your donation will help reduce approximately:
            </p>
            <div className="inline-block bg-gray-700 rounded-full p-8 mb-4">
              <p className="text-5xl font-bold text-green-500 mb-2">
                {carbonFootprint} kg
              </p>
              <p className="text-gray-300 text-lg">of CO₂ emissions</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/donation/meals")}
            className="bg-primary-color hover:bg-secondary-color text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            View All Donations
          </Button>
        </div>
      </div>
    );
  }

  if (showOccasionCards) {
    return (
      <div className="min-h-screen bg-gray-800">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-12 text-primary-color text-center">
            Select Donation Occasion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                onClick={() => handleOccasionSelect(occasion)}
                className="bg-gray-900 p-8 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200 border border-gray-700 flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="text-5xl mb-6">{occasion.icon}</div>
                <h3 className="text-2xl font-semibold text-primary-color text-center">
                  {occasion.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:pt-24 px-4 pb-10 sm:px-6 lg:px-8 pt-20">
      <Form
        id="food-listing-form"
        onSubmit={handleSubmit}
        method="post"
        className="max-w-lg mx-auto p-6 bg-gray-900 shadow-md rounded-lg text-black"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-light-bold text-primary-color">
            Donate Food - {selectedOccasion.title}
          </h2>
          <button
            onClick={() => setShowOccasionCards(true)}
            className="text-primary-color hover:text-secondary-color"
          >
            Change Occasion
          </button>
        </div>
        
        {/* Rest of your existing form fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-100 mb-2">
            Donor Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="food-name" className="block text-gray-100 mb-2">
            Food Item Name:
          </label>
          <input
            type="text"
            id="food-name"
            name="food-name"
            value={foodName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-100 mb-2">
            Quantity (servings):
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* ... Rest of your form fields ... */}
        <div className="mb-4">
          <label htmlFor="expiration-date" className="block text-gray-100 mb-2">
            Expiration Date:
          </label>
          <input
            type="date"
            id="expiration-date"
            name="expiration-date"
            value={expirationDate}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image-upload" className="block text-gray-100 mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-300"
          />
        </div>
        <div className="w-full mb-5">
          <label className="block text-gray-100 mb-2">Fetch Location:</label>
          <div className="flex flex-col md:flex-row gap-3 items-center border border-gray-300 rounded-md p-2">
            <input
              type="text"
              id="latitude"
              name="latitude"
              placeholder="Latitude"
              value={location.latitude}
              readOnly
              required
              className="flex-grow px-3 py-2 border-0 outline-none rounded-md text-gray-700 mb-2 md:mb-0"
              onClick={getUserLocation}
            />
            <input
              type="text"
              id="longitude"
              name="longitude"
              placeholder="Longitude"
              value={location.longitude}
              readOnly
              required
              className="flex-grow px-3 py-2 border-0 outline-none rounded-md text-gray-700 mb-2 md:mb-0"
              onClick={getUserLocation}
            />
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-primary-color cursor-pointer center mb-1 md:mr-2"
              onClick={getUserLocation}
            />
          </div>
          {locationError && (
            <p className="text-red-500 mt-2">{locationError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-100 mb-2">
            Mobile Number:
          </label>
          <input
            type="number"
            id="number"
            name="number"
            pattern="[789][0-9]{9}"
            value={number}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 mb-2">Delivery Option:</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="pickup"
              name="delivery"
              value="pickup"
              checked={delivery === "pickup"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="pickup" className="text-gray-100">
              Pickup Only
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="delivery"
              name="delivery"
              value="delivery"
              checked={delivery === "delivery"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="delivery" className="text-gray-100">
              Self Delivery
            </label>
          </div>
        </div>
        <div className="mt-6">
          {isPending ? (
            <ButtonLoader content="submitting" />
          ) : (
            <Button
              type="submit"
              className="w-full bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded"
              disabled={isPending}
            >
              Submit
            </Button>
          )}
        </div>
        <div className="mt-6">
          {isError && (
            <ErrorPage
              title={error.title}
              message={error.message || "Failed to register, please try again."}
            />
          )}
        </div>
      </Form>
    </div>
  );
};

export default DonationForm;