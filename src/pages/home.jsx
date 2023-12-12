import React, { useState } from "react";
import "../styles/styles.css";
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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export function Home() {
  const [step, setStep] = useState(1);
  const num = contactData;
  console.log(num);
  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < contactData.length) setStep(step + 1);
    console.log(step);
  }
  const [showMoreText, setShowMoreText] = useState(false);

  const toggleText = () => {
    setShowMoreText(!showMoreText);
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16 ">
        <div>
          <img
            src="https://wallpapers.com/images/hd/white-and-purple-m16ylro3bkdt9w0n.jpg"
            className="absolute top-0 h-full w-full"
            alt="Cover Image"
          />
        </div>

        <div className="max-w-8xl container relative mx-auto ">
          <div className="flex flex-wrap items-center">
            <div className="mr-auto w-3/4 px-4 text-left">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-black text-[#B089BE]"
              >
                Your Digital Co-Parent in Child Upbringing
              </Typography>
            </div>
            <div className="mr-auto w-1/2 px-4 text-left">
              <Typography
                variant="lead"
                className="text-justify text-black opacity-60"
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
      <section className="-mt-32 mb-10 bg-gray-50 px-4 pb-20 pt-4">
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
                  <div style={{ color: "black" }}>{description}</div> // Apply style to change text color
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
              className="mb-6 text-left text-justify font-normal text-black"
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

            <Button
              style={{
                backgroundColor: "#b089bf",
                color: "#ffffff",
                padding: "18px 27px",
                fontSize: "12px",
              }}
              onClick={toggleText}
            >
              {showMoreText ? "Show less" : "Show more"}
            </Button>
          </div>
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
            <img src="/img/canva3.3.png" />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto text-black">
          <PageTitle className="text-Custom" heading="Why Digital Co-Parent?">
<<<<<<< HEAD
            <p className="mb-8 font-normal text-black">
=======
            <p className="mb-8 font-normal text-[#808080]">
>>>>>>> admin
              Help parents to shape their child's future, instill civility, and
              foster responsibility effectively through streamlined task
              management and improved communication
            </p>
          </PageTitle>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto text-black">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {teamData.map(({ img, name }) => (
              <div
                key={name}
                className="mb-8  text-center font-normal text-black"
                style={{ border: "4px solid #B089BE", padding: "10px" }}
              >
                <img
                  src={img}
                  alt="Team Member"
                  className="team-member-img img-equal-size transition-transform duration-300 ease-in-out hover:scale-90 hover:opacity-70"
                />
                <div
                  className="mb-1 mt-7 text-center font-normal text-black"
                  style={{ fontSize: "19px" }}
                >
                  {name}
                </div>
              </div>
            ))}
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
          <div className="mx-auto mb-10 mt-10 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData
              .map(({ id, title, image, description }) => (
                <Card
                  key={id}
                  shadow={false}
                  className="bg-[#fff] text-center text-blue-gray-900 shadow-lg shadow-gray-700/20"
                >
                  <div className="mx-auto mb-6 mt-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                    <img src={image} alt="" className="rounded-full" />
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="px-8 py-4 text-justify font-normal">
                    {description}
                  </Typography>
                </Card>
              ))
              .slice(step - 1, step + 2)}
          </div>
        </div>

        <div className="mb-10 flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              className="filter-black bg-[#B089BE] text-white"
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button className=" bg-[#B089BE] text-white" onClick={handleNext}>
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevious}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                {num
                  .map((numbers) => (
                    <button
                      href="#"
                      aria-current="page"
                      className={`${
                        step === numbers.id &&
                        "bg-[#B089BE] !text-white ring-[#B089BE] hover:bg-[#B089BE] hover:shadow-light-blue-900/95"
                      } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                      {numbers.id}
                    </button>
                  ))
                  .slice(step - 1, step + 2)}

                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>

                <button
                  onClick={handleNext}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-red-50/50 absolute relative top-0 h-full w-full bg-[#e8d9ed] bg-cover bg-center px-4 py-1">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="order-1 w-full lg:flex lg:w-1/2 lg:flex-col">
              <img
                src="/img/contact.png"
                alt="Description of the image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="order-2 flex-auto items-center px-4 lg:order-2">
              <form className="mx-auto w-full rounded-lg py-10 text-center lg:max-w-3xl">
                <PageTitle heading="Contact Us">
                  Feel free to contact us.
                </PageTitle>
                <div className="mb-4 gap-64 ">
                  <Input
                    size="lg"
                    label="Full Name"
                    className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2"
                  />
                </div>
                <div className="mb-4 gap-4">
                  <Input
                    size="lg"
                    label="Email Address"
                    className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2"
                  />
                </div>
                <div className="mb-4 gap-4">
                  <Textarea
                    size="lg"
                    label="Message"
                    rows={8}
                    className="bg-white"
                  />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  style={{ background: "#B089BE" }}
                  className="rounded-lg px-4 py-3 uppercase text-white shadow-transparent hover:shadow-transparent"
                >
                  Send Message
                </Button>
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
