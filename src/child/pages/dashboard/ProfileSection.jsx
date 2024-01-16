import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faVenusMars, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
class ProfileSection extends Component {
  state = {
    name: "Aiman Abid",
    dob: new Date("2015-12-20"),
    gender: "Female",
    genderOptionsVisible: false,
    selectedGender: "",
    password: "Aiman123@",
    showPassword: false,
    editField: "",
  };

  changeEditMode = (field) => {
    this.setState({ editField: field });
  };

  updateField = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ dob: date, editField: "" });
  };

  

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic here for handling form submission
    console.log("Form Submitted:", this.state);
    toast.success("Request for profile changes sent");
  };
    
  renderField = (fieldName, label) => {
    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ];
    return this.state.editField === fieldName ? (
      <div className="relative">
        <div className="flex items-center">
          {fieldName === "password" ? (
            <div className="relative rounded-md bg-white font-medium shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
              <input
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.updateField("password")}
                onBlur={() => this.setState({ editField: "" })}
                placeholder={
                  this.state.editField === "password"
                    ? "Enter your password"
                    : ""
                }
                className="pl-1 pr-8 py-1.5 text-sm font-light text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                style={{ paddingRight: "2.5rem" }}
              />
              <button
                onClick={this.togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pb-2 pr-2 focus:outline-none"
                style={{ zIndex: 1, marginTop: "auto", marginBottom: "auto", marginRight: "0.5rem" }}
              >
                {this.state.showPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          ) : (
            <div className="relative rounded-md bg-white font-medium shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
              {fieldName === "dob" ? (
                <DatePicker
                  selected={this.state.dob}
                  onChange={this.handleDateChange}
                  className="pl-1 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                />
              ) : fieldName === "gender" ? (
                <div className="relative rounded-md bg-white font-medium shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                  <select
                    value={this.state.selectedGender}
                    onChange={(e) => this.setState({ selectedGender: e.target.value, editField: "" })}
                    className="pl-1 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ): (
                <input
                  type="text"
                  value={this.state[fieldName]}
                  onChange={this.updateField(fieldName)}
                  onBlur={() => this.setState({ editField: "" })}
                  placeholder={
                    fieldName === "name" && !this.state[fieldName]
                      ? "Name"
                      : fieldName === "dob" && !this.state[fieldName]
                      ? "Date of Birth"
                      : fieldName === "gender" && !this.state[fieldName]
                      ? "Gender"
                      : fieldName === "password" && !this.state[fieldName]
                      ? "Enter your password"
                      : ""
                  }
                  className="pl-1 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                />
              )}
            </div>
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
            onClick={() => {
              this.setState((prevState) => ({
                [fieldName]: prevState.selectedGender,
                editField: "",
              }));
            }}
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
      <div onDoubleClick={() => this.changeEditMode(fieldName)}>
        {fieldName === "password"
          ? this.state[fieldName]
            ? "*".repeat(this.state[fieldName].length)
            : "Your password"
          : fieldName === "dob"
          ? this.state[fieldName].toLocaleDateString()
          : this.state[fieldName] ||
            (fieldName === "name"
              ? "Your name"
              : fieldName === "dob"
              ? "Your date of birth"
              : fieldName === "gender"
              ? "Your gender"
              : "")}
      </div>
    );
  };

  render() {
    return (
      <div className="text-md mb-1 w-full rounded-lg text-center font-bold">
        <DndProvider backend={HTML5Backend}>
            <Toaster />
          </DndProvider>
        <form onSubmit={this.handleSubmit} className="flex flex-wrap">
          <div className="mb-1 w-full rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-lg font-bold text-black">
            About
          </div>
          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faUser} className="mr-7" />
            {this.renderField("name", "Name")}
          </div>
          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-7" />
            {this.renderField("dob", "Date of Birth")}
          </div>
          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faVenusMars} className="mr-6" />
            {this.renderField("gender", "Gender")}
          </div>
          
          <div className="mb-2 flex w-full items-center rounded-lg pb-4 pl-3 pr-10 pt-4 text-center text-sm font-medium leading-6 text-gray-900 hover:bg-gray-200">
            <FontAwesomeIcon icon={faLock} className="mr-7" />
            {this.renderField("password", "Password")}
          </div>
          
        </form>
       <div className=" mt-5 flex items-center justify-center">
            <Button
              type="submit"
              className="mr-2 rounded-md bg-MyPurple-400 px-5 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </Button>
            <Button className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white">
              Cancel
            </Button>
          </div>
      </div>
    );
  }
}

export default ProfileSection;
