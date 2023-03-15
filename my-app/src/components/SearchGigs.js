const SearchGigs = async (query) => {
  const snapshot = await firestore
    .collection("freelancers")
    .where("gigs", ">=", query)
    .where("gigs", "<=", query + "\uf8ff")
    .get();

  const gigs = [];
  snapshot.forEach((doc) => {
    const freelancer = doc.data();
    freelancer.gigs.forEach((gig) => {
      if (gig.toLowerCase().includes(query.toLowerCase())) {
        gigs.push({
          id: doc.id,
          title: gig,
          description: freelancer.description,
          image: freelancer.image,
        });
      }
    });
  });

  return gigs;
};

export default SearchGigs;
