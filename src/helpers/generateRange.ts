const generateRange = (min: number, max: number) => {
    return [...new Array(max + 1 - min)].map((_, i) => {
        const value = min + i;
        return { value, label: value }
    });
};

export default generateRange;