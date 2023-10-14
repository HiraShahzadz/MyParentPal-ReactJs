import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function PageTitle({ heading, children }) {
  return (
    <div className="mx-auto w-full p-4 text-center lg:w-6/12">
      <Typography variant="h2" className=" mb-3 text-[#B089BE]">
        {heading}
      </Typography>
      <Typography variant="lead">{children}</Typography>
    </div>
  );
}

PageTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

PageTitle.displayName = "/src/widgets/layout/page-title.jsx";

export default PageTitle;
