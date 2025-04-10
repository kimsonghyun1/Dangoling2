import React, { useState, useEffect } from "react";

export default function App() {
  const [storeName, setStoreName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [subscribedStores, setSubscribedStores] = useState([]);
  const [user, setUser] = useState(null);
  const [storeProfile, setStoreProfile] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [notification, setNotification] = useState("");

  const handleReviewSubmit = () => {
    if (storeName && review) {
      setReviews([{ storeName, review }, ...reviews]);
      setNotification("리뷰가 등록되었습니다!");
      setStoreName("");
      setReview("");
    }
  };

  const handleSubscribe = (name) => {
    if (!subscribedStores.includes(name)) {
      setSubscribedStores([...subscribedStores, name]);
      setNotification(`${name} 가게 멤버십을 구독했습니다!`);
    }
  };

  const handleLogin = () => {
    setUser("guest_user");
    setIsOwner(false);
  };

  const handleOwnerLogin = () => {
    setUser("store_owner");
    setIsOwner(true);
  };

  const handleProfileUpdate = () => {
    if (storeName) {
      setStoreProfile({
        ...storeProfile,
        [storeName]: storeProfile[storeName] || "이 가게는 아늑하고 친절한 분위기를 자랑합니다.",
      });
      setNotification("가게 소개가 저장되었습니다!");
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">단골링</h1>
      {notification && (
        <div className="bg-green-100 text-green-700 p-2 rounded-xl text-center">
          {notification}
        </div>
      )}
      {!user ? (
        <div className="space-y-2">
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">사용자 로그인</button>
          <button onClick={handleOwnerLogin} className="border px-4 py-2 rounded">사장님 로그인</button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <input placeholder="가게 이름" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="border p-2 w-full rounded" />
            <textarea placeholder="리뷰" value={review} onChange={(e) => setReview(e.target.value)} className="border p-2 w-full rounded" />
            <button onClick={handleReviewSubmit} className="bg-green-500 text-white px-4 py-2 rounded">리뷰 등록</button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-4">사용자 리뷰</h2>
            {reviews.map((r, i) => (
              <div key={i} className="border p-2 rounded my-2">
                <strong>{r.storeName}</strong>
                <p>{r.review}</p>
                <p className="text-sm text-gray-500">{storeProfile[r.storeName]}</p>
                <button onClick={() => handleSubscribe(r.storeName)} className="text-sm text-blue-600 mt-1">
                  {subscribedStores.includes(r.storeName) ? "구독 중" : "구독하기"}
                </button>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-4">내 멤버십</h2>
            {subscribedStores.map((s, i) => (
              <div key={i} className="p-2 bg-blue-50 rounded my-1">{s}</div>
            ))}
          </div>
          {isOwner && (
            <div className="mt-4 space-y-2">
              <textarea placeholder="가게 소개" value={storeProfile[storeName] || ""} onChange={(e) => setStoreProfile({ ...storeProfile, [storeName]: e.target.value })} className="border p-2 w-full rounded" />
              <button onClick={handleProfileUpdate} className="bg-yellow-400 px-4 py-2 rounded">가게 정보 저장</button>
            </div>
          )}
        </>
      )}
    </div>
  );
        }
