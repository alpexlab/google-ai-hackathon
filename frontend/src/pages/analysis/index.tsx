const Analysis = () => {
    return (
        <div className="flex-1 p-8">
        {/* Breadcrumb and Edit Profile Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            <a href="#" className="text-blue-500">Patients list</a> &gt; Emily Johnson
          </div>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
            Edit Profile
          </button>
        </div>

        {/* Profile Details and Upload Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Patient Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Emily Johnson"
                className="rounded-full h-24 w-24"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Emily Johnson</h3>
                <p className="text-gray-500">Patient</p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-500 text-white p-3 rounded-full">
                H
              </button>
            </div>
          </div>

          {/* Tabs and Upload Section */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Lungs</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Breast</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Brain</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Genomic</button>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-400 mb-2">Upload Document/Image</p>
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 008 0M7 15V3m10 0v12m0 0a4 4 0 01-8 0"
                />
              </svg>
            </div>

            {/* Analyze Button */}
            <div className="mt-4 text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Analysis;