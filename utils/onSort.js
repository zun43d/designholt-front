const onSort = (value, array) => {
	const sortedArray = [...array];

	if (value === 'most-sold') {
		sortedArray.sort((a, b) => b.totalSell - a.totalSell);
	} else if (value === 'less-sold') {
		sortedArray.sort((a, b) => a.totalSell - b.totalSell);
	} else if (value === 'recently-added') {
		sortedArray.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));
	}

	return sortedArray;
};

export default onSort;
