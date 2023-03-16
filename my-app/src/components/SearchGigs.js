import React from "react";
import { ListGroup } from "react-bootstrap";
import { db } from "../firebase";

const SearchGigs = ({ gigs }) => {
  if (gigs.length === 0) {
    return null;
  }

  return (
    <ListGroup>
      {gigs.map((gig) => (
        <ListGroup.Item key={gig.id}>{gig.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

const searchGigs = async (query) => {
  const freelancersRef = db.collection("freelancers");
  const freelancers = await freelancersRef.get();

  const results = [];

  freelancers.forEach(async (doc) => {
    const gigsRef = freelancersRef.doc(doc.id).collection("gigs");
    const snapshot = await gigsRef.where("title", "==", query).get();

    snapshot.forEach((gigDoc) => {
      const gigData = gigDoc.data();
      results.push({
        id: gigDoc.id,
        title: gigData.title,
        description: gigData.description,
        category: gigData.category,
        price: gigData.price,
        userId: doc.id,
      });
    });
  });

  return results;
};

export { searchGigs };
export default SearchGigs;
