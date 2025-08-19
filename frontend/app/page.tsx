'use client'
import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';

export default function Home() {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  // TODO: use API to upload images
  const onSendImages = () => 
  {
    // Here you can handle the submission of images
    console.log("Sending images:", images);
    // You can send the images to your server or perform any other action
  }

  // TODO: implement search functionality via API call
  const onClickSearch = () => {
    // Here you can handle the search functionality
    console.log("Searching for images with query:", query);
    // You can filter or search images based on the query
  }

  return (
    <div className="font-sans min-h-screen p-4 sm:p-8">
<main className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto">
  {/* LEFT SIDE */}
  <div className='flex flex-col gap-8 flex-1 min-w-0'>
    {/* Search Bar */}
    <div className='flex flex-row gap-2'>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search images with ..."
        className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
      <button onClick={onClickSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap">
        Search
      </button>
    </div>

    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        <div className="upload__image-wrapper p-6 bg-gray-700 rounded-lg">
          {/* Upload Button */}
          <div className="flex flex-col gap-3 mb-6 items-center justify-center">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="border-2 border-dashed border-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full min-h-52"
            >
              Click or Drop here
            </button>
          </div>

          {/* Image List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageList.map((image, index) => (
              <div key={index} className="image-item bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="mb-3">
                  <img 
                    src={image.dataURL} 
                    alt={`Uploaded image ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="image-item__btn-wrapper flex gap-2 justify-center">
                  <button 
                    className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm" 
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm" 
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Remove All Images Button */}
          {imageList.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                onClick={() => {
                  onSendImages();
                }}
              >
                Upload All
              </button>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200" 
                onClick={() => setShowConfirmDialog(true)}
              >
                Remove All Images
              </button>
            </div>
          )}

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Confirm Action
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove all images? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => setShowConfirmDialog(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      onImageRemoveAll();
                      setShowConfirmDialog(false);
                    }}
                  >
                    Remove All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  </div>
  
  {/* RIGHT SIDE */}
  <div className='flex flex-col items-center justify-start flex-1 min-w-0'>
    <div className="w-full bg-gray-100 rounded-lg p-6 min-h-96">
      <p className="text-gray-500 text-lg font-medium text-center mb-4">
        Output
      </p>
      <div className="text-gray-400 text-center">
        Results will appear here...
      </div>
    </div>
  </div>
</main>
    </div>
  );
}
