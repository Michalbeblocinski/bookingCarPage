import React, { useEffect, useState } from "react";
import "./popular.css";
import ReadPopularFeature from "../../components/readpopularfeature/readpopularfeature";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

function Popular() {
  const [firstThree, setFirstThree] = useState();
  const fetchPost = async () => {
    await getDocs(collection(db, "vehicles")).then((QuerySnapshot) => {
      const newData = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(0),
        id: doc.id,
      }));
      const newdata3 = [...newData.slice(0, 3)];
      setFirstThree(newdata3);    
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="cr_popular section__margin" id="popular">
      <div className="cr_popular-title">
        <h1>Recent vehicle rental deals</h1>
      </div>
      <div className="cr_popular-text">
        <p>
          There are many variations of passsages of Lorem Ipsum available but
          the majority have{" "}
        </p>
        <p className="p2">
          suffered alteration in some form by injected humour
        </p>
      </div>
      <div className="cr_popular-feature">
        {firstThree &&
          firstThree.length > 0 &&
          firstThree.map((data) => (
            <ReadPopularFeature data={data} key={data.id} />
          ))}
      </div>
    </div>
  );
}

export default Popular;
