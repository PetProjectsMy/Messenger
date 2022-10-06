const zip = (...arrays) =>
  Array.from({ length: Math.max(...arrays.map((a) => a.length)) }, (_, i) =>
    arrays.map((a) => a[i])
  );

export default zip;
