const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

Object.defineProperty(Array.prototype, 'unique', {
  enumerable: false,
  value: function() { return this.filter(onlyUnique); }
});
