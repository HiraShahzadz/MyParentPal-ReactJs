import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";

import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";

export function Home() {
  const location = useLocation();
  const hash = location.hash;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [feedbackCount, setFeedbackCount] = useState(0);
  async function save(event) {
    event.preventDefault();

    if (!name || !email || !query) {
      return toast.error("Please fill in all fields");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmail("");
      return toast.error("Please enter a valid email address");
    }

    try {
      await axios.post("http://localhost:8081/api/v1/user/save-query", {
        name: name,
        email: email,
        query: query,
      });

      console.log("After Axios Request - Success");

      toast.success("Query sent successfully!");

      setName("");
      setEmail("");
      setQuery("");
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }
    }
  }

  // Scroll to the section based on the hash
  React.useEffect(() => {
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  const [step, setStep] = useState(0);
  const num = contactData;
  console.log(num);
  function handlePrevious() {
    if (step > 0) setStep(step - 1);
  }

  function handleNext() {
    if (step < feedbackCount - 3) setStep(step + 1);
  }
  const [showMoreText, setShowMoreText] = useState(false);

  const toggleText = () => {
    setShowMoreText(!showMoreText);
  };
  const handleSubmit = (event) => {
    toast.success("Submitted");
  };
  useEffect(() => {
    (async () => await Load())();
  }, []);
  const [parentFeedback, setParentFeedback] = useState([]);
  async function Load() {
    const result = await axios.get(
      "http://localhost:8081/api/v1/feedback/getall"
    );
    setParentFeedback(result.data);
    setFeedbackCount(result.data.length);
    console.log(result.data);
  }
  const [parentProfile, setParentProfile] = useState([]);
  useEffect(() => {
    loadParents();
  }, []);

  async function loadParents() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-all"
      );
      setParentProfile(result.data);
      console.log("Parents Profile:", result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  const profile = parentProfile.find((profile) => profile.img);

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16 ">
        <DndProvider backend={HTML5Backend}>
          <Toaster />
        </DndProvider>
        <div>
          <img
            src="https://wallpapers.com/images/hd/white-and-purple-m16ylro3bkdt9w0n.jpg"
            className="absolute top-0 h-full w-full"
            alt="Cover Image"
          />
        </div>
        <div className="max-w-8xl container relative mx-auto">
          <div className="md:mx-auto">
            <div className="w-full px-4 text-left md:w-3/4 lg:w-3/5">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-black text-[#B089BE]"
              >
                Your Digital Co-Parent in Child Upbringing
              </Typography>
            </div>
            <div className="lg:w-2.5/5 w-full px-4 text-left md:w-1/2">
              <Typography
                variant="lead"
                className="text-justify font-normal text-black"
              >
                Empower your parenting journey with MyParentPal - where
                technology meets the art of raising happy, responsible, and
                confident children. Together, we empower you to raise not just
                children, but the architects of their own remarkable futures.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Link to="/home#features" className="text-white"></Link>
      <section
        id="features"
        className="-mt-32 mb-10 bg-gray-50 px-4 pb-20 pt-4"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={
                  <div style={{ color: "#B089BE" }}>{title}</div> // Apply style to change text color
                } // Apply style to change text color
                description={
                  <div style={{ color: "black", fontWeight: "400" }}>
                    {description}
                  </div>
                } // Apply style to change text color
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white ",
                })}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center">
          {" "}
          {/* Reduced top margin to mt-16 */}
          <div className="mx-auto -mt-2 w-full px-4 md:w-6/12">
            <div className="mb-0 inline-flex h-16 w-16 items-center justify-center rounded-full  bg-[#b089bf] p-3 text-center shadow-lg">
              <img
                src="/img/famicon.png"
                className="h-9 w-9 text-blue-gray-900"
              />
            </div>
            <br></br>
            <br></br>
            <Typography variant="h2" className="mb-5 font-bold text-[#B089BE]">
              Digital Co-Parent: MyParentPal
            </Typography>

            <Typography
              className="mb-6 text-justify font-normal text-black"
              style={{ fontSize: "18px" }}
            >
              Welcome to MyParentPal, your partner in parenting. Our webapp is
              designed to simplify parenting while fostering responsibility in
              children. With MyParentPal, you can effortlessly track your
              child's progress, ensuring they grow up well-rounded and
              responsible. Assign tasks and reward your children for their
              accomplishments, instilling positive habits from a young age.
              {showMoreText && (
                <>
                  MyParentPal makes it easy to set goals and tasks for your
                  child, ensuring they learn essential life skills while having
                  fun. With our platform, you can build a supportive and
                  responsible family environment.
                </>
              )}
            </Typography>
            <button
              onClick={toggleText}
              className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
            >
              {showMoreText ? "Show less" : "Show more"}
            </button>
          </div>
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
            <img src="/img/canva3.3.png" />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto text-black">
          <PageTitle heading="Parents Reviews">
            What parents say about us?
          </PageTitle>
        </div>
      </section>
      <section className="bg-blue-red-50/50 relative top-0 h-full w-full bg-cover bg-center px-4 py-1">
        <div className="container mx-auto">
          {parentFeedback.length === 0 ? (
            <div className="mx-auto w-full text-center lg:w-6/12">
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center font-normal"
              >
                No feedback is given. Please Use the website and give your
                remarks
              </Typography>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-10 mt-10 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                {parentFeedback
                  .filter((feedback) =>
                    parentProfile.some(
                      (profile) =>
                        profile.id === feedback.parentId &&
                        profile.role === "parent"
                    )
                  )
                  .slice(step, step + 3)
                  .map(({ id, name, description }) => (
                    <Card
                      key={id}
                      shadow={false}
                      className="w-72 bg-[#fff] text-center text-blue-gray-900 shadow-lg shadow-gray-700/20"
                    >
                      <div className="mx-auto mb-4 mt-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                        {/* Assuming profile is found based on feedback's parentId */}
                        <img
                          src={
                            profile.img
                              ? `data:image/jpeg;base64,${profile.img}`
                              : "/img/user.png"
                          }
                          className="h-14 w-14  rounded-full object-cover"
                        />
                      </div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2 "
                      >
                        {name}
                      </Typography>
                      <Typography className="mb-3 max-h-16 overflow-y-auto p-4 px-8 py-4 pt-[-20px] text-justify font-normal">
                        {description}
                      </Typography>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </div>

        <div className="mb-10 ml-5 mr-5 flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between lg:hidden">
            <Button
              className=" flex rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
              onClick={handlePrevious}
              disabled={step === 0} // Disable button if on first feedback
            >
              <ChevronLeftIcon className=" h-5 w-5" />
              Previous
            </Button>
            <Button
              className=" flex rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
              onClick={handleNext}
              disabled={step === parentFeedback.length - 3} // Disable button if on last set of feedbacks
            >
              Next
              <ChevronRightIcon className=" h-5 w-5" />
            </Button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <Button
              className="mr-10 flex rounded-md border bg-MyPurple-400 px-2 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:border-MyPurple-400  hover:bg-white hover:text-MyPurple-400 hover:shadow-transparent"
              onClick={handlePrevious}
              disabled={step === 0} // Disable button if on first feedback
            >
              <ChevronLeftIcon className=" h-5 w-5" />
            </Button>
            <Button
              className="ml-10 flex rounded-md border bg-MyPurple-400 px-2 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:border-MyPurple-400  hover:bg-white hover:text-MyPurple-400 hover:shadow-transparent"
              onClick={handleNext}
              disabled={step === parentFeedback.length - 3} // Disable button if on last set of feedbacks
            >
              <ChevronRightIcon className=" h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-blue-red-50/50 relative top-0 h-full w-full bg-[#e8d9ed] bg-cover bg-center px-4 py-1">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="order-1 w-full lg:flex lg:w-1/2 lg:flex-col">
              <img
                src="/img/contact.png"
                alt="Description of the image"
                className="h-full w-full object-cover"
              />
            </div>
            <Link to="/home#contact" className="text-white"></Link>
            <div
              id="contact"
              className="order-2 flex-auto items-center px-4 lg:order-2"
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full rounded-lg py-10 text-center lg:max-w-3xl"
              >
                <PageTitle heading="Contact Us">
                  Feel free to contact us.
                </PageTitle>
                <div className="mb-4 gap-64 ">
                  <input
                    size="lg"
                    type="text"
                    id="name"
                    value={name}
                    placeholder="Full Name"
                    pattern="[A-Za-z ]+"
                    title="Please enter only letters"
                    className="block w-full rounded-lg border border-gray-400  bg-white p-2.5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-MyPurple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-MyPurple-400 dark:focus:ring-MyPurple-400"
                    required
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-4 gap-4">
                  <input
                    size="lg"
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email Address"
                    className="block w-full rounded-lg border border-gray-400  bg-white p-2.5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-MyPurple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-MyPurple-400 dark:focus:ring-MyPurple-400"
                    required
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-4 gap-4">
                  <textarea
                    size="lg"
                    id="query"
                    value={query}
                    rows={8}
                    placeholder="Enter your query"
                    className="block w-full rounded-lg border border-gray-400  bg-white p-2.5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-MyPurple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-MyPurple-400 dark:focus:ring-MyPurple-400"
                    required
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  onClick={save}
                  className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-black opacity-90">
        <Footer />
      </div>
    </>
  );
}

export default Home;
