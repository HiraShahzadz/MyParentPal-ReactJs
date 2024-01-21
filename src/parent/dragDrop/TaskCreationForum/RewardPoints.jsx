import React from "react";

const RewardPoints = (props) => {
  return (
    <div className="mt-5 space-y-10 border-b border-gray-900/10 pb-6">
      <fieldset>
        <legend className="flex text-sm font-semibold leading-6 text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#B089BE"
            className=" mr-2 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          Reward
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Associate either reward to a task.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Reward
            </label>
            <div className="mt-2">
              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="text"
                  value={props.rewardname}
                  onChange={(event) => {
                    props.setRewardname(event.target.value);
                  }}
                  name="rewardname"
                  id="rewardname"
                  autoComplete="rewardname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                  placeholder="Reward"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default RewardPoints;
