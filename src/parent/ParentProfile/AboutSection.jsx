import React, { Component } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faVenusMars,
  faEnvelope,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";

class AboutSection extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    CNIC: "",
  };

  changeEditMode = (field) => {
    this.setState({ editField: field });
  };

  updateField = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic here for handling form submission
    console.log("Form Submitted:", this.state);
    toast.success("Information saved");
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderField = (fieldName) => {
    return this.state.editField === fieldName ? (
      <div className="relative">
        <div className="flex items-center">
          {fieldName === "password" ? (
            <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
              <input
                type={this.state.showPassword ? "text" : "password"}
                value={this.state[fieldName]}
                onChange={this.updateField(fieldName)}
                onBlur={() => this.setState({ editField: "" })}
                placeholder={
                  fieldName === "firstName" && !this.state[fieldName]
                    ? "Your first name"
                    : "Task name"
                }
                name={fieldName}
                id={fieldName}
                autoComplete={fieldName}
                className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-sm font-light text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <div className="flex rounded-md bg-white font-medium shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
              <input
                type="text"
                value={this.state[fieldName]}
                onChange={this.updateField(fieldName)}
                onBlur={() => this.setState({ editField: "" })}
                placeholder={
                  fieldName === "firstName" && !this.state[fieldName]
                    ? "Your first name"
                    : fieldName === "lastName" && !this.state[fieldName]
                    ? "Your last name"
                    : fieldName === "phoneNumber" && !this.state[fieldName]
                    ? "Your phone number"
                    : fieldName === "CNIC" && !this.state[fieldName]
                    ? "Your CNIC number"
                    : "Task name"
                }
                name={fieldName}
                id={fieldName}
                autoComplete={fieldName}
                className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          )}

          {fieldName === "password" && (
            <button
              onClick={this.togglePasswordVisibility}
              className="ml-2 focus:outline-none"
            >
              {this.state.showPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <button
            className="mb-2 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 sm:mx-2 sm:mb-0"
            onClick={() => this.setState({ editField: "" })}
          >
            OK
          </button>
          <button
            className="mb-2 rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 sm:mx-2 sm:mb-0"
            onClick={() => this.changeEditMode(fieldName)}
            style={{ marginLeft: "5px" }}
          >
            X
          </button>
        </div>
      </div>
    ) : (
      <div
        onDoubleClick={() => this.changeEditMode(fieldName)}
        className="text-left"
      >
        {this.state[fieldName] ||
          (fieldName === "firstName"
            ? "Your first name"
            : fieldName === "lastName"
            ? "Your last name"
            : fieldName === "phoneNumber"
            ? "Your phone number"
            : fieldName === "CNIC"
            ? "Your CNIC number"
            : "")}
      </div>
    );
  };

  render() {
    return (
      <div className="text-md mb-1 w-full rounded-lg text-center font-bold">
        <form onSubmit={this.handleSubmit} className="">
          <DndProvider backend={HTML5Backend}>
            <Toaster />
          </DndProvider>
          <div className="mb-1 w-full rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-lg font-bold text-black">
            About
          </div>
          {/* Add icons related to each field */}
          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faUser} className="mr-7" />
            {this.renderField("firstName", "")}
          </div>

          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faUser} className="mr-7" />
            {this.renderField("lastName", "")}
          </div>

          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faPhone} className="mr-6" />
            {this.renderField("phoneNumber", "")}
          </div>

          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <img className="mr-6 h-4 w-4" src="/img/id-card.png" alt="" />
            {this.renderField("CNIC", "")}
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="mr-2 mt-2 rounded-md bg-MyPurple-400 px-5 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </Button>
            <Button className="mt-2 rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AboutSection;
