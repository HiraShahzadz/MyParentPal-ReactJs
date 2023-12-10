import React, { Component } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons from your preferred icon library
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Progress,
    Button,
    progress,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faVenusMars, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

class ProfileSection extends Component {
    state = {
        name: "Aiman",
        dob: "30-8-2002",
        email: "abc@gmail.com",
        gender: "female",
        genderOptionsVisible: false,
        selectedGender: 'female',
        password: "aiman123",
        showPassword: false,
        editField: ""
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
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    renderField = (fieldName, label) => {
        return this.state.editField === fieldName ? (
            <div className="relative">
                <div className="flex items-center">
                    {fieldName === "password" ? (
                        <input
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state[fieldName]}
                            onChange={this.updateField(fieldName)}
                            onBlur={() => this.setState({ editField: "" })}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-400"
                        />
                    ) : (
                        <input
                            type="text"
                            value={this.state[fieldName]}
                            onChange={this.updateField(fieldName)}
                            onBlur={() => this.setState({ editField: "" })}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-400"
                        />
                    )}

                    {fieldName === "password" && (
                        <button
                            onClick={this.togglePasswordVisibility}
                            className="ml-2 focus:outline-none"
                        >
                            {this.state.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5px' }}>
                    <button
                        className="text-white bg-[#b089be] hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                        onClick={() => this.setState({ editField: "" })}
                    >
                        OK
                    </button>
                    <button
                        className="block text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-400"
                        onClick={() => this.changeEditMode(fieldName)}
                        style={{ marginLeft: '5px' }}
                    >
                        X
                    </button>
                </div>
            </div>
        ) : (
            <div onDoubleClick={() => this.changeEditMode(fieldName)}>
                {label}: {fieldName === "password" ? "*********" : this.state[fieldName]}
            </div>
        );
    };

    render() {
        return (
            <div w-full mb-1 rounded-lg text-center font-bold text-md>
                <form onSubmit={this.handleSubmit} className="flex flex-wrap">
                    <div className="w-full mb-1 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center font-bold text-lg text-black">
                        About
                    </div>
                    {/* Add icons related to each field */}
                    <div className="w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center text-sm hover:bg-gray-200 flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-7" />
                        {this.renderField("name", "Name")}
                    </div>

                    <div className="w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center text-sm hover:bg-gray-200 flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-7" />
                        {this.renderField("dob", "Date of Birth")}
                    </div>

                    <div className="w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center text-sm hover:bg-gray-200 flex items-center">
                        <FontAwesomeIcon icon={faVenusMars} className="mr-7" />
                        {this.renderField("gender", "Gender")}
                    </div>

                    <div className="w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center text-sm hover:bg-gray-200 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-7" />
                        {this.renderField("email", "Email")}
                    </div>

                    <div className="w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-center text-sm hover:bg-gray-200 flex items-center">
                        <FontAwesomeIcon icon={faLock} className="mr-7" />
                        {this.renderField("password", "Password")}

                    </div>
                </form>
                <button className="mt-10 font-bold text-white w-full mb-2 pl-3 pr-10 pt-4 pb-4 rounded-lg text-sm bg-[#b089be] hover:bg-purple-400 text-center">
                    Sign out
                </button>

            </div>
        );
    }
}

export default ProfileSection;
