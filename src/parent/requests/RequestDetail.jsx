import React from "react";
import { GiftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";

function RequestDetails({ onClose, childProfileData, selectedNotification }) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-20">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
      <div className="rounded-lg bg-white p-3 shadow-lg md:w-9/12 lg:w-8/12">
        <div className="pt-22 relative flex items-center justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => onClose(false)}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div className="relative flex max-h-[45vh] flex-col overflow-hidden overflow-y-auto rounded-xl bg-white bg-clip-border text-gray-700 lg:max-h-[60vh] xl:col-span-2">
            <form className="m-2">
              <div className="pb-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="flex text-lg font-medium leading-6 text-gray-900"
                    >
                      <GiftIcon className="mr-2 h-5 w-5 rounded-sm text-MyPurple-400" />
                      Reward Request
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Task Name
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.taskname}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.taskdescription}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Desired Reward
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.desiredreward}
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="m-2 flex w-auto flex-col rounded-md border border-gray-400 bg-white bg-clip-border p-2 text-gray-700">
            <div className="-m-2 rounded-t-sm bg-MyPurple-400 p-2">
              <label
                htmlFor="photo"
                className="block text-base font-medium leading-6 text-white"
              >
                Details
              </label>
            </div>
            <div className="mt-6 flex">
              <div className="mr-4 mt-2">
                <div className="mb-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Requested by
                  </label>
                </div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Request at
                </label>
              </div>
              <div className="flex flex-col">
                <div className="mb-8 inline-flex w-auto gap-x-1.5 rounded-md bg-white p-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {childProfileData.map(
                    (child) =>
                      child.id === selectedNotification.childId && (
                        <>
                          <img
                            className="h-6 w-6 rounded-full object-cover"
                            src={
                              child.img
                                ? `data:image/jpeg;base64,${child.img}`
                                : "/img/user.png"
                            }
                            alt=""
                          />
                          <span className="mt-1 font-normal text-black">
                            {child.name}
                          </span>
                        </>
                      )
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-sm font-normal text-black">
                    {selectedNotification.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center ">
          <button
            type="submit"
            onClick={handleClose}
            className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
