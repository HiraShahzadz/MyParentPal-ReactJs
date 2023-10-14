import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pb-6 pt-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4 text-white">
              {title}
            </Typography>
            <Typography className="font-normal text-white">
              {description}
            </Typography>
            <div className="mx-auto mb-8 mt-6 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  className="mb-2 block font-medium uppercase text-white"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-white hover:text-blue-gray-200"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography variant="small" className="font-normal text-white">
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "MyParentPal",
  description: "Your Digital Co-Parent in Child Upbringing",
  socials: [
    {
      color: "blue",
      name: "facebook",
      path: "https://www.facebook.com/profile.php?id=100013450172275",
    },
    {
      color: "light-blue",
      name: "twitter",
      path: "https://www.twitter.com/creativetim",
    },
    {
      color: "purple",
      name: "instagram",
      path: "https://www.instagram.com/hs_art_ppt/",
    },
    {
      color: "pink",
      name: "dribbble",
      path: "https://www.dribbble.com/creativetim",
    },
    {
      color: "red",
      name: "youtube",
      path: "https://www.youtube.com/channel/UCXIJHjXvVrBgtIdTU89Zmeg",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/HiraShahzadz",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "Features", path: "https://www.creative-tim.com/presentation" },
        { name: "About Us", path: "https://www.creative-tim.com/blog" },
        {
          name: "Reviews",
          path: "https://www.github.com/creativetimofficial/material-tailwind?ref=mtk",
        },
        {
          name: "Contact Us",
          path: "https://www.creative-tim.com/templates/free?ref=mtk",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "GitHub",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
        },
        {
          name: "LinkedIn",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} MyParentPal by{" "}
      <a
        href="https://www.creative-tim.com?ref=mtk"
        target="_blank"
        className="text-white transition-colors hover:text-blue-gray-200"
      >
        HAN
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
