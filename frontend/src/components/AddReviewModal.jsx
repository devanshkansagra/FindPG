import React from 'react';
import { X } from 'lucide-react';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';
import Cookie from '../helpers/Cookie';
export default function AddReviewModal({ showModal, setShowModal }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const params = useParams();
  const accessToken = Cookie.get('accessToken');
  async function addReview() {
    const { id } = params;
    const response = await fetch(
      import.meta.env.VITE_SERVER_ORIGIN + `/api/property/${id}/reviews`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: id,
          ratings: rating,
          description: comment,
        }),
      }
    );

    setShowModal(false);
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg animate-fadeIn relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Your Review</h3>
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={22}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-red-500"
          placeholder="Share your experience..."
        ></textarea>
        <button
          onClick={addReview}
          className="w-full mt-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
