import { useState } from 'react';

const ReviewForm = () => {
  const [review, setReview] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Логика отзыва
//     alert(`Отзыв "${review}" отправлен!`);
//   };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Оставить отзыв</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="textarea textarea-bordered w-full mb-2"
        placeholder="Ваш отзыв..."
      />
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
        Отправить
      </button>
    </div>
  );
};

export default ReviewForm;