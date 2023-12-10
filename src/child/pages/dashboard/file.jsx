import React, { useState } from 'react';

const File = () => {
    const [showFileTypes, setShowFileTypes] = useState(false);

    const handleRadioChange = (e) => {
        setShowFileTypes(e.target.value === 'yes');
    };

    return (
        <div className="mt-4">
            <form>
                <div className="w-full sm:w-1/2 mb-6 pl-5 pr-8">
                    <label htmlFor="poll" className="flex justify-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Submission Required:
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="yes"
                                name="poll"
                                value="yes"
                                className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="yes" className="mt-2 text-gray-900 dark:text-white">Yes</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="no"
                                name="poll"
                                value="no"
                                className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="no" className="mt-2 text-gray-900 dark:text-white">No</label>
                        </div>
                    </div>

                    {showFileTypes && (
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select file types:
                            </label>
                            <div className="flex flex-col space-y-2">
                                <input type="checkbox" id="file" name="file" value="file" />
                                <label htmlFor="file" className="text-gray-900 dark:text-white">File</label>

                                <input type="checkbox" id="png" name="png" value="png" />
                                <label htmlFor="png" className="text-gray-900 dark:text-white">PNG</label>

                                <input type="checkbox" id="audio" name="audio" value="audio" />
                                <label htmlFor="audio" className="text-gray-900 dark:text-white">Audio</label>

                                <input type="checkbox" id="video" name="video" value="video" />
                                <label htmlFor="video" className="text-gray-900 dark:text-white">Video</label>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default File;
