const convertDate = (date) => {
    const convert = new Date(date).toLocaleDateString("id", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return convert;
};

export default convertDate;
