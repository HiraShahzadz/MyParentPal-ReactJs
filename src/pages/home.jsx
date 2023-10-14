import React, { useState } from 'react';
import '../styles/styles.css';
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
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  const [showMoreText, setShowMoreText] = useState(false);

  const toggleText = () => {
    setShowMoreText(!showMoreText);
  };

  return (
    <>
    
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16 ">
        <div className="absolute top-0 h-full w-full bg-[url('/img/cover.png')] bg-cover bg-center "></div>
        <div className="max-w-8xl container relative mx-auto ">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-black text-[#0284c7]"
              >
                Your Digital Co-Parent in Child Upbringing
              </Typography>
              <Typography variant="lead" className="text-[#0284c7]">
                Empower your parenting journey with MyParentPal - where
                technology meets the art of raising happy, responsible, and
                confident children. Together, we empower you to raise not just
                children, but the architects of their own remarkable futures.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="mb-10 -mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={
                  <div style={{ color: "#0284c7" }}>{title}</div> // Apply style to change text color
                } // Apply style to change text color
                description={
                  <div style={{ color: "#0284c7" }}>{description}</div> // Apply style to change text color
                } // Apply style to change text color
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white ",
                })}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center"> {/* Reduced top margin to mt-16 */}
          <div className="mx-auto -mt-2 w-full px-4 md:w-6/12">
            <div className="mb-0 inline-flex h-16 w-16 items-center justify-center rounded-full  p-3 text-center shadow-lg bg-[#b089bf]">
              <img
                src="/img/fam-icon.png"

                className="h-9 w-9 text-blue-gray-900"
              />
            </div>
            <br>
            </br><br>
            </br>
            <Typography
              variant="h1"

              className="mb-5 font-bold text-[#B089BE]"
            >
              Digital Co-Parent: MyParentPal
            </Typography>

            <Typography className="mb-9 text-left text-justify font-normal text-[#808080]" style={{ fontSize: '18px' }}>
      Welcome to MyParentPal, your partner in parenting. Our webapp is
      designed to simplify parenting while fostering responsibility in
      children. With MyParentPal, you can effortlessly track your
      child's progress, ensuring they grow up well-rounded and
      responsible. Assign tasks and reward your children for their
      accomplishments, instilling positive habits from a young age.
      {showMoreText && (
        <>
          MyParentPal makes it easy to set goals and tasks for your child, ensuring they learn essential life skills while having fun. With our platform, you can build a supportive and responsible family environment.
        </>
      )}
    </Typography>

    <Button
      style={{ backgroundColor: "#b089bf", color: "#ffffff", padding: "20px 30px", fontSize: "15px" }}
      onClick={toggleText}
    >
      {showMoreText ? 'Show less' : 'Show more'}
    </Button>
          </div>
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
            <img src="/img/canva3.3.png" />
          </div>
        </div>


      </section>
      <section className="pb-45 pt-20">
        <div className="container mx-auto ttext-[#808080]">
          <PageTitle className="text-Custom" heading="Why Digital Co-Parent?">
            <p style={{fontSize: '25px'}}className="mb-8 font-normal text-[#808080]">
              Help parents to shape their child's future, instill civility, and
              foster responsibility effectively through streamlined task
              management and improved communication
            </p>

          </PageTitle>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

            {teamData.map(({ img, name }) => (
              <div key={name} className="mt-7 mb-8 text-center font-normal text-[#808080]" style={{ border: '4px solid #B089BE', padding: '10px' }}>
                <img
                  src={img}
                  alt="Team Member"
                  className="team-member-img img-equal-size hover:scale-90 hover:opacity-70 transition-transform duration-300 ease-in-out"
                />
                <div className="mt-7 mb-1 text-center font-normal text-[#808080]" style={{ fontSize: '23px'}}>
                  {name}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      <section className="bg-blue-red-50/50 absolute relative top-0 h-full w-full bg-[url('/img/contactBg.png')] bg-cover bg-center px-4 py-24">
        <div className="container mx-auto">
          <PageTitle heading="Parents Reviews">
            What parents say about us?
          </PageTitle>
          <div className="mx-auto mb-48 mt-20 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, image, description }) => (
              <Card
                key={title}
                shadow={false}
                className="bg-[#fff] text-center text-blue-gray-900 shadow-lg shadow-gray-700/20"
              >
                <div className="mx-auto mb-6 mt-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                  <img src={image} alt="" className="rounded-full" />
                </div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-[#0284c7]"
                >
                  {title}
                </Typography>
                <Typography className="px-8 py-4 text-justify font-normal text-[#0284c7]">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

          <PageTitle heading="Contact Us">
            Feel free to contact us.We will get back to you soon.
          </PageTitle>
          <form className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mb-8 flex gap-8">
              <Input
                size="lg"
                label="Full Name"
                style={{ background: "white" }}
                className=" w-full rounded-lg border border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              <Input
                size="lg"
                label="Email Address"
                style={{ background: "white" }}
              />
            </div>
            <Textarea
              size="lg"
              label="Message"
              rows={8}
              style={{ background: "white" }}
            />
            <Button
              variant="gradient"
              size="lg"
              style={{ background: "#ee97c0" }}
              class="rounded-lg bg-customColor px-4 py-2 text-white"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-blue-gray-50/50" style={{ background: "#fef4e4" }}>
        <Footer />
      </div>
    </>
  );
}

export default Home;
